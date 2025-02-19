const {
	SlashCommandBuilder,
	EmbedBuilder,
	version,
	AttachmentBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
} = require("discord.js");
const { t } = require("i18next");
const { profileImage } = require("discord-arts");

/** @type {import("@root/src/types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("botinfo")
		.setDescription("📖 View bot's information."),
	category: "utility",
	cooldown: 60,
	global: true,
	premium: false,
	devOnly: true,
	voiceChannelOnly: false,
	botPermissions: ["SendMessages", "ReadMessageHistory", "SendMessagesInThreads"],
	userPermissions: ["SendMessages", "UseApplicationCommands"],
	usage: "",
	disabled: false,
	async execute(client, interaction) {
		await interaction.deferReply();

		const reply = await interaction.fetchReply();
		const wsPing = client.ws.ping;
		const apiPing = reply.createdTimestamp - interaction.createdTimestamp;

		const days = Math.floor(client.uptime / 86400000);
		const hours = Math.floor(client.uptime / 3600000) % 24;
		const minutes = Math.floor(client.uptime / 60000) % 60;
		const seconds = Math.floor(client.uptime / 1000) % 60;

		const profileBuffer = await profileImage(client.user.id, {
			usernameColor: client.config.colors.PowderBlue,
			presenceStatus: client.user.presence.status,
		});

		const imageAttachment = new AttachmentBuilder(profileBuffer, {
			name: "profile.png",
		});

		const embed = new EmbedBuilder()
			.setColor(client.config.colors.Main)
			.setTitle(`${client.user.tag}'s Information`)
			.setDescription(
				[`**Tag:** ${client.user.tag}`, `**Version:** ${client.pkg.version}`].join("\n"),
			)
			.setThumbnail(client.user.avatarURL())
			.setImage("attachment://profile.png")
			.addFields(
				{
					name: `📡 WS Ping`,
					value: `\`\`\`yml\n${
						wsPing <= 200 ? "🟢" : wsPing <= 400 ? "🟡" : "🔴"
					} ${wsPing}ms\`\`\``,
					inline: true,
				},
				{
					name: `🛰 API Ping`,
					value: `\`\`\`yml\n${
						apiPing <= 200 ? "🟢" : apiPing <= 400 ? "🟡" : "🔴"
					} ${apiPing}ms\`\`\``,
					inline: true,
				},
				{
					name: `⏲ Uptime`,
					value: `\`\`\`m\n${days} Days : ${hours} Hrs : ${minutes} Mins : ${seconds} Secs\`\`\``,
					inline: false,
				},
				{
					name: "LANGUAGE & LIBRARY",
					value: [
						`**Name :** [nodejs](https://nodejs.org/en/) (${process.version})`,
						`**Library :** [discord.js](https://discord.js.org/#/) (${version})`,
					].join("\n"),
					inline: true,
				},
				{
					name: "SOURCE CODE",
					value: `Repository is available on github`,
					inline: true,
				},
			)
			.setFooter({
				text: t("embeds:default.footer", {
					u: client.user.username,
					y: new Date().getFullYear(),
				}),
			});

		const githubButton = new ButtonBuilder()
			.setLabel("GitHub")
			.setStyle(ButtonStyle.Link)
			.setURL(client.config.media.links.github);

		const discordButton = new ButtonBuilder()
			.setLabel("Support")
			.setStyle(ButtonStyle.Link)
			.setURL(client.config.media.links.server);

		const inviteButton = new ButtonBuilder()
			.setLabel("Invite Me")
			.setStyle(ButtonStyle.Link)
			.setURL(client.config.media.links.invite);

		const websiteButton = new ButtonBuilder()
			.setLabel("Website")
			.setStyle(ButtonStyle.Link)
			.setURL(client.config.media.links.website);

		const actionRow = new ActionRowBuilder()
			.addComponents(githubButton)
			.addComponents(discordButton)
			.addComponents(inviteButton)
			.addComponents(websiteButton);

		return interaction.editReply({
			embeds: [embed],
			components: [actionRow],
			files: [imageAttachment],
		});
	},
};
