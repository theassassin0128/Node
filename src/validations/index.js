const chalk = require("chalk");
const { t } = require("i18next");
const { join } = require("path");
const { readdirSync, lstatSync } = require("fs");
const { EventNames } = require("./events.js");
const { Permissions } = require("./permissions.js");

/**
 * A function to validate the whole system before starting everything
 * @param {import("@lib/DiscordClient").DiscordClient} client
 * @returns {Promise<void>}
 */
async function validateSystem(client) {
	const { defaultLocale, bot, dashboard, music, links } = client.config;
	const { error, warn } = client.logger;

	// Colors coded values with chalk colors
	const env = chalk.cyanBright(".env");

	// Checking if default locale was provided or not
	if (!process.env.DEFAULT_LOCALE) {
		warn(
			`Value of ${chalk.yellowBright(
				"DEFAULT_LOCALE",
			)} in ${env} was empty. Using ${chalk.greenBright("en-US")} as fallback locale.`,
		);
	}

	// Checking the provided locale is valid or not
	else {
		const localeFolders = readdirSync(join(__dirname, "../locales")).filter(
			(fileName) => {
				const joinedPath = join(join(__dirname, "../locales"), fileName);
				if (lstatSync(joinedPath).isDirectory()) return true;
			},
		);

		if (!localeFolders.includes(defaultLocale)) {
			warn(
				`Provided value of ${chalk.yellowBright(
					"DEFAULT_LOCALE",
				)} in ${env} is invalid. Using ${chalk.greenBright("en-US")} as fallback locale.`,
			);
		}
	}

	// Checking if bot token was provided or not
	if (!process.env.DISCORD_CLIENT_TOKEN) {
		error(
			t("errors:env.emptyValue", {
				value: chalk.yellowBright("DISCORD_CLIENT_TOKEN"),
			}) + ` - ${env}`,
		);
		process.exit(1);
	}

	// Checking if guildId was provided or not
	if (!process.env.GUILD_ID) {
		error(
			t("errors:env.emptyValue", { value: chalk.yellowBright("GUILD_ID") }) + ` - ${env}`,
		);
		process.exit(1);
	}

	// Checking if bot ownerId was provided or not
	if (!process.env.OWNER_ID) {
		error(
			t("errors:env.emptyValue", { value: chalk.yellowBright("OWNER_ID") }) + ` - ${env}`,
		);
		process.exit(1);
	}

	// Checking if mongo uri was provided or not
	if (!process.env.MONGO_URI) {
		error(
			t("errors:env.emptyValue", { value: chalk.yellowBright("MONGO_URI") }) +
				` - ${env}`,
		);
		process.exit(1);
	}

	// If dashboard is enabled check its config
	if (dashboard.enabled) {
		// Check if bot secret was provided or not
		if (!process.env.DISCORD_CLIENT_SECRET) {
			error(
				t("errors:env.emptyValue", {
					value: chalk.yellowBright("DISCORD_CLIENT_SECRET"),
				}) + ` - ${env}`,
			);
			process.exit(1);
		}

		// Check if dashboard port was provided or not
		if (!process.env.DASHBOARD_PORT) {
			warn(
				t("errors:env.port", {
					value: chalk.yellowBright("DASHBOARD_PORT"),
					port: chalk.magentaBright(dashboard.port),
				}),
			);
		}
	}

	// if (music.enabled) {
	// 	if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
	// 		warn(
	// 			`ENV: ${chalk.yellow("SPOTIFY_CLIENT_ID")} or ${chalk.yellow(
	// 				"SPOTIFY_CLIENT_SECRET",
	// 			)} are missing. Spotify music links won't work`,
	// 		);
	// 	}
	// }

	// Checking if developer id was provided or not
	if (bot.devs.length === 0) {
		warn(t("errors:env.devs", { value: chalk.yellowBright("bot.devs") }) + ` - ${env}`);
	}

	// If dashboard enabled checking its config
	if (dashboard.enabled) {
		// Checking if details are provided or not
		if (!dashboard.baseUrl || !dashboard.failureUrl) {
			error(
				t("errors:config.dashboard", {
					value: `${chalk.yellowBright("baseUrl")} or ${chalk.yellowBright("failurUrl")}`,
					location: chalk.cyanBright("config.dahsboard"),
				}),
			);
			process.exit(1);
		}
	}

	// If music enabled checking its config
	if (music.enabled) {
		// Checking if lavalink nodes are provided in array or not
		if (!Array.isArray(music.lavalinkNodes)) {
			error(
				t("errors:config.nodeArray", {
					value: chalk.yellowBright("music.lavalinkNodes"),
				}),
			);
			process.exit(1);
		}

		// Checking if lavalink nodes are provided or not
		if (music.lavalinkNodes.length === 0) {
			error(
				t("errors:config.lavalinkNode", {
					value: chalk.yellowBright("music.lavalinkNodes"),
				}),
			);
			process.exit(1);
		}

		// Checking if the provided source is valid or not
		if (!music.sources.includes(music.defaultSource)) {
			error(
				t("errors:config.defaultSource", {
					value: chalk.yellowBright("music.defaultSource"),
				}),
			);
			process.exit(1);
		}
	}

	// Checking if support server link is provided or not
	if (links.supportServer.length !== 0) {
		warn(
			`CONFIG: ${chalk.yellow("links.supportServer")} is empty. Help won't be available.`,
		);
	}
}

module.exports = { EventNames, Permissions, validateSystem };
