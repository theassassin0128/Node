const colors = require("colors");
const { table } = require("table");
const { Permissions } = require("@src/validations/permissions.js");
const { t } = require("i18next");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();
const { DiscordClient } = require("@lib/DiscordClient.js");

/**
 * A function to load command modules
 * @param {DiscordClient} client - The Discord client
 * @param {string} dir - The directory to load commands from
 * @returns {Promise<void>}
 * @example await loadCommands(client, "src/commands");
 */
async function loadCommands(client, dir) {
	if (typeof client !== "object") {
		throw new TypeError(t("errors:missing.param", { param: colors.yellow("client") }));
	}
	if (typeof dir !== "string") {
		throw new TypeError(t("errors:type.string"), { param: colors.yellow("dir") });
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
		border: client.functions.getTableBorder("blue"),
		drawHorizontalLine: (lineIndex, rowCount) => {
			return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
		},
	};

	/**
	 * @type {Array<{file: string, error: Error}>}
	 */
	const errors = [];
	const files = await client.utils.loadFiles(dir, [".js"]);
	client.commands.clear();

	let i = 0;
	for (const file of files) {
		const filename = file.split(/[\\/]/g).pop();

		try {
			/** @type {import("@types/command.d.ts").CommandStructure} */
			const command = require(file);

			if (command.disabled) continue;

			if (command?.category !== "none") {
				if (client.config.categories[command.category]?.enabled === false) continue;
			}

			if (command?.botPermissions?.length > 0) {
				for (let p of command.botPermissions) {
					if (!Permissions.includes(p)) {
						throw new Error(t("errors:validation.permission", { p: colors.yellow(p) }));
					}
				}
			}

			if (command?.userPermissions?.length > 0) {
				for (let p of command.userPermissions) {
					if (!Permissions.includes(p)) {
						throw new Error(t("errors:validation.permission", { p: colors.yellow(p) }));
					}
				}
			}

			if (!command.data) {
				throw new Error(t("errors:validation.commandData"));
			}

			if (!command.execute) {
				throw new Error(t("errors:validation.function"));
			}

			client.commands.set(command.data.name, command);

			i++;
			tableData.push([`${colors.magenta(i)}`, colors.green(filename), "» 🌱 «"]);
		} catch (error) {
			i++;
			tableData.push([`${colors.magenta(i)}`, colors.red(filename), "» 🔴 «"]);
			errors.push({ file: file, error: error });
		}
	}

	if (client.config.table.enabled.command) console.log(table(tableData, tableConfig));

	if (errors.length > 0) {
		console.log(colors.yellow(t("helpers:loadCommands.eStart")));
		errors.forEach((e) => {
			console.log(colors.green(e.file), "\n", colors.red(e.error), "\n");
		});
		console.log(colors.yellow(t("helpers:loadCommands.eEnd")));
	}

	logger.info(
		t("helpers:loadCommands.loaded", {
			count: colors.yellow(client.commands.size),
			dir: colors.green(dir),
		}),
	);
}

module.exports = loadCommands;
