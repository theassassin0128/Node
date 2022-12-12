const {
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} = require("discord.js");
const favColor = require("../../components/modals/fav-color");
module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName("fav-color")
		.setDescription("Returns a modal"),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const modal = new ModalBuilder()
			.setCustomId("fav-color")
			.setTitle("Favourite Color");

		const textInput = new TextInputBuilder()
			.setCustomId("favColor")
			.setLabel("What is your favourite Color?")
			.setRequired(true)
			.setStyle(TextInputStyle.Short);
		modal.addComponents(new ActionRowBuilder().addComponents(textInput));

		await interaction.showModal(modal);
	},
};
