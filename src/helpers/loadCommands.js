const { Collection } = require("discord.js");
const chalk = require("chalk");
const { table } = require("table");
const { t } = require("i18next");
const loadFiles = require("./loadFiles");
const { Permissions } = require("@src/validations/permissions.js");

/**
 * A function to load command modules
 * @param {import("@lib/DiscordClient.js").DiscordClient} client - The Discord client
 * @param {string} dir - The directory to load commands from
 * @returns {Promise<void>}
 * @example await loadCommands(client, "src/commands");
 */
async function loadCommands(client, dir) {
	if (typeof client !== "object") {
		throw new TypeError(t("errors:missing.param", { param: chalk.yellow("client") }));
	}

	if (typeof dir !== "string") {
		throw new TypeError(t("errors:type.string"), { param: chalk.yellow("dir") });
	}

	const tableData = [[chalk.cyan("Index"), chalk.cyan("File"), chalk.cyan("Status")]];
	/** @type {import("table").TableUserConfig} */
	const tableConfig = {
		columnDefault: {
			alignment: "center",
			width: 30,
		},
		columns: [{ width: 5 }, {}, { width: 6 }],
		border: client.utils.getTableBorder("blue"),
		drawHorizontalLine: (lineIndex, rowCount) => {
			return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
		},
	};

	let i = 0;
	client.commands.clear();

	(await loadFiles(dir, [".js"])).forEach((file) => {
		const filename = file.split(/[\\/]/g).pop();

		try {
			/** @type {import("@types/command.js").CommandStructure} */
			const command = require(file);

			if (command.disabled) return;

			if (command?.category !== "none") {
				if (client.config.categories[command.category]?.enabled === false) return;
			}

			if ((command.cooldown ?? client.config.bot.defaultCooldown) > 0) {
				client.cooldowns.set(command.data.name, new Collection());
			}

			if (command?.botPermissions?.length > 0) {
				command.botPermissions.forEach((p) => {
					if (!Permissions.includes(p)) {
						throw `${t("errors:validation.permission", {
							p: chalk.yellow(p),
							t: "user",
						})} - ${chalk.yellow(filename)}`;
					}
				});
			}

			if (command?.userPermissions?.length > 0) {
				command.userPermissions.forEach((p) => {
					if (!Permissions.includes(p)) {
						throw `${t("errors:validation.permission", {
							p: chalk.yellow(p),
							t: "bot",
						})} - ${chalk.yellow(filename)}`;
					}
				});
			}

			if (!command.data) {
				throw `${t("errors:validation.commandData")} - ${chalk.yellow(filename)}`;
			}

			if (!command.execute) {
				throw `${t("errors:validation.function")} - ${chalk.yellow(filename)}`;
			}

			client.commands.set(command.data.name, command);

			i++;
			tableData.push([`${chalk.magenta(i)}`, chalk.green(filename), "» 🌱 «"]);
		} catch (error) {
			i++;
			tableData.push([`${chalk.magenta(i)}`, chalk.red(filename), "» 🔴 «"]);
			client.logger.error(error);
		}
	});

	if (client.config.table.command) console.log(table(tableData, tableConfig));

	client.logger.success(
		t("helpers:loadCommands", {
			count: chalk.yellow(client.commands.size),
		}),
	);
}

module.exports = loadCommands;
