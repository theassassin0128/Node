const { LavalinkManager } = require("lavalink-client");

class Lavalink extends LavalinkManager {
  /**
   * Base client to init LavalinkManager with custome methods
   * @param {import("@lib/Bot").Bot} client
   */
  constructor(client) {
    super({
      nodes: client.config.music.lavalinkNodes,
      sendToShard: (guildId, payload) => {
        client.guilds.cache.get(guildId)?.shard?.send(payload);
      },
      autoSkip: true,
      playerOptions: {
        maxErrorsPerTime: {
          threshold: 35000,
          maxAmount: 3
        },
        minAutoPlayMs: 5000,
        applyVolumeAsFilter: false,
        clientBasedPositionUpdateInterval: 50,
        defaultSearchPlatform: client.config.music.defaultSearchPlatform,
        requesterTransformer: client.utils.requesterTransformer,
        onDisconnect: {
          autoReconnect: true,
          destroyPlayer: false
        },
        onEmptyQueue: {
          destroyAfterMs: client.config.music.idleTime,
          autoPlayFunction: client.utils.autoPlayFunction
        },
        useUnresolvedData: true
      },
      queueOptions: {
        maxPreviousTracks: 25
      },
      linksAllowed: true
    });

    // base client as a property of this class
    this.client = client;
  }

  /**
   * Searches for a song and returns the tracks.
   * @param {string} query The query to search for.
   * @param {User} user The user who requested the search.
   * @param  {import("lavalink-client").SearchPlatform} [source] The platform to search in. Defaults to youtube.
   * @returns {Promise<import("lavalink-client").SearchResult>} An array of tracks that match the query.
   */
  async search(query, user, source) {
    const nodes = this.nodeManager.leastUsedNodes();
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    const result = await node.search({ query, source }, user, false);
    return result;
  }
}

module.exports = { Lavalink };
