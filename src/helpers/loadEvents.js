const colors = require("colors");
const { table } = require("table");
const { t } = require("i18next");
const { EventNames } = require("@src/validations/events.js");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

/**
 * A function to load event files
 * @param {import("@lib/DiscordClient.js").DiscordClient} client - The Discord client
 * @param {string} dir - The directory to load events from
 * @returns {Promise<void>}
 * @example await loadEvents(client, "src/events");
 */
async function loadEvents(client, dir) {
	if (typeof client !== "object") {
		throw new TypeError(t("errors:missing.param", { param: colors.yellow("client") }));
	}

	if (typeof dir !== "string") {
		throw new TypeError(t("errors:type.string", { param: colors.yellow("dir") }));
	}

	const tableData = [[colors.cyan("Index"), colors.cyan("File"), colors.cyan("Status")]];

	/**
	 * @type {import("table").TableUserConfig}
	 */
	const tableConfig = {
		columnDefault: {
			alignment: "center",
			width: 25,
		},
		columns: [{ width: 5 }, {}, { width: 6 }],
		border: client.functions.getTableBorder("yellow"),
		drawHorizontalLine: (lineIndex, rowCount) => {
			return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
		},
	};

	/**
	 * @type {Array<{file: string, error: Error}>}
	 */
	const errors = [];
	const files = await client.utils.loadFiles(dir, [".js"]);
	client.events.clear();

	let i = 0;
	for (const file of files) {
		const filename = file.split(/[\\/]/g).pop();

		try {
			/**
			 * @type {import("@types/event.js").EventStructure}
			 */
			const event = require(file);

			if (!EventNames.includes(event.name) || !event.name) {
				throw new Error(t("errors:validation.eventName"));
			}

			client.events.set(filename, event);
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

			target[event.once ? "once" : "on"](event.name, execute);

			i++;
			tableData.push([`${colors.magenta(i)}`, colors.green(filename), "» 🌱 «"]);
		} catch (error) {
			i++;
			tableData.push([`${colors.magenta(i)}`, colors.red(filename), "» 🔴 «"]);
			errors.push({ file: file, error: error });
		}
	}

	if (client.config.table.enabled.event) console.log(table(tableData, tableConfig));

	if (errors.length > 0) {
		console.log(colors.yellow(t("helpers:loadEvents.eStart")));
		errors.forEach((e) => {
			console.log(colors.green(e.file), "\n", colors.red(e.error), "\n");
		});
		console.log(colors.yellow(t("helpers:loadEvents.eEnd")));
	}

	logger.info(
		t("helpers:loadEvents.loaded", {
			count: colors.yellow(client.events.size),
			dir: colors.green(dir),
		}),
	);
}

module.exports = loadEvents;
