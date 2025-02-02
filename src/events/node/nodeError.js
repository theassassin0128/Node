const { LavalinkNode } = require("lavalink-client");
const colors = require("colors");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "error",
	node: true,
	/**
	 * @param {LavalinkNode} node
	 */
	execute: async (client, node) => {
		logger.error(t("events:node.error", { id: colors.magenta(node.id) }));
	},
};
