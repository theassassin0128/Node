const chalk = require("chalk");

/** @type {import("@types/index").EventStructure} */
module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Log that the bot is online
    client.logger.success(`${chalk.green(client.user.tag)} is online`);

    // Synchronizing the application commands
    client.helpers.syncCommands(client);

    // Initialize the Lavalink client
    if (client.lavalink) client.lavalink.init(client.user);
  }
};
