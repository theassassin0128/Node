const { LavalinkManager } = require("lavalink-client");
const { User, GuildMember } = require("discord.js");

class MusicManager extends LavalinkManager {
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
        requesterTransformer: requesterTransformer,
        onDisconnect: {
          autoReconnect: true,
          destroyPlayer: false
        },
        onEmptyQueue: {
          destroyAfterMs: client.config.music.idleTime,
          autoPlayFunction: autoPlayFunction
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

  /**
   * Returns embed colors for the provided source
   * @param {string} source
   * @returns {string}
   */
  embedColor(source) {
    const colors = {
      youtube: "#FF0000",
      spotify: "#1ED760",
      applemusic: "#FA243C",
      soundcloud: "#FF5500",
      vkmusic: "#0077FF",
      bandcamp: "#408294"
    };

    return colors[source.toLowerCase()] ?? "#36393F";
  }
}

/**
 * For LavalinkPlayer to transform requester object
 * @typedef {Object} Requester
 * @property {string} id
 * @property {string} username
 * @property {string} [discriminator]
 * @property {string} [avatarURL]
 */

/**
 * A function to transform a requester into a standardized requester object
 * @param {User|GuildMember|object} requester The requester to transform.
 * Can be a user, a member or an object with the keys
 * `id`, `username`, `avatarURL` and `discriminator`.
 * @returns {Requester} The transformed requester object.
 */
function requesterTransformer(requester) {
  if (requester instanceof User) {
    return {
      id: requester.id,
      username: requester.username,
      avatarURL: requester.avatarURL({ extension: "png" }),
      discriminator: requester.discriminator
    };
  }

  if (requester instanceof GuildMember) {
    return {
      id: requester.id,
      username: requester.displayName,
      avatarURL: requester.displayAvatarURL({ extension: "png" }),
      discriminator: requester.user.discriminator
    };
  }

  return requester;
}

/**
 * A function to add new songs to an empty queue if autoplay feature is enabled
 * @param {import("lavalink-client").Player} player The player instance.
 * @param {import("lavalink-client").Track} lastTrack The last played track.
 * @returns {Promise<void>}
 */
async function autoPlayFunction(player, lastTrack) {
  if (!player.get("autoplay")) return;
  if (!lastTrack) return;

  if (lastTrack.info.sourceName === "spotify") {
    const filtered = player.queue.previous
      .filter((t) => {
        console.log(t.info.sourceName);
        return t.info.sourceName === "spotify";
      })
      .slice(0, 5);
    console.log(filtered);

    const ids = filtered.map(
      (t) =>
        t.info.identifier ||
        t.info.uri.split("/")?.reverse()?.[0] ||
        t.info.uri.split("/")?.reverse()?.[1]
    );
    console.log(ids);

    if (ids.length >= 1) {
      let response = await player.search(
        {
          query: `seed_tracks=${ids.join(",")}`,
          source: "spotify"
        },
        lastTrack.requester
      );

      response.tracks = response.tracks.filter(
        (t) => t.info.identifier !== lastTrack.info.identifier
      );
      console.log(response.tracks);

      if (response && response.tracks.length > 0) {
        await player.queue.add(response.tracks.slice(0, 5));
      }
    }

    return;
  }

  if (["youtube", "youtubemusic"].includes(lastTrack.info.sourceName)) {
    const response = await player.search(
      {
        query: `https://www.youtube.com/watch?v=${lastTrack.info.identifier}&list=RD${lastTrack.info.identifier}`,
        source: "youtube"
      },
      lastTrack.requester
    );

    response.tracks = response.tracks.filter(
      (t) => t.info.identifier !== lastTrack.info.identifier
    );

    if (response && response.tracks.length > 0) {
      await player.queue.add(response.tracks.slice(0, 5));
    }
  }

  if (lastTrack.info.sourceName === "jiosaavn") {
    const response = await player.search(
      { query: `jsrec:${lastTrack.info.identifier}`, source: "jsrec" },
      lastTrack.requester
    );

    if (response && response.tracks.length > 0) {
      const track = response.tracks.filter(
        (t) => t.info.identifier !== lastTrack.info.identifier
      )[0];
      await player.queue.add(track);
    }
  }
}

module.exports = { MusicManager };
