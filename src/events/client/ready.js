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

		if (!mongodb) return;

		mongoose.connect(mongodb, {
			keepAlive: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		mongoose.set("strictQuery", false);
		if (mongoose.connect) {
			console.log("Successfully connected to the DATABASE.");
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
