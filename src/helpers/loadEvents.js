const chalk = require("chalk");
const { loadFiles } = require("./loadFiles.js");

/**
 * A function to load event files
 * @param {import("@lib/Bot").Bot} client - The client object
 * @param {string} dir - The directory to load events from
 * @returns {Promise<void>}
 * @example await loadEvents(client, "src/events");
 */
async function loadEvents(client, dir) {
  if (typeof dir !== "string") {
    throw new TypeError(
      `The ${chalk.yellow(
        "dir"
      )} parameter must be a String. Received type ${typeof dir}`
    );
  }

  const { Events } = client.config.resources;
  const eventFiles = await loadFiles(dir, [".js"]);
  let i = 0;

  for (const file of eventFiles) {
    try {
      const filename = chalk.yellow(file.split(/[\\/]/g).pop());

      /** @type {import("@types/index").EventStructure} */
      const event = require(file);

      if ((event.player || event.node) && !client.lavalink) continue;

      if (!Events.includes(event.name) || !event.name) {
        throw new Error(`Event name is invalid or missing in ${filename}`);
      }

      if (typeof event.execute !== "function" || !event.execute) {
        throw new Error(`Execute function is missing in ${filename}`);
      }

      const execute = (...args) => event.execute(client, ...args);
      const target = event.rest
        ? client.rest
        : event.ws
        ? client.ws
        : event.player
        ? client.lavalink
        : event.node
        ? client.lavalink.nodeManager
        : client;

      target[event.once ? "once" : "on"](event.name, execute) && i++;
    } catch (error) {
      client.logger.error(error);
    }
  }

  client.logger.info(`Loaded ${chalk.yellow(i)} events successfully`);
}

module.exports = { loadEvents };
