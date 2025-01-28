const fs = require("fs");
const path = require("path");
const i18next = require("i18next");
const resources = require("@src/locales/index.js");
const { DiscordClient } = require("@lib/DiscordClient.js");

/**
 * A function to get default locale for global use
 * @param {DiscordClient} client - The Discord client
 * @returns {string} - The default locale
 * @example getDefaultLocale(client);
 */
function getDefaultLocale(client) {
	let { defaultLocale } = client.config;
	if (typeof defaultLocale !== "string") {
		defaultLocale = "en-US";
		return defaultLocale;
	}

	const localeFolders = fs.readdirSync(path.join(process.cwd(), "src", "locales"));
	if (!Array.isArray(localeFolders)) {
		throw new Error(
			"Couldn't load locales. Please make sure locale files exist within src folder.",
		);
	}

	if (defaultLocale.length <= 0 || !localeFolders.includes(defaultLocale)) {
		defaultLocale = "en-US";
	}

	return defaultLocale;
}

/**
 * A function to load locales
 * @param {DiscordClient} client - The Discord client
 * @returns {void}
 * @example loadLocales(client);
 */
function loadLocales(client) {
	i18next.init({
		fallbackLng: getDefaultLocale(client),
		defaultNS: "",
		interpolation: {
			escapeValue: false,
		},
		resources,
	});
}

module.exports = loadLocales;
