const { ContextMenuCommandInteraction, MessageFlags } = require("discord.js");
const { t } = require("i18next");
const cooldownCache = new Map();

/**
 * A function to handle contextmenu commands
 * @param {import("@lib/DiscordClient").DiscordClient} client
 * @param {ContextMenuCommandInteraction} interaction
 */
async function handleContext(client, interaction) {
	const { commandName, guild, user } = interaction;
	const command = client.commands.get(commandName);

	// const settings = await client.db.guilds.getSettings(guild);
	// const lng = settings.config.locale;

	try {
		if (!command) {
			interaction.reply({
				content: t("events:contextMenu.notFound"),
				flags: MessageFlags.Ephemeral,
			});
			return await client.application.commands.delete(interaction.id);
		}

		if (command?.devOnly || command?.category === "development") {
			if (!client.config.bot.devs.includes(user.id)) {
				return interaction.reply({
					content: t("events:contextMenu.devOnly"),
					flags: MessageFlags.Ephemeral,
				});
			}
		}

		if (command?.guildOnly && !interaction.inGuild()) {
			return interaction.reply({
				content: t("events:contextMenu.guildOnly"),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (command?.cooldown > 0) {
			const remaining = getRemainingTime(command, user.id).toFixed(2);
			if (remaining > 0 && !client.config.bot.devs.includes(user.id)) {
				return interaction.reply({
					content: t("events:contextMenu.cooldown", { t: remaining }),
					flags: MessageFlags.Ephemeral,
				});
			}
		}

		if (guild || interaction.inGuild()) {
			const member = await guild.members.fetch(user.id);

			if (command.userPermissions && !member.permissions.has(command.userPermissions)) {
				return interaction.reply({
					content: t("events:contextMenu.userPermission", {
						p: parsePermissions(command.userPermissions),
					}),
					flags: MessageFlags.Ephemeral,
				});
			}

			if (
				command.botPermissions &&
				!guild.members.me.permissions.has(command.botPermissions)
			) {
				return interaction.reply({
					content: t("events:contexMenu.botPermission", {
						p: parsePermissions(command.botPermissions),
					}),
					flags: MessageFlags.Ephemeral,
				});
			}
		}

		await command.execute(client, interaction);
	} catch (error) {
		if (interaction.replied || interaction.deferred) {
			interaction.followUp({
				content: t("events:contextMenu.error"),
				flags: MessageFlags.Ephemeral,
			});
		} else {
			interaction.reply({
				content: t("events:contextMenu.error"),
				flags: MessageFlags.Ephemeral,
			});
		}

		client.logger.error(error);
	} finally {
		if (command.cooldown > 0) setCooldown(command, user.id);
	}
}

/**
 * @param {object} command - Command object
 * @param {string} userId - User ID
 * @returns {void}
 */
function setCooldown(command, userId) {
	const key = command.name + "-" + userId;
	cooldownCache.set(key, Date.now());
}

/**
 * @param {object} command - Command object
 * @param {string} userId - User ID
 * @returns {number} - Remaining time in seconds
 */
function getRemainingTime(command, userId) {
	const key = command.name + "-" + userId;

	if (cooldownCache.has(key)) {
		const remaining = (Date.now() - cooldownCache.get(key)) / 1000;

		if (remaining >= command.cooldown) {
			cooldownCache.delete(key);

			return 0;
		} else return command.cooldown - remaining;
	} else return 0;
}

module.exports = handleContext;
