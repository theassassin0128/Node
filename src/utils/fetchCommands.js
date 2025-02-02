const colors = require("colors");
const { t } = require("i18next");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

/**
 * A function to fetch Application Commands
 * @param {import("@lib/DiscordClient").DiscordClient} client
 * @returns {Promise<import("@types/utils").OldCommand[]>}
 */
async function fetchCommands(client) {
	if (typeof client !== "object") {
		throw new TypeError(t("errors:missing.param", { param: colors.yellow("client") }));
	}

	const ApplicationCommands = [];

	try {
		const globalCommands = await client.application.commands.fetch({
			withLocalizations: true,
		});

		globalCommands.forEach((command) => {
			ApplicationCommands.push({ data: command, global: true });
		});

		const guildCommands = await client.application.commands.fetch({
			guildId: client.config.bot.guildId,
			withLocalizations: true,
		});

		guildCommands.forEach((command) => {
			ApplicationCommands.push({ data: command, global: false });
		});
	} catch (error) {
		console.log(colors.yellow(t("utils:fetchCommands.eStart")));
		console.log(t("utils:fetchCommands.error", { err: colors.red(error) }));
		console.log(colors.yellow(t("utils:fetchCommands.eEnd")));
	}

	logger.info(
		t("utils:fetchCommands.success", {
			count: colors.yellow(ApplicationCommands.length),
		}),
	);

	return ApplicationCommands;
}

module.exports = fetchCommands;
