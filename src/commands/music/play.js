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
		.setName("play")
		.setDescription("▶ Play songs or tracks from available sources")
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.setContexts(InteractionContextType.Guild)
		.addStringOption((option) =>
			option
				.setName("query")
				.setDescription("Song name or url to play")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("source")
				.setDescription("Track source to play from")
				.setRequired(false)
				.addChoices([
					{
						name: "YouTube",
						value: "yt",
					},
					{
						name: "YouTube Music",
						value: "ytm",
					},
					{
						name: "Spotify",
						value: "spotify",
					},
				]),
		)
		.addBooleanOption((option) =>
			option
				.setName("autoplay")
				.setDescription("Set AutoPlay option. Can be disabled or enabled later.")
				.setRequired(false),
		),
	usage: "[query]: <song|url> [source]?: <source> [autoplay]?: <true|false>",
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
		const { defaultVolume } = client.config.plugins.music;
		const member = await guild.members.fetch(user.id);
		const query = options.getString("query", true);
		const source = options.getString("source");
		const autoplay = options.getBoolean("autoplay");
		const vc = member?.voice?.channel;
		if (!vc) return;

		var player = client.lavalink.getPlayer(guild.id);
		if (!player) {
			player = client.lavalink.createPlayer({
				guildId: guild.id,
				voiceChannelId: vc.id,
				textChannelId: channel.id,
				selfDeaf: true,
				selfMute: false,
				volume: defaultVolume,
				instaUpdateFiltersFix: true,
				applyVolumeAsFilter: false,
				node: client.lavalink.nodeManager.leastUsedNodes("memory")[0],
			});
		}

		if (!player.connected) await player.connect();

		if (player.voiceChannelId !== vc.id) {
			return interaction.followUp({
				content: t("commands:player.joinVc", { lng }),
				ephemeral: true,
			});
		}

		const response = await player.search({ query, source }, user);

		if (!response || response.loadType === "error") {
			return interaction.followUp({
				content: t("commands:play.loadFailed", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (!response.tracks?.length || response.loadType === "empty") {
			return interaction.followUp({
				content: t("commands:play.emptyQueue", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (response.loadType === "playlist") {
			await player.queue.add(response.tracks);

			interaction.followUp({
				content: t("commands:play.playlist", {
					lng,
					size: `\`${response.tracks.length}\``,
					title: response.playlist?.name ? `\`${response.playlist.name}\`` : "playlist",
				}),
				flags: MessageFlags.Ephemeral,
			});
		} else {
			const track = response.tracks.shift();
			await player.queue.add(track);

			interaction.followUp({
				content: t("commands:play.track", {
					lng,
					title: `[${track.info.title}](<${track.info.uri}>)`,
					author: `\`${track.info.author}\``,
					position: `\`${player.queue.tracks.length}\``,
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (autoplay) player.set("autoplay", true);
		if (!player.playing) return await player.play();
	},
};
