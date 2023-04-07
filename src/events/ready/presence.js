const { ActivityType, Client } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  execute: async (client) => {
    const activities = [
      {
        name: "Slash Commands",
        type: ActivityType.Listening,
      },
      {
        name: `over ${client.guilds.cache.size} servers.`,
        type: ActivityType.Watching,
      },
      {
        name: "Call of Duty: Mobile",
        type: ActivityType.Playing,
      },
      {
        name: "/help.",
        type: ActivityType.Listening,
      },
    ];

    setInterval(() => {
      let random = Math.floor(Math.random() * activities.length);
      client.user.setActivity(activities[random]);
    }, 5 * 60 * 1000);

    client.user.setStatus("online");
  },
};
