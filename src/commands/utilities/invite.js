const {
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
	resolvePartialEmoji,
} = require("discord.js");
const { url } = require("../../config.json");
module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("Returns a link button"),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const button = new ButtonBuilder()
			.setLabel("Invite Link")
			.setStyle(ButtonStyle.Link)
			.setURL(url.invite)
			.setEmoji(resolvePartialEmoji("✉️"));

		const AR = new ActionRowBuilder().addComponents(button);

		interaction.reply({
			content: "Invite me to your server by clicking the button.",
			components: [AR],
		});
	},
};
