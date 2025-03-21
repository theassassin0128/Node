const { GuildBan, EmbedBuilder } = require("discord.js");

/** @type {import("@types/index").EventStructure} */
module.exports = {
  name: "guildBanAdd",
  /**
   * typings for the parameters
   * @param {GuildBan} ban
   */
  async execute(client, ban) {
    if (ban.user.bot) return;

    const embed = new EmbedBuilder()
      .setTitle("BAN NOTICE")
      .setDescription(
        [
          `<@${ban.user.id}>, you have been banned from **${ban.guild.name}**`,
          `**Reason**: ${ban.reason ?? "None was specified"}.`
        ].join("\n")
      )
      .setColor(client.config.colors.Wrong)
      .setThumbnail(ban.guild.iconURL({ extension: "png", size: 1024 }))
      .setTimestamp();

    await ban.user.send({ embeds: [embed] }).catch(client.logger.error);
  }
};
