const chalk = require("chalk");
const { table } = require("table");
const { t } = require("i18next");
const loadFiles = require("./loadFiles.js");
const { EventNames } = require("@src/validations/events.js");

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

	const tableData = [[chalk.cyan("Index"), chalk.cyan("File"), chalk.cyan("Status")]];
	/** @type {import("table").TableUserConfig} */
	const tableConfig = {
		columnDefault: {
			alignment: "center",
			width: 30,
		},
		columns: [{ width: 5 }, {}, { width: 6 }],
		border: client.utils.getTableBorder("yellow"),
		drawHorizontalLine: (lineIndex, rowCount) => {
			return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
		},
	};

	let i = 0;
	client.events.clear();

	(await loadFiles(dir, [".js"])).forEach((file) => {
		const filename = file.split(/[\\/]/g).pop();

		try {
			/** @type {import("@types/event.js").EventStructure} */
			const event = require(file);

			if (!EventNames.includes(event.name) || !event.name) {
				throw `${t("errors:validation.eventName")} - ${chalk.yellow(filename)}`;
			}

			if (!event.execute) {
				throw `${t("errors:validation.function")} - ${chalk.yellow(filename)}`;
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
			tableData.push([`${chalk.magenta(i)}`, chalk.green(filename), "» 🌱 «"]);
		} catch (error) {
			i++;
			tableData.push([`${chalk.magenta(i)}`, chalk.red(filename), "» 🔴 «"]);
			client.logger.error(error);
		}
	});

	if (client.config.table.event) console.log(table(tableData, tableConfig));

	client.logger.success(
		t("helpers:loadEvents", {
			count: chalk.yellow(client.events.size),
		}),
	);
}

module.exports = loadEvents;
