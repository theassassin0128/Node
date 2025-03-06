const { Collection } = require("discord.js");
const chalk = require("chalk");
const loadFiles = require("./loadFiles.js");
const categories = require("@src/categories.js");

/**
 * A function to load command modules
 * @param {import("@lib/Bot").Bot} client - The client object
 * @param {string} dir - The directory to load commands from
 * @returns {Promise<void>}
 * @example await loadCommands(client, "src/commands");
 */
async function loadCommands(client, dir) {
  if (typeof client !== "object") {
    throw new TypeError(
      `The ${chalk.yellow(
        "client"
      )} parameter must be an Object. Received type ${typeof client}`
    );
  }

  if (typeof dir !== "string") {
    throw new TypeError(
      `The ${chalk.yellow(
        "dir"
      )} parameter must be a String. Received type ${typeof dir}`
    );
  }

  const { Permissions } = client.config.resources;
  const { bot } = client.config;
  const commandFiles = await loadFiles(dir, [".js"]);
  client.commands.clear();

  for (const file of commandFiles) {
    try {
      const filename = chalk.yellow(file.split(/[\\/]/g).pop());

      /** @type {import("@types/command.js").CommandStructure} */
      const command = require(file);

      if (command.disabled) continue;

      if (typeof command.data !== "object" || !command.data) {
        throw new Error(`Command data is missing in ${filename}`);
      }

      if (command?.category !== "none") {
        if (categories[command.category]?.enabled === false) continue;
      }

      if ((command.cooldown ?? bot.defaultCooldown) > 0) {
        if (!command.cooldown) command.cooldown = bot.defaultCooldown;
        client.cooldowns.set(command.data.name, new Collection());
      }

      if (command.global === undefined) command.global = bot.global;

      if (command?.userPermissions?.length > 0) {
        for (let p of command.userPermissions) {
          if (!Permissions.includes(p)) {
            throw new Error(
              `${chalk.yellow(p)} is not a valid user permission in ${filename}`
            );
          }
        }
      }

      if (command?.botPermissions?.length > 0) {
        for (let p of command.botPermissions) {
          if (!Permissions.includes(p)) {
            throw new Error(
              `${chalk.yellow(p)} is not a valid bot permission in ${filename}`
            );
          }
        }
      }

      if (typeof command.execute !== "function" || !command.execute) {
        throw new Error(`Execute function is missing in ${filename}`);
      }

      client.commands.set(command.data.name, command);
    } catch (error) {
      client.logger.error(error);
    }
  }

  client.logger.info(
    `Loaded ${chalk.yellow(client.commands.size)} commands successfully`
  );
}

module.exports = loadCommands;
