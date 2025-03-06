const chalk = require("chalk");

/**
 * A function to validate the whole system before starting everything
 * @param {import("@lib/Bot").Bot} client
 * @returns {void}
 */
function validateSystem(client) {
  const { defaultLanguage, availableLanguages, dashboard, music, resources } =
    client.config;

  // Colors coded values with chalk colors
  const env = chalk.cyanBright(".env");

  // Checking if default locale was provided or not
  if (!process.env.DEFAULT_LANGUAGE) {
    client.logger.warn(
      `${chalk.yellow(
        "DEFAULT_LANGUAGE"
      )} in ${env} is empty. Using ${chalk.green("en")} as fallback locale.`
    );
  }

  // Checking the provided locale is valid or not
  else if (!availableLanguages.includes(defaultLanguage)) {
    client.logger.warn(
      `${chalk.yellow(
        "DEFAULT_LANGUAGE"
      )} in ${env} is invalid. Using ${chalk.green("en")} as fallback locale.`
    );
  }

  // Checking if bot token was provided or not
  if (!process.env.DISCORD_CLIENT_TOKEN) {
    client.logger.error(
      `${chalk.yellow(
        "DISCORD_CLIENT_TOKEN"
      )} in ${env} cannot be empty. Provide a valid token`
    );
    process.exit(1);
  }

  // Checking if guildId was provided or not
  if (!process.env.GUILD_ID) {
    client.logger.error(
      `${chalk.yellow(
        "GUILD_ID"
      )} in ${env} cannot be empty. Provide a valid guild id`
    );
    process.exit(1);
  }

  // Checking if bot ownerId was provided or not
  if (!process.env.OWNER_ID) {
    client.logger.error(
      `${chalk.yellow(
        "OWNER_ID"
      )} in ${env} cannot be empty. Provide a valid owner id`
    );
    process.exit(1);
  }

  // Checking if developer id was provided or not
  if (!process.env.DEV_IDS) {
    client.logger.warn(
      `${chalk.yellow(
        "DEV_IDS"
      )} in ${env} is empty. Developer commands won't work`
    );
  }

  // Checking if mongo uri was provided or not
  if (!process.env.MONGO_URI) {
    client.logger.error(
      `${chalk.yellow(
        "MONGO_URI"
      )} in ${env} cannot be empty. Provide a valid mongo uri`
    );
    process.exit(1);
  }

  // If dashboard is enabled check its config
  if (dashboard.enabled) {
    // Check if bot secret was provided or not
    if (!process.env.DISCORD_CLIENT_SECRET) {
      client.logger.error(
        `${chalk.yellow(
          "DISCORD_CLIENT_SECRET"
        )} in ${env} cannot be empty. Provide a valid secret`
      );
      process.exit(1);
    }

    // Check if dashboard port was provided or not
    if (!process.env.DASHBOARD_PORT) {
      client.logger.warn(
        `${chalk.yellow(
          "DASHBOARD_PORT"
        )} in ${env} is empty. Using ${chalk.magenta(
          dashboard.port
        )} as fallback port`
      );
    }

    // Checking if baseUrl was provived or not
    if (!dashboard.baseUrl) {
      client.logger.error(
        `${chalk.yellow("baseUrl")} cannot be empty. Provide a valid url`
      );
      process.exit(1);
    }

    // Checking if failureUrl was provived or not
    if (!dashboard.failureUrl) {
      client.logger.error(
        `${chalk.yellow("failureUrl")} cannot be empty. Provide a valid url`
      );
      process.exit(1);
    }
  }

  // If music enabled checking its config
  if (music.enabled) {
    // Checking if spotify credentials were provided or not
    // if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    // 	client.logger.warn(
    // 		`ENV: ${chalk.yellow("SPOTIFY_CLIENT_ID")} or ${chalk.yellow(
    // 			"SPOTIFY_CLIENT_SECRET",
    // 		)} were missing. Spotify music links won't work`,
    // 	);
    // }

    // Checking if lavalink nodes were provided in array or not
    if (!Array.isArray(music.lavalinkNodes)) {
      client.logger.error(
        `${chalk.yellow("lavalink-nodes")} must be an Array of Nodes`
      );
      process.exit(1);
    }

    // Checking if lavalink nodes were provided or not
    if (music.lavalinkNodes.length === 0) {
      client.logger.error(
        `${chalk.yellow("lavalink-nodes")} must have at least 1 Node to work`
      );
      process.exit(1);
    }

    // Checking if the provided source is valid or not
    if (
      !resources.Music.searchPlatforms.includes(music.defaultSearchPlatform)
    ) {
      client.logger.error(
        `${chalk.yellow(
          "defaultSearchPlatform"
        )} is invalid. Provide a valid search platform`
      );
      process.exit(1);
    }
  }

  // Checking if sopport server was provided or not
  if (!process.env.SUPPORT_SERVER) {
    client.logger.warn(
      `${chalk.yellow(
        "SUPPORT_SERVER"
      )} in ${env} is empty. This may cause issues in help related commands`
    );
  }

  // Checking if bot website was provided or not
  if (!process.env.BOT_WEBSITE) {
    client.logger.warn(
      `${chalk.yellow(
        "BOT_WEBSITE"
      )} in ${env} is empty. This may cause issues with dashboard`
    );
  }

  client.logger.info("Validated the whole configuration");
}

module.exports = { validateSystem };
