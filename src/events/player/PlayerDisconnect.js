/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "playerDisconnect",
	player: true,
	/**
	 * @param {import("lavalink-client").Player} player
	 * @param {string} voiceChannelId
	 * @returns
	 */
	execute: async (client, player, voiceChannelId) => {
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

			if (message.editable) {
				return await message.edit({ components: [] });
			}
		} catch (error) {}
	},
};
