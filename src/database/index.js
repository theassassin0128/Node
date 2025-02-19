const mongoose = require("mongoose");
const chalk = require("chalk");

/**
 * A function to connect to mongodb through mongodb
 * @param {import("@root/src/lib/DiscordClient.js").DiscordClient} client
 * @returns {Promise<void>}
 */
async function connect(client) {
	try {
		await mongoose.connect(client.config.mongodbUri);
		client.logger.info(`${chalk.magenta("Mongodb")} database connected`);
	} catch (error) {
		client.logger.error(error);
	}
}

module.exports = {
	connect,
	users: require("./models/users.js"),
	guilds: require("./models/guilds.js"),
};
