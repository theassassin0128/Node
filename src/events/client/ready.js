const { ActivityType, Client } = require("discord.js");
const { connect } = require("mongoose");
const mongoURL = process.env("DataBase");

module.exports = {
	name: "ready",
	once: true,
	/**
	 *
	 * @param {Client} client
	 */
	execute: async (client) => {
		client.user.setPresence({
			activities: [
				{
					name: `${client.guilds.cache.size} Servers!`,
					type: ActivityType.Watching,
				},
				{
					name: "/help",
					type: ActivityType.Listening,
				},
			],
			status: "dnd",
		});

		if (!mongoURL) return;

		connect(mongoURL, {
			keepAlive: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		if (connect) {
			console.log("MongoDB".green, "database is connected.");
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
