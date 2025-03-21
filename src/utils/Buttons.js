const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

class Buttons {
  constructor(client) {
    /**
     * The base client as a property of this class
     * @type {import("@lib/Bot.js").Bot}
     */
    this.client = client;
  }

  /**
   * A function to generate new buttons for music player
   * @param {import("lavalink-client").Player} player
   * @returns {ActionRowBuilder[]}
   */
  player(player) {
    const { music, emojis } = this.client.config;

    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("volumedown")
        .setEmoji(emojis.music.volumedown)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(player.volume <= 0),
      new ButtonBuilder()
        .setCustomId("previous")
        .setEmoji(emojis.music.previous)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("resume")
        .setEmoji(player.paused ? emojis.music.resume : emojis.music.pause)
        .setStyle(player.paused ? ButtonStyle.Success : ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("skip")
        .setEmoji(emojis.music.next)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("volumeup")
        .setEmoji(emojis.music.volumeup)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(player.volume >= music.maxVolume)
    );

    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("shuffle")
        .setEmoji(emojis.music.shuffle)
        .setStyle(ButtonStyle.Secondary),
      new ButtonBuilder()
        .setCustomId("loop")
        .setEmoji(
          player.repeatMode === "track" ? emojis.music.loop2 : emojis.music.loop
        )
        .setStyle(
          player.repeatMode !== "off"
            ? ButtonStyle.Success
            : ButtonStyle.Secondary
        ),
      new ButtonBuilder()
        .setCustomId("stop")
        .setEmoji(emojis.music.stop)
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId("autoplay")
        .setEmoji(emojis.music.autoplay)
        .setStyle(
          player.get("autoplay") ? ButtonStyle.Success : ButtonStyle.Secondary
        ),
      new ButtonBuilder()
        .setCustomId("queue")
        .setEmoji(emojis.music.queue)
        .setStyle(ButtonStyle.Secondary)
    );

    return [row1, row2];
  }
}

function getPlayerButtons(player) {
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
      .setDisabled(!message.member.permissions.has("MANAGE_GUILD")) // Only server managers can toggle DJ //mode
  );

  const row3 = new ActionRowBuilder().addComponents(
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

module.exports = { Buttons };
