const chalk = require("chalk");
const { join } = require("path");
const { readdirSync, lstatSync } = require("fs");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");

/**
 * A function to get default locale for global use
 * @param {import("@lib/DiscordClient.js").DiscordClient} client - The Discord client
 * @returns {string} - The default locale
 * @example getDefaultLocale(client);
 */
function getDefaultLocale(client) {
	const { defaultLocale } = client.config;
	const localeFolders = readdirSync(join(__dirname, "../locales")).filter((fileName) => {
		const joinedPath = join(join(__dirname, "../locales"), fileName);
		if (lstatSync(joinedPath).isDirectory()) return true;
	});

	if (localeFolders.length === 0) {
		console.log(
			`Couldn't load locales. Make sure locale files exist within ${chalk.yellow(
				"src/locales",
			)} folder.`,
		);
		process.exit(1);
	}

	if (!localeFolders.includes(defaultLocale)) return "en-US";
	else return defaultLocale;
}

/**
 * A function to load locales
 * @param {import("@lib/DiscordClient.js").DiscordClient} client - The Discord client
 * @returns {void}
 * @example loadLocales(client);
 */
function loadLocales(client) {
	// initializing i18next with i18next-fs-backend
	i18next.use(Backend).init({
		// debug: true,
		initAsync: false,
		load: "currentOnly",
		ns: [
			"commands",
			"context",
			"db",
			"embeds",
			"errors",
			"events",
			"handlers",
			"helpers",
			"utils",
		],
		defaultNS: false,
		fallbackNS: false,
		fallbackLng: ["en-US"],
		lng: getDefaultLocale(client),
		interpolation: { escapeValue: false },
		preload: readdirSync(join(__dirname, "../locales")).filter((fileName) => {
			const joinedPath = join(join(__dirname, "../locales"), fileName);
			if (lstatSync(joinedPath).isDirectory()) return true;
		}),
		backend: {
			loadPath: join(__dirname, "../locales/{{lng}}/{{ns}}.json"),
			addPath: join(__dirname, "../locales/{{lng}}/{{ns}}.missing.json"),
		},
	});
}

module.exports = loadLocales;
