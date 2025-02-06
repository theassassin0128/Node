const { ChatInputCommandInteraction, MessageFlags } = require("discord.js");
const { t } = require("i18next");
const cooldownCache = new Map();

/**
 * A function to handle slash commands
 * @param {import("@lib/DiscordClient").DiscordClient} client
 * @param {ChatInputCommandInteraction} interaction
 */
async function handleCommands(client, interaction) {
	const { commandName, user, member, guild } = interaction;
	const { parsePermissions } = client.utils;
	const command = client.commands.get(commandName);

	const userSettings = await client.db.users.getUser(user);
	const guildSettings = await client.db.guilds.getGuild(guild);
	const lng = guildSettings.config.locale ?? userSettings.config.locale;

	try {
		if (!command) {
			interaction.reply({
				content: t("events:slashCommands.notFound", { lng }),
				flags: MessageFlags.Ephemeral,
			});
			return await client.application.commands.delete(interaction.id);
		}

		if (command?.devOnly || command?.category === "development") {
			if (!client.config.bot.devs.includes(user.id)) {
				return interaction.reply({
					content: t("events:slashCommands.devOnly", { lng }),
					flags: MessageFlags.Ephemeral,
				});
			}
		}

		if (command?.guildOnly && !interaction.inGuild()) {
			return interaction.reply({
				content: t("events:slashCommands.guildOnly", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (command?.cooldown > 0) {
			const remaining = getRemainingTime(command, user.id).toFixed(2);
			if (remaining > 0 && !client.config.bot.devs.includes(user.id)) {
				return interaction.reply({
					content: t("events:slashCommands.cooldown", { lng, t: remaining }),
					flags: MessageFlags.Ephemeral,
				});
			}
		}

		if (guild || interaction.inGuild()) {
			if (command.userPermissions && !member.permissions.has(command.userPermissions)) {
				return interaction.reply({
					content: t("events:slashCommands.userPermission", {
						lng,
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
					content: t("events:slashCommands.botPermission", {
						lng,
						p: parsePermissions(command.botPermissions),
					}),
					flags: MessageFlags.Ephemeral,
				});
			}

			if (command?.voiceChannelOnly) {
				const vc = member.voice?.channel;
				if (!vc) {
					return interaction.reply({
						content: t("events:slashCommands.voiceChannelOnly", { lng }),
						flags: MessageFlags.Ephemeral,
					});
				}

				if (!vc.joinable || !vc.speakable) {
					return interaction.reply({
						content: t("events:slashCommands.missingVCPermission", { lng }),
						flags: MessageFlags.Ephemeral,
					});
				}
			}
		}

		await command.execute(client, interaction);
	} catch (error) {
		if (interaction.replied || interaction.deferred) {
			interaction.followUp({
				content: t("events:slashCommands.error", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		} else {
			interaction.reply({
				content: t("events:slashCommands.error", { lng }),
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

module.exports = handleCommands;
