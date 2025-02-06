const mongoose = require("mongoose");
const chalk = require("chalk");
const { t } = require("i18next");

class DB {
	/**
	 * Typing for the MongoDB client
	 * @param {import("@lib/DiscordClient.js").DiscordClient} client
	 */
	constructor(client) {
		// to use inside this class
		this.client = client;

		// For easy access and usability
		this.users = require("./models/users.js");
		this.guilds = require("./models/guilds.js");
	}

	/**
	 * A function to connect to mongodb through mongodb
	 * @returns {Promise<void>}
	 */
	async init() {
		try {
			await mongoose.connect(this.client.config.mongodbUri);
			this.client.logger.info(t("db:connected", { db: chalk.magenta("Mongodb") }));
		} catch (error) {
			this.client.logger.error(
				t("db:error", { db: chalk.magenta("Mongodb"), err: chalk.red(error) }),
			);
		}
	}
}

module.exports = { DB };
