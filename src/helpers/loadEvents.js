const chalk = require("chalk");
const { t } = require("i18next");
const loadFiles = require("./loadFiles.js");
const { EventNames } = require("@src/validations");

/**
 * A function to load event files
 * @param {import("@lib/DiscordClient.js").DiscordClient} client - The Discord client
 * @param {string} dir - The directory to load events from
 * @returns {Promise<void>}
 * @example await loadEvents(client, "src/events");
 */
async function loadEvents(client, dir) {
	if (typeof client !== "object") {
		throw new TypeError(t("errors:missing.param", { param: chalk.yellow("client") }));
	}

	if (typeof dir !== "string") {
		throw new TypeError(t("errors:type.string", { param: chalk.yellow("dir") }));
	}

	let i = 0;
	const eventFiles = await loadFiles(dir, [".js"]);
	for (const file of eventFiles) {
		try {
			const filename = chalk.yellow(file.split(/[\\/]/g).pop());

			/** @type {import("@typings/index").EventStructure} */
			const event = require(file);

			if (event.player || event.node) if (!client.lavalink) continue;

			if (!EventNames.includes(event.name) || !event.name) {
				throw Error(`${t("errors:validation.eventName")} - ${filename}`);
			}

			if (!event.execute) throw Error(`${t("errors:validation.function")} - ${filename}`);

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

	return client.logger.success(t("helpers:loadEvents", { count: chalk.yellow(i) }));
}

module.exports = loadEvents;
