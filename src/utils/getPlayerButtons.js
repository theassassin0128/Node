const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const config = require("@src/config.js");

/**
 * typings for the parameters
 * @param {import("lavalink-client").Player} player
 * @returns {ActionRowBuilder[]}
 */
function getPlayerButtons(player) {
  const { music, emojis } = config;

  const row1 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("volumedown")
      // .setLabel("Down")
      .setEmoji(emojis.music.volumedown)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(player.volume <= 0),
    new ButtonBuilder()
      .setCustomId("previous")
      // .setLabel("Previous")
      .setEmoji(emojis.music.previous)
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("resume")
      // .setLabel(player.paused ? "Resume" : "Pause")
      .setEmoji(player.paused ? emojis.music.resume : emojis.music.pause)
      .setStyle(player.paused ? ButtonStyle.Success : ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("skip")
      // .setLabel("Skip")
      .setEmoji(emojis.music.next)
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("volumeup")
      // .setLabel("Up")
      .setEmoji(emojis.music.volumeup)
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(player.volume >= music.maxVolume)
  );

  const row2 = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("shuffle")
      // .setLabel("Shuffle")
      .setEmoji(emojis.music.shuffle)
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId("loop")
      // .setLabel("Loop")
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
      // .setLabel("Stop")
      .setEmoji(emojis.music.stop)
      .setStyle(ButtonStyle.Danger),
    new ButtonBuilder()
      .setCustomId("autoplay")
      // .setLabel("Autoplay")
      .setEmoji(emojis.music.autoplay)
      .setStyle(
        player.get("autoplay") ? ButtonStyle.Success : ButtonStyle.Secondary
      ),
    new ButtonBuilder()
      .setCustomId("queue")
      // .setLabel("Queue")
      .setEmoji(emojis.music.queue)
      .setStyle(ButtonStyle.Secondary)
  );

  return [row1, row2];

  //  const qualityMenu = new StringSelectMenuBuilder()
  //    .setCustomId("song-quality")
  //    .setPlaceholder("Select song quality")
  //    .addOptions([
  //      {
  //        label: "Low",
  //        value: "low",
  //        emoji: "🔇"
  //      },
  //      {
  //        label: "Medium",
  //        value: "medium",
  //        emoji: "💡"
  //      },
  //      {
  //        label: "High",
  //        value: "high",
  //        emoji: "🔊"
  //      }
  //    ]);
  //  const row4 = new ActionRowBuilder().addComponents(qualityMenu);
  //
  //
  //  const row2 = new ActionRowBuilder().addComponents(
  //    new ButtonBuilder()
  //      .setCustomId("shuffle")
  //      .setLabel("Shuffle")
  //      .setStyle(ButtonStyle.Primary),
  //    new ButtonBuilder()
  //      .setCustomId("clear_queue")
  //      .setLabel("Clear Queue")
  //      .setStyle(ButtonStyle.Danger),
  //    new ButtonBuilder()
  //      .setCustomId("vote_skip")
  //      .setLabel("Vote to Skip")
  //      .setStyle(ButtonStyle.Primary),
  //    new ButtonBuilder()
  //      .setCustomId("dj_mode")
  //      .setLabel("DJ Mode")
  //      .setStyle(ButtonStyle.Success)
  //      .setDisabled(!message.member.permissions.has("MANAGE_GUILD")) // Only server managers can toggle DJ //mode
  //  );
  //
  //  const row3 = new ActionRowBuilder().addComponents(
  //    new ButtonBuilder()
  //      .setCustomId("lyrics")
  //      .setLabel("Lyrics")
  //      .setStyle(ButtonStyle.Secondary),
  //    new ButtonBuilder()
  //      .setCustomId("seek")
  //      .setLabel("Seek")
  //      .setStyle(ButtonStyle.Secondary),
  //    new ButtonBuilder()
  //      .setCustomId("view_queue")
  //      .setLabel("View Queue")
  //      .setStyle(ButtonStyle.Secondary)
  //  );
}

module.exports = getPlayerButtons;
