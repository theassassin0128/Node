const { LavalinkNode } = require("lavalink-client");
const colors = require("colors");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "connect",
	node: true,
	/**
	 * @param {LavalinkNode} node
	 */
	execute: async (client, node) => {
		// Event: When a node is successfully created and connected
		logger.info(`${colors.red(node.id)} was connected`);
	},
};
