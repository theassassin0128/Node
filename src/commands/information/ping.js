const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { version } = require(`${process.cwd()}/package.json`);
const { colour } = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with API & WS ping."),
	execute: async (interaction, client) => {
		let webLatency = new Date() - interaction.createdAt;
		let apiLatency = client.ws.ping;
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
						webLatency <= 200
							? emLatency.Green
							: webLatency <= 400
							? emLatency.Yellow
							: emLatency.Red
					}\` \`${webLatency}\`ms`,
				},
				{
					name: "🛰 API Latency",
					value: `\`${
						apiLatency <= 200
							? emLatency.Green
							: apiLatency <= 400
							? emLatency.Yellow
							: emLatency.Red
					}\` \`${apiLatency}\`ms`,
				}
			);

		interaction.reply({
			embeds: [latancy],
		});
	},
};
