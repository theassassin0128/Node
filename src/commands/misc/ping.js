const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { colour } = require("../../config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with API & WS ping."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute: async (interaction, client) => {
    await interaction.deferReply();
    const reply = await interaction.fetchReply();
    const apiPing = reply.createdTimestamp - interaction.createdTimestamp;
    const webPing = client.ws.ping;

    let emLatency = {
      Green: "🟢",
      Yellow: "🟡",
      Red: "🔴",
    };

    let latancy = new EmbedBuilder()
			.setColor(colour.main)
			.setTitle(`Latency And API Ping`)
			.addFields(
				{
					name: "📡 Websocket Latency",
					value: `\`${
						webPing <= 200
							? emLatency.Green
							: webPing <= 400
							? emLatency.Yellow
							: emLatency.Red
					}\` \`${webPing}\`ms`,
				},
				{
					name: "🛰 API Latency",
					value: `\`${
						apiPing <= 200
							? emLatency.Green
							: apiPing <= 400
							? emLatency.Yellow
							: emLatency.Red
					}\` \`${apiPing}\`ms`,
				},
			);

    interaction.editReply({
      embeds: [latancy],
    });
  },
};
