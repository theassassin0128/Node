const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ApplicationIntegrationType,
  InteractionContextType
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/command").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("▶ Play songs or tracks from available sources.")
    .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .setContexts(InteractionContextType.Guild)
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Song name or url to play.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("source")
        .setDescription("The source to play from.")
        .setRequired(false)
        .addChoices([
          {
            name: "Apple Music",
            value: "applemusic"
          },
          {
            name: "Bandcamp",
            value: "bandcamp"
          },
          {
            name: "Deezer",
            value: "deezer"
          },
          {
            name: "JioSaavn",
            value: "jiosaavn"
          },
          {
            name: "Sound Cloud",
            value: "soundcloud"
          },
          {
            name: "Spotify",
            value: "spotify"
          },
          {
            name: "Yandex Music",
            value: "yandexmusic"
          },
          {
            name: "YouTube",
            value: "youtube"
          },
          {
            name: "YouTube Music",
            value: "youtubemusic"
          }
        ])
    )
    .addBooleanOption((option) =>
      option
        .setName("autoplay")
        .setDescription(
          "Set AutoPlay option. Can be disabled or enabled later."
        )
        .setRequired(false)
    ),
  usage: "[query]: <song|url> (source): <source> (autoplay): <true|false>",
  category: "music",
  cooldown: 0,
  global: true,
  premium: false,
  devOnly: false,
  disabled: false,
  ephemeral: true,
  voiceChannelOnly: true,
  botPermissions: ["SendMessages", "Connect", "Speak", "EmbedLinks"],
  userPermissions: ["SendMessages", "Connect"],
  execute: async (client, interaction, lng) => {
    const { user, guild, channel, options } = interaction;
    const { defaultVolume } = client.config.music;

    const member = await guild.members.fetch(user.id);
    const query = options.getString("query", true);
    const source = options.getString("source");
    const autoplay = options.getBoolean("autoplay");
    const vc = member?.voice?.channel;
    if (!vc) return;

    let player = client.lavalink.getPlayer(guild.id);
    if (!player) {
      player = client.lavalink.createPlayer({
        guildId: guild.id,
        voiceChannelId: vc.id,
        textChannelId: channel.id,
        selfDeaf: true,
        selfMute: true,
        volume: defaultVolume,
        instaUpdateFiltersFix: true,
        applyVolumeAsFilter: false,
        node: client.lavalink.nodeManager.leastUsedNodes("memory")[0],
        vcRegion: vc?.rtcRegion
      });
    }

    // if (source && !player.node.info.sourceManagers.includes(source)) {
    // 	await interaction.followUp({
    // 		content: t("commands:play.source"),
    // 	});
    // 	return;
    // }

    if (!player.connected) await player.connect();

    if (player.voiceChannelId !== vc.id) {
      await interaction.followUp({
        content: t("commands:play.joinVc", { lng, vc: vc.id })
      });
      return;
    }

    const response = await player.search({ query, source }, member);

    if (!response || response.loadType === "error") {
      await interaction.followUp({
        content: t("commands:play.loadFailed", { lng })
      });
      return;
    }

    if (!response.tracks?.length || response.loadType === "empty") {
      await interaction.followUp({
        content: t("commands:play.emptyQueue", { lng })
      });
      return;
    }

    if (response.loadType === "playlist") {
      await player.queue.add(response.tracks);
      await interaction.followUp({
        content: t("commands:play.playlist", {
          lng,
          size: response.tracks.length,
          title: response.playlist?.name ? response.playlist.name : "playlist"
        })
      });
    } else {
      const track = response.tracks.shift();
      await player.queue.add(track);
      await interaction.followUp({
        content: t("commands:play.track", {
          lng,
          title: `[\`${track.info.title}\`](<${track.info.uri}>)`,
          author: track.info.author,
          position: player.queue.tracks.length
        })
      });
    }

    if (autoplay) player.set("autoplay", true);
    if (!player.playing) return await player.play();
  }
};
