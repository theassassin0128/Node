const { table } = require("table");
const chalk = require("chalk");
const fetchCommands = require("./fetchCommands.js");
const checkForChange = require("./checkForChange.js");
const { t } = require("i18next");

/**
 * A function to synchronize Application Commands
 * @param {import("@lib/DiscordClient.js").DiscordClient} client
 * @returns {Promise<void>}
 */
module.exports = async (client) => {
	const { guildId, global } = client.config.bot;
	const oldCommands = await fetchCommands(client);
	const tableData = [[chalk.cyan("Action"), chalk.cyan("Command"), chalk.cyan("Reason")]];

	/** @type {import("table").TableUserConfig} */
	const tableConfig = {
		columnDefault: {
			alignment: "center",
		},
		border: client.utils.getTableBorder("red"),
		drawHorizontalLine: (lineIndex, rowCount) => {
			return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount;
		},
	};

	client.logger.warn(t("helpers:syncCommands.warning"));

	// This section is for the very first time when the bot is started
	// or when the bot's commands are removed from discord
	if (oldCommands.length <= 0) {
		const guildCommands = [];
		const globalCommands = [];

		client.commands.forEach((command) => {
			const { data, testOnly } = command;

			tableData.push([
				chalk.green(t("helpers:syncCommands.add")),
				chalk.magenta(data.name),
				chalk.yellow(t("helpers:syncCommands.addMessage")),
			]);

			if (!testOnly && global) globalCommands.push(data.toJSON());
			else guildCommands.push(data.toJSON());
		});

		if (guildCommands.length > 0) {
			await client.application.commands.set(guildCommands, guildId);
		}

		if (globalCommands.length > 0) {
			await client.application.commands.set(globalCommands);
		}

		return client.logger.success(t("helpers:syncCommands.success"));
	}

	// This checks for new commands and add them to discord
	client.commands
		.filter((command) => !oldCommands.some((c) => c.data.name === command.data.name))
		.forEach(async (command) => {
			try {
				const { data, testOnly } = command;

				tableData.push([
					chalk.green(t("helpers:syncCommands.add")),
					chalk.magenta(data.name),
					chalk.yellow(t("helpers:syncCommands.addMessage")),
				]);

				if (!testOnly && global) return await client.application.commands.create(data);
				else return await client.application.commands.create(data, guildId);
			} catch (error) {
				client.logger.error(error);
			}
		});

	// This checks for old commands and delete them from discord if needed
	oldCommands
		.filter((command) => !client.commands.some((c) => c.data.name === command.data.name))
		.forEach(async (command) => {
			try {
				tableData.push([
					chalk.red(t("helpers:syncCommands.delete")),
					chalk.magenta(command.data.name),
					chalk.yellow(t("helpers:syncCommands.deleteMessage")),
				]);

				return await command.data.delete();
			} catch (error) {
				client.logger.error(error);
			}
		});

	// This checks for changes in commands and update them if needed
	client.commands
		.filter((command) => oldCommands.some((c) => c.data.name === command.data.name))
		.forEach(async (newCommand) => {
			try {
				const { data, testOnly } = newCommand;
				const oldCommand = oldCommands.find((c) => c.data.name === data.name);

				if (
					global &&
					((oldCommand.global && (testOnly ?? false)) ||
						(!oldCommand.global && (!testOnly ?? false)))
				) {
					tableData.push([
						chalk.yellow(t("helpers:syncCommands.modify")),
						chalk.magenta(data.name),
						chalk.yellow(t("helpers:syncCommands.modifyMessageGlobal")),
					]);

					await oldCommand.data.delete();

					if (!testOnly && global) return await client.application.commands.create(data);
					else return await client.application.commands.create(data, guildId);
				}

				if (checkForChange(oldCommand, newCommand)) {
					tableData.push([
						chalk.yellow(t("helpers:syncCommands.modify")),
						chalk.magenta(data.name),
						chalk.yellow(t("helpers:syncCommands.modifyMessageData")),
					]);

					if (!testOnly && global) return await client.application.commands.create(data);
					else return await client.application.commands.create(data, guildId);
				}
			} catch (error) {
				client.logger.error(error);
			}
		});

	if (client.config.table.sync && tableData.length > 1) {
		console.log(table(tableData, tableConfig));
	}

	client.logger.success(t("helpers:syncCommands.success"));
};
