const { table } = require("table");
const colors = require("colors");
const fetchCommands = require("./fetchCommands.js");
const checkForChange = require("./checkForChange.js");
const { t } = require("i18next");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

/**
 * A function to synchronize Application Commands
 * @param {import("@lib/DiscordClient.js").DiscordClient} client
 * @returns {Promise<void>}
 */
module.exports = async (client) => {
	const { config } = client;
	const guildId = config.bot.guildId;
	/** @type {Error[]}*/
	const errors = [];

	/** @type {import("@types/command").CommandStructure[]} */
	const newCommands = [];
	const oldCommands = await fetchCommands(client);

	client.commands.forEach((c) => newCommands.push(c));

	const tableData = [
		[colors.cyan("Status"), colors.cyan("Command"), colors.cyan("Reason")],
	];

	/**
	 * @type {import("table").TableUserConfig}
	 */
	const tableConfig = {
		columnDefault: {
			alignment: "center",
		},
		border: client.functions.getTableBorder("red"),
		drawHorizontalLine: (lineIndex, rowCount) => {
			return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
		},
	};

	logger.warn(t("utils:syncCommands.warning"));

	// This section is for the very first time when the bot is started
	// or when the bot's commands are removed from discord side
	if (oldCommands.length <= 0) {
		const guildCommands = [];
		const globalCommands = [];

		client.commands.forEach((command) => {
			const { data, testOnly } = command;

			tableData.push([
				colors.green(t("utils:syncCommands.add")),
				colors.magenta(data.name),
				colors.yellow(t("utils:syncCommands.addMessage")),
			]);

			if (testOnly || !config.command.global) guildCommands.push(data.toJSON());
			else globalCommands.push(data.toJSON());
		});

		if (guildCommands.length > 0) {
			await client.application.commands.set(guildCommands, guildId);
		}

		if (globalCommands.length > 0) {
			await client.application.commands.set(globalCommands);
		}

		return logger.success(colors.green(t("utils:syncCommands.success")));
	}

	const commandsToAdd = newCommands.filter(
		(command) => !oldCommands.some((c) => c.data.name === command.data.name),
	);

	for (const command of commandsToAdd) {
		try {
			const { data, testOnly } = command;

			tableData.push([
				colors.green(t("utils:syncCommands.add")),
				colors.magenta(data.name),
				colors.yellow(t("utils:syncCommands.addMessage")),
			]);

			if (testOnly || !config.command.global) {
				await client.application.commands.create(data.toJSON(), guildId);
			} else {
				await client.application.commands.create(data.toJSON());
			}
		} catch (error) {
			errors.push(error);
		}
	}

	const commandsToDelete = oldCommands.filter(
		(command) => !newCommands.some((c) => c.data.name === command.data.name),
	);

	for (const command of commandsToDelete) {
		try {
			tableData.push([
				colors.red(t("utils:syncCommands.delete")),
				colors.magenta(command.data.name),
				colors.yellow(t("utils:syncCommands.deleteMessage")),
			]);

			await command.data.delete();
		} catch (error) {
			errors.push(error);
		}
	}

	const commandsToModify = newCommands.filter((command) =>
		oldCommands.some((c) => c.data.name === command.data.name),
	);

	for (const newCommand of commandsToModify) {
		try {
			const oldCommand = oldCommands.find((c) => c.data.name === newCommand.data.name);
			const { data, testOnly } = newCommand;

			if (config.command.global) {
				if (
					(oldCommand.global && (testOnly ?? false)) ||
					(!oldCommand.global && (!testOnly ?? false))
				) {
					tableData.push([
						colors.yellow(t("utils:syncCommands.modify")),
						colors.magenta(data.name),
						colors.yellow(t("utils:syncCommands.modifyMessageGlobal")),
					]);

					await oldCommand.data.delete();

					if (testOnly || !config.command.global) {
						await client.application.commands.create(data, guildId);
					} else {
						await client.application.commands.create(data);
					}

					continue;
				}
			}

			if (checkForChange(oldCommand, newCommand)) {
				tableData.push([
					colors.yellow(t("utils:syncCommands.modify")),
					colors.magenta(data.name),
					colors.yellow(t("utils:syncCommands.modifyMessageData")),
				]);

				if (testOnly || !config.command.global) {
					await client.application.commands.create(data, guildId);
				} else {
					await client.application.commands.create(data);
				}

				continue;
			}
		} catch (error) {
			errors.push(error);
		}
	}

	if (errors.length > 0) {
		console.log(colors.yellow(t("utils:syncCommands.eStart")));
		errors.forEach((error) => {
			console.log(colors.red(error));
		});
		console.log(colors.yellow(t("utils:syncCommands.eEnd")));
	}

	if (client.config.table.enabled.sync && tableData.length > 1) {
		console.log(table(tableData, tableConfig));
	}

	logger.success(t("utils:syncCommands.success"));
};
