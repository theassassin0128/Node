/** @type {import("@types/index").EventStructure} */
module.exports = {
  name: "playerDestroy",
  player: true,
  /**
   * @param {import("lavalink-client").Player} player
   * @param {string} reason
   */
  execute: async (client, player, reason) => {
    try {
      const guild = this.client.guilds.cache.get(player.guildId);
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
