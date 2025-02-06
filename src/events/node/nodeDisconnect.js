const chalk = require("chalk");
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "disconnect",
	node: true,
	/**
	 * @param {import("lavalink-client").LavalinkNode} node
	 */
	execute: async (client, node) => {
		client.logger.warn(t("events:node.disconnect", { id: chalk.magenta(node.id) }));
	},
};
