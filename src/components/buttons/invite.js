const { ChatInputCommandInteraction, Client } = require("discord.js");
const { url } = require("../../config.json");

module.exports = {
	data: {
		name: "test",
	},
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		interaction.reply({
			content: url.invite,
		});
	},
};
