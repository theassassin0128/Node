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
		.setDescription("▶  play a song from available sources")
		.setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.setContexts(InteractionContextType.Guild)
		.addStringOption((option) =>
			option
				.setName("query")
				.setDescription("Song name to search or url to play directly")
				.setRequired(true)
				.setAutocomplete(true),
		)
		.addBooleanOption((option) =>
			option
				.setName("autoplay")
				.setDescription("Set AutoPlay option. Can be disabled or enabled later.")
				.setRequired(false),
		),
	usage: "[query]: <song|url> [autoplay]?: <true|false>",
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
		const query = options.getString("query", true);
		const source = client.config.plugins.music.defaultSource;
		const autoplay = options.getBoolean("autoplay") ?? false;
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
				volume: 50,
				instaUpdateFiltersFix: true,
				applyVolumeAsFilter: false,
				autoPlay: autoplay,
				node: client.lavalink.nodeManager.leastUsedNodes("memory")[0],
			});
		}

		if (!player.connected) await player.connect();

		if (player.voiceChannelId !== vc.id) {
			return interaction.followUp({
				content: t("commands:player.joinVc"),
				ephemeral: true,
			});
		}

		const response = await player.search(
			{ query: query, source: source },
			interaction.user,
		);

		if (!response || response.loadType === "error") {
			return interaction.followUp({
				content: t("commands:play.loadFailed"),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (!response.tracks?.length || response.loadType === "empty") {
			return interaction.followUp({
				content: t("commands:play.emptyQueue"),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (response.loadType === "playlist") {
			await player.queue.add(response.tracks);
			interaction.followUp({
				content: t("commands:play.playlist", {
					size: `\`${response.tracks.length}\``,
					title: response.playlist?.title ? `\`${response.playlist.title}\`` : "playlist",
				}),
				flags: MessageFlags.Ephemeral,
			});
		} else {
			const track = response.tracks[0];
			await player.queue.add(track);
			interaction.followUp({
				content: t("commands:play.track", {
					title: `[${track.info.title}](<${track.info.uri}>)`,
					author: `\`${track.info.author}\``,
					position: `\`${player.queue.tracks.length}\``,
				}),
				flags: MessageFlags.Ephemeral,
			});
		}

		if (!player.playing) await player.play();
	},
	autocomplete: async (client, interaction) => {
		const source = client.config.plugins.music.defaultSource;
		const focusedValue = interaction.options.getFocused(true);

		if (!focusedValue) {
			return interaction.respond([]).catch(() => {
				null;
			});
		}

		try {
			const res = await client.lavalink.search(
				focusedValue.value,
				interaction.user,
				source,
			);

			const songs = [];

			if (res.loadType === "search") {
				res.tracks.slice(0, 10).forEach((track) => {
					const name = `${track.info.title} by ${track.info.author}`;
					songs.push({
						name: name.length > 100 ? `${name.substring(0, 97)}...` : name,
						value: track.info.uri,
					});
				});
			}

			return await interaction.respond(songs).catch(() => {
				null;
			});
		} catch (error) {
			null;
		}
	},
};
