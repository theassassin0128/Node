const { ChatInputCommandInteraction, EmbedBuilder, MessageFlags } = require("discord.js");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();
const { t } = require("i18next");
const cooldownCache = new Map();

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "interactionCreate",
	/** @param {ChatInputCommandInteraction} interaction */
	execute: async (client, interaction) => {
		if (!interaction.isChatInputCommand()) return;

		const { commandName, user, member, guild } = interaction;
		const { parsePermissions } = client.functions;
		const command = client.commands.get(commandName);

		try {
			if (!command) {
				interaction.reply({
					content: t("events:slashCommands.notFound"),
					flags: MessageFlags.Ephemeral,
				});
				return await client.application.commands.delete(interaction.id);
			}

			if (command?.devOnly || command?.category === "development") {
				if (!client.config.bot.devs.includes(user.id)) {
					return interaction.reply({
						content: t("events:slashCommands.devOnly"),
						flags: MessageFlags.Ephemeral,
					});
				}
			}

			if (command?.guildOnly && !interaction.inGuild()) {
				return interaction.reply({
					content: t("events:slashCommands.guildOnly"),
					flags: MessageFlags.Ephemeral,
				});
			}

			if (!command.cooldown) {
				command.cooldown = client.config.command.cooldown;
			}

			if (command?.cooldown > 0) {
				const remaining = getRemainingTime(command, user.id).toFixed(2);
				if (remaining > 0 && !client.config.bot.devs.includes(user.id)) {
					return interaction.reply({
						content: t("events:slashCommands.cooldown", { t: remaining }),
						flags: MessageFlags.Ephemeral,
					});
				}
			}

			if (guild || interaction.inGuild()) {
				if (command.userPermissions && !member.permissions.has(command.userPermissions)) {
					return interaction.reply({
						content: t("events:slashCommands.userPermission", {
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
							p: parsePermissions(command.botPermissions),
						}),
						flags: MessageFlags.Ephemeral,
					});
				}

				if (command?.voiceChannelOnly) {
					const vc = member.voice?.channel;
					if (!vc) {
						return interaction.reply({
							content: t("events:slashCommands.voiceChannelOnly"),
							flags: MessageFlags.Ephemeral,
						});
					}

					if (!vc.joinable || !vc.speakable) {
						return interaction.reply({
							content: t("events:slashCommands.missingVCPermissions"),
							flags: MessageFlags.Ephemeral,
						});
					}
				}
			}

			await command.execute(client, interaction);
		} catch (error) {
			if (interaction.replied || interaction.deferred) {
				interaction.followUp({
					content: t("events:slashCommands.error"),
					flags: MessageFlags.Ephemeral,
				});
			} else {
				interaction.reply({
					content: t("events:slashCommands.error"),
					flags: MessageFlags.Ephemeral,
				});
			}

			logger.error(error);
		} finally {
			if (command.cooldown > 0) setCooldown(command, user.id);
		}
	},
};

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
