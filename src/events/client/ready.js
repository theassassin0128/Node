const { ActivityType, Client } = require("discord.js");
const { connect } = require("mongoose");
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

		connect(mongodb, {
			keepAlive: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		if (connect) {
			console.log("Successfully connected to the DATABASE.");
		}

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
