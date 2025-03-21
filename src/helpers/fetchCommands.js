/**
 * A function to fetch Application Commands
 * @param {import("@lib/Bot").Bot} client
 * @returns {Promise<import("@types/index").OldCommand[]>}
 */
async function fetchCommands(client) {
  const ApplicationCommands = [];

  try {
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
  } catch (error) {
    client.logger.error(error);
  }

  return ApplicationCommands;
}

module.exports = { fetchCommands };
