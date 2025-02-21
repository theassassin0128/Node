const chalk = require("chalk");
const { t } = require("i18next");

/**
 * A function to validate the whole system before starting everything
 * @param {import("@lib/DiscordClient").DiscordClient} client
 * @returns {Promise<void>}
 */
async function validateSystem(client) {
	const { language, bot, dashboard, music, links } = client.config;
	const { error, warn } = client.logger;

	// Colors coded values with chalk colors
	const env = chalk.cyanBright(".env");

	// Checking if default locale was provided or not
	if (!process.env.DEFAULT_LOCALE) {
		warn(
			`Value of ${chalk.yellowBright(
				"DEFAULT_LOCALE",
			)} in ${env} was empty. Using ${chalk.greenBright("en")} as fallback locale.`,
		);
	}

	// Checking the provided locale is valid or not
	else {
		if (!language.availableLocales.includes(language.defaultLocale)) {
			warn(
				`Provided value of ${chalk.yellowBright(
					"DEFAULT_LOCALE",
				)} in ${env} is invalid. Using ${chalk.greenBright("en")} as fallback locale.`,
			);
		}
	}

	// Checking if bot token was provided or not
	if (!process.env.DISCORD_CLIENT_TOKEN) {
		error(
			t("errors:emptyValue", {
				value: chalk.yellowBright("DISCORD_CLIENT_TOKEN"),
			}) + ` - ${env}`,
		);
		process.exit(1);
	}

	// Checking if guildId was provided or not
	if (!process.env.GUILD_ID) {
		error(
			t("errors:emptyValue", { value: chalk.yellowBright("GUILD_ID") }) + ` - ${env}`,
		);
		process.exit(1);
	}

	// Checking if bot ownerId was provided or not
	if (!process.env.OWNER_ID) {
		error(
			t("errors:emptyValue", { value: chalk.yellowBright("OWNER_ID") }) + ` - ${env}`,
		);
		process.exit(1);
	}

	// Checking if mongo uri was provided or not
	if (!process.env.MONGO_URI) {
		error(
			t("errors:emptyValue", { value: chalk.yellowBright("MONGO_URI") }) + ` - ${env}`,
		);
		process.exit(1);
	}

	// If dashboard is enabled check its config
	if (dashboard.enabled) {
		// Check if bot secret was provided or not
		if (!process.env.DISCORD_CLIENT_SECRET) {
			error(
				t("errors:emptyValue", {
					value: chalk.yellowBright("DISCORD_CLIENT_SECRET"),
				}) + ` - ${env}`,
			);
			process.exit(1);
		}

		// Check if dashboard port was provided or not
		if (!process.env.DASHBOARD_PORT) {
			warn(
				t("errors:emptyPort", {
					value: chalk.yellowBright("DASHBOARD_PORT"),
					port: chalk.magentaBright(dashboard.port),
				}),
			);
		}

		// Checking if baseUrl is provided or not
		if (!dashboard.baseUrl) {
			error(
				t("errors:emptyValue", {
					value: chalk.yellowBright("baseUrl"),
				}),
			);
			process.exit(1);
		}

		// Checking if failureUrl is provided or not
		if (!dashboard.failureUrl) {
			error(
				t("errors:emptyValue", {
					value: chalk.yellowBright("failureUrl"),
				}),
			);
			process.exit(1);
		}
	}

	// Checking if developer id was provided or not
	if (!process.env.DEV_IDS) {
		warn(
			t("errors:emptyWarn", { value: chalk.yellowBright("process.env.DEV_IDS") }) +
				` - ${env}`,
		);
	}

	// If music enabled checking its config
	if (music.enabled) {
		// if (music.enabled) {
		// 	if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
		// 		warn(
		// 			`ENV: ${chalk.yellow("SPOTIFY_CLIENT_ID")} or ${chalk.yellow(
		// 				"SPOTIFY_CLIENT_SECRET",
		// 			)} are missing. Spotify music links won't work`,
		// 		);
		// 	}
		// }

		// Checking if lavalink nodes are provided in array or not
		if (!Array.isArray(music.lavalinkNodes)) {
			error(
				t("errors:nodeArray", {
					value: chalk.yellowBright("music.lavalinkNodes"),
				}),
			);
			process.exit(1);
		}

		// Checking if lavalink nodes are provided or not
		if (music.lavalinkNodes.length === 0) {
			error(
				t("errors:lavalinkNode", {
					value: chalk.yellowBright("music.lavalinkNodes"),
				}),
			);
			process.exit(1);
		}

		// Checking if the provided source is valid or not
		if (!music.sources.includes(music.defaultSource)) {
			error(
				t("errors:defaultSource", {
					value: chalk.yellowBright("music.defaultSource"),
				}),
			);
			process.exit(1);
		}
	}

	// Checking if support server link is provided or not
	if (!process.env.SUPPORT_SERVER) {
		warn(
			t("errors:emptyWarn", { value: chalk.yellowBright("SUPPORT_SERVER") }) +
				` - ${env}`,
		);
	}

	if (!process.env.BOT_WEBSITE) {
		warn(
			t("errors:emptyWarn", { value: chalk.yellowBright("BOT_WEBSITE") }) + ` - ${env}`,
		);
	}
}

module.exports = validateSystem;
