const chalk = require("chalk");
const { fetchCommands } = require("./fetchCommands.js");
const { checkForChange } = require("./checkForChange.js");

/**
 * A function to synchronize Application Commands
 * @param {import("@lib/Bot.js").Bot} client
 * @returns {Promise<void>}
 */
async function syncCommands(client) {
  const { guildId, showSyncLogs } = client.config.bot;
  const oldCommands = await fetchCommands(client);
  client.logger.warn("Syncing application commands (This may take a while)");

  // This section is for the very first time when the commands are not registered
  // or when the bot's commands are removed from discord
  if (oldCommands.length <= 0) {
    const guildCommands = [];
    const globalCommands = [];

    client.commands.forEach((command) => {
      if (showSyncLogs) {
        console.log(
          `[${chalk.greenBright("ADDED")}]: ${chalk.cyanBright(
            command.data.name
          )}`
        );
      }

      if (command.global) globalCommands.push(command.data.toJSON());
      else guildCommands.push(command.data.toJSON());
    });

    if (guildCommands.length > 0) {
      await client.application.commands.set(guildCommands, guildId);
    }

    if (globalCommands.length > 0) {
      await client.application.commands.set(globalCommands);
    }
  }

  // This section is for the rest of the time when the commands are already registered
  // and we need to check for changes
  else {
    // Checking for new commands and pushing them to discord
    const commandsToAdd = client.commands
      .filter(
        (command) => !oldCommands.some((c) => c.data.name === command.data.name)
      )
      .map((c) => c);

    for (const command of commandsToAdd) {
      try {
        if (command.global) {
          await client.application.commands.create(command.data);
        } else {
          await client.application.commands.create(command.data, guildId);
        }

        if (showSyncLogs) {
          console.log(
            `[${chalk.greenBright("ADDED")}]: ${chalk.cyanBright(
              command.data.name
            )}`
          );
        }
      } catch (error) {
        client.logger.error(error);
      }
    }

    // Checking old commands and deleting them if the file is removed or command is disabled
    const commandsToDelete = oldCommands
      .filter(
        (command) =>
          !client.commands.some((c) => c.data.name === command.data.name)
      )
      .map((c) => c);

    for (const command of commandsToDelete) {
      try {
        await command.data.delete();

        if (showSyncLogs) {
          console.log(
            `[${chalk.redBright("DELETED")}]: ${chalk.cyanBright(
              command.data.name
            )}`
          );
        }
      } catch (error) {
        client.logger.error(error);
      }
    }

    // Checking for changes in commands and pushing the changes to discord
    const commandsToModify = client.commands
      .filter((command) =>
        oldCommands.some((c) => c.data.name === command.data.name)
      )
      .map((c) => c);

    for (const newCommand of commandsToModify) {
      try {
        const oldCommand = oldCommands.find(
          (c) => c.data.name === newCommand.data.name
        );
        let isChanged = false;

        // Check if the command is global or not
        if (oldCommand.global !== newCommand.global) isChanged = true;
        // Check if the command has been modified or not
        else if (checkForChange(oldCommand, newCommand)) isChanged = true;

        if (isChanged) {
          await oldCommand.data.delete();

          if (newCommand.global) {
            await client.application.commands.create(newCommand.data);
          } else {
            await client.application.commands.create(newCommand.data, guildId);
          }

          if (showSyncLogs) {
            console.log(
              `[${chalk.yellowBright("MODIFIED")}]: ${chalk.cyanBright(
                newCommand.data.name
              )}`
            );
          }
        }
      } catch (error) {
        client.logger.error(error);
      }
    }
  }

  client.logger.success("All application commands are in sync");
}

module.exports = { syncCommands };
