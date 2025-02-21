const mongoose = require("mongoose");
const chalk = require("chalk");
const { t } = require("i18next");

/**
 * A function to connect to mongodb through mongodb
 * @param {import("@lib/DiscordClient.js").DiscordClient} client
 * @returns {Promise<void>}
 */
async function connect(client) {
	try {
		await mongoose.connect(client.config.mongodbUri);
		client.logger.info(t("db:connected", { db: chalk.magentaBright("Mongodb") }));
	} catch (error) {
		client.logger.error(error);
	}
}

module.exports = {
	connect,
	users: require("./models/users.js"),
	guilds: require("./models/guilds.js"),
};
