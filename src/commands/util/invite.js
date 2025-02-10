const {
	SlashCommandBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
	OAuth2Scopes,
	EmbedBuilder,
	MessageFlags,
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("returns a link button with bots invite url."),
	category: "utility",
	cooldown: 0,
	global: true,
	premium: false,
	devOnly: false,
	voiceChannelOnly: false,
	botPermissions: ["SendMessages", "SendMessagesInThreads"],
	userPermissions: ["SendMessages", "SendMessagesInThreads"],
	usage: "",
	disabled: false,
	async execute(client, interaction) {
		if (
			!client.config.bot.allowedInvite &&
			!client.config.bot.devs.includes(interaction.user.id)
		) {
			return interaction.reply({
				content: t("commands:invite.disabled"),
				flags: MessageFlags.Ephemeral,
			});
		}

		const inviteLink = client.generateInvite({
			permissions: BigInt(1758600129150711),
			scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
		});
		const inviteButton = new ButtonBuilder()
			.setLabel("Invite Link")
			.setStyle(ButtonStyle.Link)
			.setURL(inviteLink)
			.setEmoji("✉️");

		interaction.reply({
			content: t("commands:invite.reply"),
			components: [new ActionRowBuilder().addComponents(inviteButton)],
			flags: MessageFlags.Ephemeral,
		});
	},
};
