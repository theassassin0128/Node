const {
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
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
			.setLabel("Invie the Bot")
			.setStyle(ButtonStyle.Link)
			.setURL(url.invite);

		const AR = new ActionRowBuilder().addComponents(button);

		interaction.reply({
			content: "Invite the bot by clicking the button.",
			components: [AR],
		});
	},
};
