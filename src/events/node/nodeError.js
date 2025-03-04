const chalk = require("chalk");
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
  name: "error",
  node: true,
  /**
   * @param {import("lavalink-client").LavalinkNode} node
   */
  execute: async (client, node, error) => {
    client.logger.error(`The Lavalink Node ${chalk.magenta(node.id)} errored`);
    console.error(error);
  }
};
