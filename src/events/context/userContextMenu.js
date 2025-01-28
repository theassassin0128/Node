const { UserContextMenuCommandInteraction, MessageFlags } = require("discord.js");
const { t } = require("i18next");
const cooldownCache = new Map();

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "interactionCreate",
	/** @param {UserContextMenuCommandInteraction} interaction */
	execute: async (client, interaction) => {
		if (!interaction.isUserContextMenuCommand()) return;

		const { commandName, guild, user } = interaction;
		const member = await guild.members.fetch(user.id);
		const context = client.commands.get(commandName);

		try {
			if (!context) {
				interaction.reply({
					content: t("events:contextMenu.notFound"),
					flags: MessageFlags.Ephemeral,
				});
				return await client.application.commands.delete(interaction.id);
			}

			if (context?.devOnly || context?.category === "development") {
				if (!client.config.bot.devs.includes(user.id)) {
					return interaction.reply({
						content: t("events:contextMenu.devOnly"),
						flags: MessageFlags.Ephemeral,
					});
				}
			}

			if (context?.guildOnly && !interaction.inGuild()) {
				return interaction.reply({
					content: t("events:contextMenu.guildOnly"),
					flags: MessageFlags.Ephemeral,
				});
			}

			if (!context.cooldown) {
				context.cooldown = client.config.command.cooldown;
			}

			if (context?.cooldown > 0) {
				const remaining = getRemainingTime(context, user.id).toFixed(2);
				if (remaining > 0 && !client.config.bot.devs.includes(user.id)) {
					return interaction.reply({
						content: t("events:contextMenu.cooldown", { t: remaining }),
						flags: MessageFlags.Ephemeral,
					});
				}
			}

			if (guild || interaction.inGuild()) {
				if (context.userPermissions && !member.permissions.has(context.userPermissions)) {
					return interaction.reply({
						content: t("events:contextMenu.userPermission", {
							p: parsePermissions(context.userPermissions),
						}),
						flags: MessageFlags.Ephemeral,
					});
				}

				if (
					context.botPermissions &&
					!guild.members.me.permissions.has(context.botPermissions)
				) {
					return interaction.reply({
						content: t("events:contexMenu.botPermission", {
							p: parsePermissions(context.botPermissions),
						}),
						flags: MessageFlags.Ephemeral,
					});
				}
			}

			await context.execute(client, interaction);
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

			throw error;
		} finally {
			if (context.cooldown > 0) setCooldown(context, user.id);
		}
	},
};

/**
 * @param {object} context - Command object
 * @param {string} userId - User ID
 * @returns {void}
 */
function setCooldown(context, userId) {
	const key = context.name + "-" + userId;
	cooldownCache.set(key, Date.now());
}

/**
 * @param {object} context - Command object
 * @param {string} userId - User ID
 * @returns {number} - Remaining time in seconds
 */
function getRemainingTime(context, userId) {
	const key = context.name + "-" + userId;

	if (cooldownCache.has(key)) {
		const remaining = (Date.now() - cooldownCache.get(key)) / 1000;

		if (remaining >= context.cooldown) {
			cooldownCache.delete(key);

			return 0;
		} else return context.cooldown - remaining;
	} else return 0;
}
