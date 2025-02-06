const { LavalinkNode } = require("lavalink-client");
const chalk = require("chalk");
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "error",
	node: true,
	/**
	 * @param {LavalinkNode} node
	 */
	execute: async (client, node) => {
		client.logger.error(t("events:node.error", { id: chalk.magenta(node.id) }));
	},
};
