const { ChatInputCommandInteraction } = require("discord.js");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "interactionCreate",
	/** @param { ChatInputCommandInteraction } interaction */
	execute: async (client, interaction) => {
		if (!interaction.isAutocomplete()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			await command.autocomplete(client, interaction);
		} catch (error) {
			logger.error(error);
		}
	},
};
