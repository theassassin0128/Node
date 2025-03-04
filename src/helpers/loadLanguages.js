const config = require("@src/config.js");
const { join } = require("path");
const { readdirSync, lstatSync } = require("fs");
const i18next = require("i18next");
const Backend = require("i18next-fs-backend");

/**
 * A function to get default locale for global use
 * @returns {string} - The default locale
 * @example getDefaultLocale();
 */
function getDefaultLanguage() {
  let { defaultLanguage, availableLanguages } = config;
  if (!availableLanguages.includes(defaultLanguage)) defaultLanguage = "en";
  return defaultLanguage;
}

/**
 * A function to load locales
 * @param {import("@lib/Bot.js").Bot} client
 * @returns {Promise<void>}
 * @example loadLocales(client);
 */
async function loadLanguages(client) {
  // initializing i18next with i18next-fs-backend
  await i18next.use(Backend).init({
    //debug: true,
    initAsync: false,
    load: "currentOnly",
    ns: ["commands", "context", "embeds", "events", "handlers", "player"],
    defaultNS: false,
    fallbackNS: false,
    fallbackLng: ["en"],
    lng: getDefaultLanguage(),
    interpolation: { escapeValue: false },
    preload: readdirSync(join(__dirname, "../locales")).filter((file) => {
      const isDirectory = lstatSync(
        join(__dirname, "../locales", file)
      ).isDirectory();
      const langFiles = readdirSync(join(__dirname, "../locales", file));

      if (isDirectory && langFiles.length > 0) return true;
    }),
    backend: {
      loadPath: join(__dirname, "../locales/{{lng}}/{{ns}}.json"),
      addPath: join(__dirname, "../locales/{{lng}}/{{ns}}.missing.json")
    }
  });

  client.logger.info("Loaded languages successfully");
}

module.exports = loadLanguages;
