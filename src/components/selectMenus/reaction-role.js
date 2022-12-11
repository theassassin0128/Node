const {
	ChatInputCommandInteraction,
	EmbedBuilder,
	Client,
} = require("discord.js");

module.exports = {
	name: "reaction-role",
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		interaction.reply({
			content: "Test",
		});
	},
};
