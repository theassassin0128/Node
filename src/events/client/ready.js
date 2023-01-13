const { ActivityType } = require("discord.js");

module.exports = {
	name: "ready",
	once: true,
	execute: async (client) => {
		client.user.setPresence({
			activities: [
				{
					name: `Genshin Impact`,
					type: ActivityType.Playing,
				},
			],
			status: "online",
		});

		const ascii = require("ascii-table");
		const table = new ascii("INFO");

		table.addRow("status", "🟢 online");
		table.addRow("tag", client.user.tag);
		table.addRow("id", client.user.id);
		table.addRow("servers", client.guilds.cache.size);

		console.log(table.toString());
	},
};
