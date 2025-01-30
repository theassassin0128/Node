const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ApplicationIntegrationType,
	InteractionContextType,
	MessageFlags,
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/command").CommandStructure} */
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
		),
	// .addSubcommand((option) => option.setName().setDescription())
	usage: "[subcommand]: <subcommand> [options]: <options>",
	category: "music",
	cooldown: 0,
	premium: false,
	guildOnly: true,
	testOnly: true,
	devOnly: false,
	disabled: false,
	voiceChannelOnly: true,
	botPermissions: ["SendMessages", "Connect", "Speak", "EmbedLinks"],
	userPermissions: ["SendMessages"],
	execute: async (client, interaction) => {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const { user, guild, channel, options } = interaction;
		const member = await guild.members.fetch(user.id);
		const subCommand = options.getSubcommand(true);
		const player = client.lavalink.getPlayer(guild.id);

		if (!player) {
			return interaction.followUp({
				content: t("commands:player.noPlayer"),
				flags: MessageFlags.Ephemeral,
			});
		}

		switch (subCommand) {
			case "pause":
				{
					if (!player.playing || player.paused) {
						return interaction.followUp({
							content: t("commands:player.pause.alreadyPaused"),
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

					return interaction.followUp({
						content: t("commands:player.pause.reply"),
						flags: MessageFlags.Ephemeral,
					});
				}
				break;

			case "resume":
				{
					if (player.playing || !player.paused) {
						return interaction.followUp({
							content: t("commands:player.resume.alreadyPlaying"),
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

					return interaction.followUp({
						content: t("commands:player.resume.reply"),
						flags: MessageFlags.Ephemeral,
					});
				}
				break;
		}
	},
};
