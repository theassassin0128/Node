const colors = require("colors");
const { t } = require("i18next");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "disconnect",
	node: true,
	/**
	 * @param {import("lavalink-client").LavalinkNode} node
	 */
	execute: async (client, node) => {
		logger.warn(t("events:node.disconnect", { id: colors.magenta(node.id) }));
	},
};
