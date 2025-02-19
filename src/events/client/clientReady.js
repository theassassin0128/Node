const chalk = require("chalk");
const { t } = require("i18next");

/** @type {import("@typings/index").EventStructure} */
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

		// Synchronizing the application commands
		client.helpers.syncCommands(client);

		// Initialize the Lavalink client
		if (client.lavalink) client.lavalink.init(client.user);
	},
};
