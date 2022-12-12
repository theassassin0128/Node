const { ModalSubmitInteraction, Client } = require("discord.js");

module.exports = {
	name: "fav-color",
	/**
	 *
	 * @param {ModalSubmitInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		interaction.reply({
			content: `You said your favoutrite colour was ${interaction.fields.getTextInputValue(
				"favColor"
			)}`,
		});
	},
};
