const {
	SlashCommandBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
	OAuth2Scopes,
	MessageFlags,
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@root/src/types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("returns a link button with bots invite url."),
	usage: "",
	category: "utility",
	cooldown: 0,
	global: true,
	premium: false,
	devOnly: false,
	disabled: false,
	voiceChannelOnly: false,
	botPermissions: ["SendMessages", "SendMessagesInThreads"],
	userPermissions: ["SendMessages", "SendMessagesInThreads"],
	async execute(client, interaction, lng) {
		if (
			!client.config.bot.allowedInvite &&
			!client.config.bot.devs.includes(interaction.user.id)
		) {
			return interaction.reply({
				content: t("commands:invite.disabled", { lng }),
				flags: MessageFlags.Ephemeral,
			});
		}

		const inviteLink = client.generateInvite({
			permissions: BigInt(1759218604441335),
			scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
		});
		const inviteButton = new ButtonBuilder()
			.setLabel("Invite Link")
			.setStyle(ButtonStyle.Link)
			.setURL(inviteLink)
			.setEmoji("✉️");

		interaction.reply({
			content: t("commands:invite.reply", { lng }),
			components: [new ActionRowBuilder().addComponents(inviteButton)],
			flags: MessageFlags.Ephemeral,
		});
	},
};
