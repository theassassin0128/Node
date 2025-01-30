/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "trackEnd",
	player: true,
	/**
	 * @param {import("lavalink-client").Player} player
	 * @param {import("lavalink-client").Track} track
	 */
	execute: async (client, player, track) => {
		try {
			const guild = client.guilds.cache.get(player.guildId);
			if (!guild) return;

			/** @type {import("discord.js").TextBasedChannel} */
			const channel = guild.channels.cache.get(player.textChannelId);
			if (!channel) return;

			const messageId = player.get("messageId");
			if (!messageId) return;

			const message = await channel.messages.fetch(messageId);

			if (!message) return;

			return message.delete();
		} catch (error) {}
	},
};
