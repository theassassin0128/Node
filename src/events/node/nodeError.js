const chalk = require("chalk");
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
  name: "error",
  node: true,
  /**
   * @param {import("lavalink-client").LavalinkNode} node
   */
  async execute(client, node, error) {
    client.logger.error(`${chalk.magenta(node.id)} errored`);
    console.error(error);
  }
};
