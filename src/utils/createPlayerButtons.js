const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder
} = require("discord.js");

/**
 * typings for the parameters
 * @param {import("@lib/Bot").Bot} client
 * @param {import("lavalink-client").Player} player
 * @returns {ActionRowBuilder[]}
 */
function createPlayerButtons(client, player) {
  const { music, emojis } = client.config;

  const volumeDown = new ButtonBuilder()
    .setCustomId("volumedown")
    .setLabel("Down")
    .setEmoji(emojis.music.volumeDown)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(player.volume <= 0);

  const back = new ButtonBuilder()
    .setCustomId("back")
    .setLabel("Back")
    .setEmoji(emojis.music.previous)
    .setStyle(ButtonStyle.Secondary);

  const resume = new ButtonBuilder()
    .setCustomId("resume")
    .setLabel(player.paused ? "Resume" : "Pause")
    .setEmoji(player.paused ? emojis.music.resume : emojis.music.pause)
    .setStyle(player.paused ? ButtonStyle.Success : ButtonStyle.Secondary);

  const skip = new ButtonBuilder()
    .setCustomId("skip")
    .setLabel("Skip")
    .setEmoji(emojis.music.next)
    .setStyle(ButtonStyle.Secondary);

  const volumeUp = new ButtonBuilder()
    .setCustomId("volumeup")
    .setLabel("Up")
    .setEmoji(emojis.music.volumeUp)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(player.volume >= music.maxVolume);

  const shuffle = new ButtonBuilder()
    .setCustomId("shuffle")
    .setLabel("Shuffle")
    .setEmoji(emojis.music.shuffle)
    .setStyle(ButtonStyle.Secondary);

  const loop = new ButtonBuilder()
    .setCustomId("loop")
    .setLabel("Loop")
    .setEmoji(
      player.repeatMode === "track" ? emojis.music.loop2 : emojis.music.loop
    )
    .setStyle(
      player.repeatMode !== "off" ? ButtonStyle.Success : ButtonStyle.Secondary
    );

  const stop = new ButtonBuilder()
    .setCustomId("stop")
    .setLabel("Stop")
    .setEmoji(emojis.music.stop)
    .setStyle(ButtonStyle.Secondary);

  const autoplay = new ButtonBuilder()
    .setCustomId("autoplay")
    .setLabel("Autoplay")
    .setEmoji(emojis.music.autoPlay)
    .setStyle(
      player.get("autoplay") ? ButtonStyle.Success : ButtonStyle.Secondary
    );

  const queue = new ButtonBuilder()
    .setCustomId("queue")
    .setLabel("Queue")
    .setEmoji(emojis.music.queue)
    .setStyle(ButtonStyle.Secondary);

  /** @type {import("discord.js").SelectMenuComponentOptionData[]} */
  const selectmenuOptions = [];
  player.queue.tracks.slice(0, 25).forEach((t) => {
    selectmenuOptions.push({
      emoji: "🎵",
      label: t.info.title,
      value: t.info.uri
    });
  });

  const selectmenu = new StringSelectMenuBuilder()
    .setCustomId("selectmenu")
    .setPlaceholder("Select a track to play now")
    .setMaxValues(1)
    .setOptions(selectmenuOptions);

  return [
    new ActionRowBuilder().addComponents(
      volumeDown,
      back,
      resume,
      skip,
      volumeUp
    ),
    new ActionRowBuilder().addComponents(shuffle, loop, stop, autoplay, queue)
    //		new ActionRowBuilder().addComponents(selectmenu),
  ];

  const embed = new EmbedBuilder()
    .setTitle(`Now playing: ${res.tracks[0].title}`)
    .setDescription(`Requested by ${message.author.username}`)
    .setThumbnail(res.tracks[0].thumbnail)
    .setColor(0x1d82b6);

  const qualityMenu = new StringSelectMenuBuilder()
    .setCustomId("song-quality")
    .setPlaceholder("Select song quality")
    .addOptions([
      {
        label: "Low",
        value: "low",
        emoji: "🔇"
      },
      {
        label: "Medium",
        value: "medium",
        emoji: "💡"
      },
      {
        label: "High",
        value: "high",
        emoji: "🔊"
      }
    ]);
  const row4 = new ActionRowBuilder().addComponents(qualityMenu);

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("skip")
      .setLabel("Skip")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("stop")
      .setLabel("Stop")
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("pause")
      .setLabel("Pause")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("resume")
      .setLabel("Resume")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("loop")
      .setLabel("Loop")
      .setStyle(ButtonStyle.Primary)
  );

  const row2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("shuffle")
      .setLabel("Shuffle")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("clear_queue")
      .setLabel("Clear Queue")
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("vote_skip")
      .setLabel("Vote to Skip")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("dj_mode")
      .setLabel("DJ Mode")
      .setStyle(ButtonStyle.Success)
      .setDisabled(!message.member.permissions.has("MANAGE_GUILD")) // Only server managers can toggle DJ mode
  );

  const row3 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("volume_up")
      .setLabel("Volume Up")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("volume_down")
      .setLabel("Volume Down")
      .setStyle(ButtonStyle.Primary),
    new ButtonBuilder()
      .setCustomId("lyrics")
      .setLabel("Lyrics")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("seek")
      .setLabel("Seek")
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("view_queue")
      .setLabel("View Queue")
      .setStyle(ButtonStyle.Secondary)
  );
}

module.exports = createPlayerButtons;
