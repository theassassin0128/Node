const { DataBase } = process.env;
const { connect } = require("mongoose");
const { Client, ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	/**
	 *
	 * @param {Client} client
	 * @returns
	 */
	execute: async (client) => {
		client.user.setPresence({
			activities: [
				{
					name: `${client.guilds.cache.size} Servers!`,
					type: ActivityType.Watching,
				},
			],
			status: "online",
		});

		console.log(`Ready! Logged in as ${client.user.tag}`);
		if (!DataBase) return;
		try {
			connect(DataBase, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log("DataBase is Connected.");
		} catch (error) {
			console.error(error);
		}
	},
};
