const { EmbedBuilder } = require("discord.js");
const { t } = require("i18next");
const { handlePlayerButtons } = require("@handlers/playerButtons.js");

/** @type {import("@types/index").EventStructure} */
module.exports = {
  name: "trackStart",
  player: true,
  /**
   * @param {import("lavalink-client").Player} player
   * @param {import("lavalink-client").Track} track
   */
  async execute(client, player, track) {
    if (!track) return;

    const guild = client.guilds.cache.get(player.guildId);
    if (!guild) return;

    const lng = (await client.db.guilds.get(guild.id))?.locale;

    /** @type {import("discord.js").GuildTextBasedChannel} */
    const channel = guild.channels.cache.get(player.textChannelId);
    if (!channel) return;

    // client.config.colors.Transparent
    const embed = new EmbedBuilder()
      .setColor(client.lavalink.embedColor(track.info.sourceName))
      .setAuthor({
        name: t("player:nowPlaying", { lng }),
        iconURL:
          client.config.icons[track.info.sourceName] ??
          client.user?.displayAvatarURL({ extension: "png" })
      })
      .setDescription(`**[${track.info.title}](${track.info.uri})**`)
      .setImage(track.info.artworkUrl)
      .addFields([
        {
          name: t("player:requestedBy", { lng }),
          value: `<@${track.requester?.id}>`,
          inline: true
        },
        {
          name: t("player:duration", { lng }),
          value: track.info.isStream
            ? "LIVE"
            : client.utils.timeFormat(track.info.duration),
          inline: true
        },
        {
          name: t("player:author", { lng }),
          value: `${track.info.author}`,
          inline: true
        }
      ]);

    const message = await channel.send({
      embeds: [embed],
      components: client.utils.buttons.player(player)
    });
    player.set("messageId", message.id);
    handlePlayerButtons(client, message, player);
  }
};

// let message = (await channel.messages.fetch()).get(player.get("messageId"));
// if (message) {
//   const buttons = client.utils.buttons.player(player;
//   if (message.embeds[0].footer) embed.setFooter(message.embeds[0].footer);
//   await message.edit({
//     embeds: [embed],
//     components: buttons
//   });
// } else {}
