const { ActivityType, Client, Guild } = require("discord.js");

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
        name: `Over ${client.guilds.cache.size} servers.`,
        type: ActivityType.Watching,
      },
      {
        name: `With ${(await getMemberCount(client)).count} Users.`,
        type: ActivityType.Playing,
      },
      {
        name: "/help.",
        type: ActivityType.Listening,
      },
    ];
    let i = 0;

    setInterval(() => {
      client.user.setActivity(activities[i]);
      i++;
      if (i >= activities.length) i = 0;
    }, 10 * 60 * 1000);

    client.user.setStatus("online");
  },
};

async function getMemberCount(client) {
  let memberCount = 0;

  client.guilds.cache.forEach((guild) => {
    memberCount += guild.memberCount;
  });

  return { count: memberCount };
}
