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
				{
					name: `/help`,
					type: ActivityType.Listening,
				},
			],
			status: "online",
		});

		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
