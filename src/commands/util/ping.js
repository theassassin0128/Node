const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { t } = require("i18next");

/** @type {import("@root/src/types/command").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("🏓 Pong! Replies with bot's response time."),
  usage: "",
  category: "utility",
  cooldown: 5,
  global: true,
  premium: false,
  devOnly: false,
  disabled: false,
  ephemeral: true,
  voiceChannelOnly: false,
  botPermissions: ["SendMessages", "ReadMessageHistory"],
  userPermissions: ["SendMessages"],

  async execute(client, interaction, lng) {
    const reply = await interaction.fetchReply();
    const response = reply.createdTimestamp - interaction.createdTimestamp;
    const gateway = client.ws.ping;

    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;

    const { Good, Standby, Wrong } = client.config.colors;
    const embed = new EmbedBuilder()
      .setColor(response <= 200 ? Good : response <= 400 ? Standby : Wrong)
      .addFields([
        {
          name: t("commands:ping.gatewayPing", { lng }),
          value: `\`\`\`yml\n${
            gateway <= 200 ? "🟢" : gateway <= 400 ? "🟡" : "🔴"
          } ${gateway}ms\`\`\``,
          inline: true
        },
        {
          name: t("commands:ping.responseTime", { lng }),
          value: `\`\`\`yml\n${
            response <= 200 ? "🟢" : response <= 400 ? "🟡" : "🔴"
          } ${response}ms\`\`\``,
          inline: true
        },
        {
          name: t("commands:ping.uptime", { lng }),
          value: `\`\`\`m\n${days} Days : ${hours} Hrs : ${minutes} Mins : ${seconds} Secs\n\`\`\``,
          inline: false
        }
      ]);

    return interaction.followUp({ embeds: [embed] });
  }
};
