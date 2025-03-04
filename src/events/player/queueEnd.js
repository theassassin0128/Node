/** @type {import("@types/index").EventStructure} */
module.exports = {
  name: "queueEnd",
  player: true,
  /**
   * @param {import("lavalink-client").Player} player
   * @param {import("lavalink-client").Track} track
   * @returns
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

      if (message.editable) {
        await message.edit({ components: [] });
      }
    } catch (error) {}
  }
};
