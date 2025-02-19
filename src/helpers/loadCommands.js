const { Collection } = require("discord.js");
const chalk = require("chalk");
const { t } = require("i18next");
const loadFiles = require("./loadFiles");
const { Permissions } = require("@src/validations");
const categories = require("@src/categories.js");

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

	client.commands.clear();

	const commandFiles = await loadFiles(dir, [".js"]);
	for (const file of commandFiles) {
		try {
			const filename = chalk.yellow(file.split(/[\\/]/g).pop());

			/** @type {import("@root/src/types/command.js").CommandStructure} */
			const command = require(file);

			if (command.disabled) continue;

			if (command?.category !== "none") {
				if (categories[command.category]?.enabled === false) continue;
			}

			if ((command.cooldown ?? client.config.bot.defaultCooldown) > 0) {
				client.cooldowns.set(command.data.name, new Collection());
			}

			if (command.global === undefined) command.global = client.config.bot.global;

			if (command?.botPermissions?.length > 0) {
				command.botPermissions.forEach((p) => {
					if (!Permissions.includes(p)) {
						throw `${t("errors:validation.permission", {
							p: chalk.yellow(p),
							t: "user",
						})} - ${filename}`;
					}
				});
			}

			if (command?.userPermissions?.length > 0) {
				command.userPermissions.forEach((p) => {
					if (!Permissions.includes(p)) {
						throw `${t("errors:validation.permission", {
							p: chalk.yellow(p),
							t: "bot",
						})} - ${filename}`;
					}
				});
			}

			if (!command.data) throw `${t("errors:validation.commandData")} - ${filename}`;
			if (!command.execute) throw `${t("errors:validation.function")} - ${filename}`;
			client.commands.set(command.data.name, command);
		} catch (error) {
			client.logger.error(error);
		}
	}

	client.logger.success(
		t("helpers:loadCommands", {
			count: chalk.yellow(client.commands.size),
		}),
	);
}

module.exports = loadCommands;
