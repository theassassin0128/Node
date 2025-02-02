const mongoose = require("mongoose");
const colors = require("colors");
const { t } = require("i18next");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

class DB {
	/**
	 * Typing for the MongoDB client
	 * @param {import("@lib/DiscordClient.js").DiscordClient} client
	 */
	constructor(client) {
		// to use inside this class
		this.client = client;

		// For easy access and usability
		this.models = {
			logger: require("./models/logger.js"),
		};
	}

	/**
	 * A function to connect to mongodb through mongodb
	 * @returns {Promise<void>}
	 */
	async init() {
		try {
			await mongoose.connect(this.client.config.mongodbUri);
			logger.success(t("db:connected", { db: colors.magenta("Mongodb") }));
		} catch (error) {
			logger.error(
				t("db:error", { db: colors.magenta("Mongodb"), err: colors.red(error) }),
			);
		}
	}
}

module.exports = { DB };
