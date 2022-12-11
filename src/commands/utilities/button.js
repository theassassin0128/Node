const {
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
} = require("discord.js");

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName("button")
		.setDescription("Returns a button"),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const button = new ButtonBuilder()
			.setCustomId("invite")
			.setLabel("Invie the Bot")
			.setStyle(ButtonStyle.Primary);

		const AR = new ActionRowBuilder().addComponents(button);

		interaction.reply({
			content: "Invite the bot by clicking the command.",
			components: [AR],
		});
	},
};
