const { SlashCommandBuilder, EmbedBuilder, version } = require("discord.js");
const { colour } = require("../../config.json");
const pkg = require("../../../package.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Replies with current stats of the bot."),
  execute: async (interaction, client) => {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;

    let webLatency = client.ws.ping;
    let apiLatency = new Date() - interaction.createdAt;

    let emLatency = {
      Green: "🟢",
      Yellow: "🟡",
      Red: "🔴",
    };

    const stats = new EmbedBuilder()
      .setColor(colour.main)
      .setTitle("__GENERAL INFO__")
      .setDescription(
        [
          `**Name :** ${client.user.username}`,
          `**Tag :** ${client.user.tag}`,
          `**Version :** ${pkg.version}`,
          `**Website :** Coming soon.`,
        ].join("\n")
      )
      .setThumbnail(client.user.avatarURL({ size: 4096 }))
      .addFields(
        {
          name: "__BOT INFO__",
          value: [
            `**Status** :  \`🟢\` Online`,
            `**Ping** : \`${
              webLatency <= 200
                ? emLatency.Green
                : webLatency <= 400
                ? emLatency.Yellow
                : emLatency.Red
            }\` ${webLatency}ms`,
            `**Uptime** :\n\`\`\`\n${days}Days, ${hours}Hours, ${minutes}Minutes, ${seconds}Seconds\n\`\`\``,
          ].join("\n"),
        },
        {
          name: "__LANGUAGE & LIBRARY INFO__",
          value: [
            `**Name :** [nodejs](https://nodejs.org/en/)`,
            `**Library :** [discord.js](https://discord.js.org/#/) | V•${version}`,
          ].join("\n"),
        }
      );

    return interaction.reply({
      embeds: [stats],
    });
  },
};
