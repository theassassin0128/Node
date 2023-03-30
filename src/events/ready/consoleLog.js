const { ActivityType, Client } = require("discord.js");
const mongoose = require("mongoose");
const { mongodb } = process.env;

module.exports = {
	name: "ready",
	once: true,
	/**
	 *
	 * @param {Client} client
	 */
	execute: async (client) => {
		console.log(
			"\n\x1b[36m%s\x1b[0m",
			`Ready! Logged in as ${client.user.tag}`
		);

		if (!mongodb) return;
		try {
			mongoose.connect(mongodb, {
				keepAlive: true,
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log("DATABASE connected.");
		} catch (error) {
			console.error(`Error Occured:\n${error}`);
		}
	},
};
