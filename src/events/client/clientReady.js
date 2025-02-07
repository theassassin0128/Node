const chalk = require("chalk");
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "ready",
	once: true,
	execute: async (client) => {
		// Log that the bot is online
		client.logger.info(
			t("events:clientReady.consoleLog", {
				tag: chalk.green(client.user.tag),
			}),
		);

		if (client.config.plugins.music.enabled) {
			// Initialize the Lavalink client
			client.lavalink.init(client.user);
		}

		// Synchronizing the application commands
		client.helpers.syncCommands(client);
	},
};
