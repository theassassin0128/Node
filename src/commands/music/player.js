const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ApplicationIntegrationType,
	InteractionContextType,
	MessageFlags,
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@root/src/types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("player")
		.setDescription("💿 Player controls for music playback")
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.setContexts(InteractionContextType.Guild)
		.addSubcommand((option) =>
			option.setName("resume").setDescription("▶ resume the music player"),
		)
		.addSubcommand((option) =>
			option.setName("pause").setDescription("⏸ pause the music player"),
		)
		.addSubcommand((option) =>
			option.setName("skip").setDescription("⏭ Skip the now playing track"),
		)
		.addSubcommand((option) =>
			option.setName("previous").setDescription("⏮ Replay the previous track"),
		)
		.addSubcommand((option) =>
			option.setName("stop").setDescription("⏹ Stop and destroy the music player"),
		)
		.addSubcommand((option) =>
			option
				.setName("volume")
				.setDescription("🔊 Set volume for the music player")
				.addIntegerOption((option) =>
					option
						.setName("volume")
						.setDescription("The volume to set for the player")
						.setRequired(true)
						.setMaxValue(100)
						.setMinValue(1),
				),
		),
	usage: "[subcommand]: <subcommand> [options]: <options>",
	category: "music",
	cooldown: 0,
	global: true,
	premium: false,
	devOnly: false,
	disabled: false,
	voiceChannelOnly: true,
	botPermissions: ["SendMessages", "Connect", "Speak", "EmbedLinks"],
	userPermissions: ["SendMessages"],
	execute: async (client, interaction, lng) => {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const { user, guild, channel, options } = interaction;
		const member = await guild.members.fetch(user.id);
		const subCommand = options.getSubcommand(true);
		const player = client.lavalink.getPlayer(guild.id);

		if (!player) {
			return interaction.followUp({
				content: t("commands:player.noPlayer", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		}

		switch (subCommand) {
			case "pause": {
				if (!player.playing || player.paused) {
					return interaction.followUp({
						content: t("commands:player.pause.alreadyPaused", { lng }),
						flags: MessageFlags.Ephemeral,
					});
				}

				player.pause();

				try {
					/** @type {import("discord.js").TextBasedChannel} */
					const channel = client.channels.cache.get(player.textChannelId);
					const message = await channel.messages.fetch(player.get("messageId"));

					if (message && message.editable) {
						await message.edit({
							components: [client.lavalink.createButtonRow(player)],
						});
					}
				} catch (error) {}

				interaction.followUp({
					content: t("commands:player.pause.reply", { lng }),
					flags: MessageFlags.Ephemeral,
				});
				break;
			}

			case "resume": {
				if (player.playing || !player.paused) {
					return interaction.followUp({
						content: t("commands:player.resume.alreadyPlaying", { lng }),
						flags: MessageFlags.Ephemeral,
					});
				}

				player.resume();

				try {
					/** @type {import("discord.js").TextBasedChannel} */
					const channel = client.channels.cache.get(player.textChannelId);
					const message = await channel.messages.fetch(player.get("messageId"));

					if (message && message.editable) {
						await message.edit({
							components: [client.lavalink.createButtonRow(player)],
						});
					}
				} catch (error) {}

				interaction.followUp({
					content: t("commands:player.resume.reply", { lng }),
					flags: MessageFlags.Ephemeral,
				});
				break;
			}

			case "skip": {
				if (player.queue.tracks.length <= 0) {
					interaction.followUp({
						content: t("commands:player.skip.noTrack", { lng }),
						flags: MessageFlags.Ephemeral,
					});
					return;
				}

				player.skip();
				interaction.followUp({
					content: t("commands:player.skip.reply", { lng }),
					flags: MessageFlags.Ephemeral,
				});
				break;
			}

			case "previous": {
				if (!player.queue.previous) {
					interaction.followUp({
						content: t("commands:player.previous.noTrack", { lng }),
						flags: MessageFlags.Ephemeral,
					});
				}

				player.play({ track: player.queue.previous[0] });
				interaction.followUp({
					content: t("commands:player.previous.reply", { lng }),
					flags: MessageFlags.Ephemeral,
				});
				break;
			}

			case "stop": {
				if (player.connected) {
					player.destroy("Command Issued", true);
				}

				interaction.followUp({
					content: t("commands:player.stop.reply", { lng }),
					flags: MessageFlags.Ephemeral,
				});
				break;
			}

			case "volume": {
				const volume = interaction.options.getInteger("volume", true);

				if (1 > volume || volume > 100) {
					return interaction.followUp({
						content: t("commands:player.volume.validValue", { lng }),
						flags: MessageFlags.Ephemeral,
					});
				}

				player.setVolume(volume);
				interaction.followUp({
					content: t("commands:player.volume.reply", { lng, volume }),
					flags: MessageFlags.Ephemeral,
				});
				break;
			}
		}
	},
};
