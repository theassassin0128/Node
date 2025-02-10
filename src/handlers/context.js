const { ContextMenuCommandInteraction, MessageFlags } = require("discord.js");
const { t } = require("i18next");

/**
 * A function to handle contextmenu commands
 * @param {import("@lib/DiscordClient").DiscordClient} client
 * @param {ContextMenuCommandInteraction} interaction
 */
async function handleContext(client, interaction) {
	if (!interaction.inGuild()) {
		return interaction.reply({
			content: t("handlers:commands.guildOnly"),
			flags: MessageFlags.Ephemeral,
		});
	}

	const { commandName, user, guild } = interaction;
	const { parsePermissions, timeFormat } = client.utils;
	const { devs, defaultCooldown } = client.config.bot;

	const command = client.commands.get(commandName);
	const member = await guild.members.fetch(user.id);
	const bot = await guild.members.fetchMe();
	const lng = (await client.db.guilds.getGuild(guild))?.locale;

	if (!interaction.inGuild()) {
		return interaction.reply({
			content: t("handlers:context.guildOnly"),
			flags: MessageFlags.Ephemeral,
		});
	}

	try {
		if (!command) {
			interaction.reply({
				content: t("handlers:context.notFound", { lng }),
				flags: MessageFlags.Ephemeral,
			});
			return await client.application.commands.delete(interaction.id);
		}

		if (command.devOnly && !devs.includes(user.id)) {
			return interaction.reply({
				content: t("handlers:context.devOnly", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (command.userPermissions && !member.permissions.has(command.userPermissions)) {
			return interaction.reply({
				content: t("handlers:commands.userPermission", {
					lng,
					p: parsePermissions(command.userPermissions),
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (command.botPermissions && !bot.permissions.has(command.botPermissions)) {
			return interaction.reply({
				content: t("handlers:commands.botPermission", {
					lng,
					p: parsePermissions(command.botPermissions),
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		if ((command.cooldown ?? defaultCooldown) > 0) {
			const remaining = client.utils.getCooldown(command, user.id);

			if (remaining > 0 && !devs.includes(user.id)) {
				return interaction.reply({
					content: t("handlers:context.cooldown", { lng, t: `<t:${remaining}:R>` }),
					flags: MessageFlags.Ephemeral,
				});
			}
		}

		await command.execute(client, interaction, lng);
	} catch (error) {
		if (interaction.replied || interaction.deferred) {
			interaction.followUp({
				content: t("handlers:context.error", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		} else {
			interaction.reply({
				content: t("handlers:context.error", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		}

		client.logger.error(error);
	}
}

module.exports = handleContext;
