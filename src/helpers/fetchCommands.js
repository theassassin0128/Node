const chalk = require("chalk");

/**
 * A function to fetch Application Commands
 * @param {import("@lib/Bot").Bot} client
 * @returns {Promise<import("@types/index").OldCommand[]>}
 */
async function fetchCommands(client) {
  if (typeof client !== "object") {
    throw new TypeError(
      `The ${chalk.yellow(
        "client"
      )} parameter must be an object. Received type ${typeof client}`
    );
  }

  try {
    const ApplicationCommands = [];

    const globalCommands = await client.application.commands.fetch({
      withLocalizations: true
    });
    globalCommands.forEach((command) => {
      ApplicationCommands.push({ data: command, global: true });
    });

    const guildCommands = await client.application.commands.fetch({
      guildId: client.config.bot.guildId,
      withLocalizations: true
    });
    guildCommands.forEach((command) => {
      ApplicationCommands.push({ data: command, global: false });
    });

    return ApplicationCommands;
  } catch (error) {
    client.logger.error(error);
  }
}

module.exports = fetchCommands;
