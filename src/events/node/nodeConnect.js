const chalk = require("chalk");
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "connect",
	node: true,
	/**
	 * @param {import("lavalink-client").LavalinkNode} node
	 */
	execute: async (client, node) => {
		client.logger.info(t("events:node.connect", { id: chalk.magenta(node.id) }));
	},
};
