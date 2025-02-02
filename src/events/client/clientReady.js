const colors = require("colors");
const { t } = require("i18next");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "ready",
	once: true,
	execute: async (client) => {
		// Log that the bot is online
		logger.success(
			t("events:clientReady.consoleLog", {
				tag: colors.green(client.user.tag),
			}),
		);

		// Initialize the Lavalink client
		client.lavalink.init(client.user);

		// Synchronizing the application commands
		client.utils.syncCommands(client);
	},
};
