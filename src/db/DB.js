const { connect } = require("mongoose");
const colors = require("colors");
const { t } = require("i18next");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

class DB {
	/**
	 * Typing for the MongoDB client
	 * @param {import("@lib/DiscordClient.js").DiscordClient} client
	 * @returns {void}
	 */
	constructor(client) {
		this.client = client;
	}

	/**
	 * A function to connect to mongodb through mongodb
	 * @returns {Promise<void>}
	 */
	async init() {
		try {
			await connect(this.client.config.mongoUri);
			logger.info(t("db:connected", { db: colors.magenta("Mongodb") }));
		} catch (error) {
			logger.info(t("db:error", { db: colors.magenta("Mongodb") }));
		}
	}
}

module.exports = { DB };
