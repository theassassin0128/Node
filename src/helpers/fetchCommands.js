const chalk = require("chalk");
const { t } = require("i18next");

/**
 * A function to fetch Application Commands
 * @param {import("@lib/DiscordClient").DiscordClient} client
 * @returns {Promise<import("@types/utils").OldCommand[]>}
 */
async function fetchCommands(client) {
	if (typeof client !== "object") {
		throw new TypeError(t("errors:missing.param", { param: chalk.yellow("client") }));
	}

	try {
		const ApplicationCommands = [];

		(
			await client.application.commands.fetch({
				withLocalizations: true,
			})
		).forEach((command) => {
			ApplicationCommands.push({ data: command, global: true });
		});

		(
			await client.application.commands.fetch({
				guildId: client.config.bot.guildId,
				withLocalizations: true,
			})
		).forEach((command) => {
			ApplicationCommands.push({ data: command, global: false });
		});

		client.logger.info(
			t("helpers:fetchCommands", {
				count: chalk.yellow(ApplicationCommands.length),
			}),
		);

		return ApplicationCommands;
	} catch (error) {
		client.logger.error(error);
	}
}

module.exports = fetchCommands;
