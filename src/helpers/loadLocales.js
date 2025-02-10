const fs = require("fs");
const path = require("path");
const i18next = require("i18next");
const config = require("@src/config");
const resources = require("@src/locales/index.js");

/**
 * A function to get default locale for global use
 * @param {import("@lib/DiscordClient.js").DiscordClient} client - The Discord client
 * @returns {string} - The default locale
 * @example getDefaultLocale(client);
 */
function getDefaultLocale() {
	let { defaultLocale } = config;
	if (typeof defaultLocale !== "string") {
		throw new TypeError(
			"Please provide a valid language. For supported languages check docs.",
		);
	}

	const localeFolders = fs.readdirSync(path.join(process.cwd(), "src", "locales"));
	if (!Array.isArray(localeFolders)) {
		throw new Error(
			"Couldn't load locales. Make sure locale files exist within src folder.",
		);
	}

	if (!defaultLocale || !localeFolders.includes(defaultLocale)) {
		console.log(localeFolders);
		defaultLocale = "en-US";
	}

	return defaultLocale;
}

/**
 * A function to load locales
 * @param {import("@lib/DiscordClient.js").DiscordClient} client - The Discord client
 * @returns {void}
 * @example loadLocales(client);
 */
function loadLocales() {
	i18next.init({
		fallbackLng: getDefaultLocale(),
		defaultNS: "",
		interpolation: {
			escapeValue: false,
		},
		resources,
	});
}

module.exports = loadLocales;
