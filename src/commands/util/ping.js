const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("🏓Pong! Replies with bot's response time."),
	category: "utility",
	cooldown: 5,
	global: true,
	premium: false,
	devOnly: false,
	voiceChannelOnly: false,
	botPermissions: ["SendMessages", "ReadMessageHistory"],
	userPermissions: ["SendMessages", "ReadMessageHistory"],
	usage: "",
	disabled: false,
	async execute(client, interaction) {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

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
					name: `📡 Gateway Ping`,
					value: `\`\`\`yml\n${
						gateway <= 200 ? "🟢" : gateway <= 400 ? "🟡" : "🔴"
					} ${gateway}ms\`\`\``,
					inline: true,
				},
				{
					name: `🛰 Response Time`,
					value: `\`\`\`yml\n${
						response <= 200 ? "🟢" : response <= 400 ? "🟡" : "🔴"
					} ${response}ms\`\`\``,
					inline: true,
				},
				{
					name: `⏲ Uptime`,
					value: `\`\`\`m\n${days} Days : ${hours} Hrs : ${minutes} Mins : ${seconds} Secs\n\`\`\``,
					inline: false,
				},
			])
			.setFooter({
				text: t("embeds:default.footer", {
					u: client.user.username,
					y: new Date().getFullYear(),
				}),
			});

		interaction.followUp({
			embeds: [embed],
		});
	},
};
