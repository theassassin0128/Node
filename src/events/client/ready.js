const { ActivityType, Client } = require("discord.js");
const ascii = require("ascii-table");

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
				{
					name: "Genshin Impact",
					type: ActivityType.Playing,
				},
			],
			status: "online",
		});

		const table = new ascii("INFO");

		table.addRow("status", "🟢 online");
		table.addRow("tag", client.user.tag);
		table.addRow("id", client.user.id);
		table.addRow("servers", client.guilds.cache.size);

		console.log(table.toString());
	},
};
