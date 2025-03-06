const { User, GuildMember } = require("discord.js");
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
      emitNewSongsOnly: true,
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
}

/**
 * A function to transform a requester into a standardized requester object
 * @param {User|GuildMember|any} requester The requester to transform.
 * Can be a string, a user, or an object with the keys `id`, `username`, and `avatarURL`.
 * @returns {import("@types/index").Requester} The transformed requester object.
 */
function requesterTransformer(requester) {
  if (requester instanceof User) {
    console.log("❗ Done");
    return {
      id: requester.id,
      username: requester.username,
      avatarURL: requester.avatarURL({ extension: "png" }),
      discriminator: requester.discriminator
    };
  }

  if (requester instanceof GuildMember) {
    console.log("📍 Done");
    return {
      id: requester.id,
      username: requester.user.username,
      avatarURL: requester.displayAvatarURL({ extension: "png" }),
      discriminator: requester.user.discriminator
    };
  }

  if (
    typeof requester === "object" &&
    "avatarURL" in requester &&
    Object.keys(requester).length === 4
  ) {
    return requester;
  }

  return { id: requester.toString(), username: "unknown" };
}

/**
 * A function to add new songs to an empty queue if autoplay feature is enabled
 * @param {import("lavalink-client").Player} player The player instance.
 * @param {import("lavalink-client").Track} lastTrack The last played track.
 * @returns {Promise<void>} A promise that resolves when the function is done.
 */
async function autoPlayFunction(player, lastTrack) {
  if (!player.get("autoplay")) return;
  if (!lastTrack) return;

  if (lastTrack.info.sourceName === "spotify") {
    const filtered = player.queue.previous
      .filter((v) => v.info.sourceName === "spotify")
      .slice(0, 5);
    const ids = filtered.map(
      (v) =>
        v.info.identifier ||
        v.info.uri.split("/")?.reverse()?.[0] ||
        v.info.uri.split("/")?.reverse()?.[1]
    );

    if (ids.length >= 1) {
      const res = await player
        .search(
          {
            query: `seed_tracks=${ids.join(",")}`,
            source: "spotify"
          },
          lastTrack.requester
        )
        .then((response) => {
          response.tracks = response.tracks.filter(
            (v) => v.info.identifier !== lastTrack.info.identifier
          );

          return response;
        })
        .catch(console.warn);

      if (res && res.tracks.length > 0)
        await player.queue.add(
          res.tracks.slice(0, 10).map((track) => {
            track.pluginInfo.clientData = {
              ...(track.pluginInfo.clientData || {}),
              fromAutoplay: true
            };
            return track;
          })
        );
    }

    return;
  }

  if (lastTrack.info.sourceName === ("youtube" || "youtubemusic")) {
    const res = await player.search(
      {
        query: `https://www.youtube.com/watch?v=${lastTrack.info.identifier}&list=RD${lastTrack.info.identifier}`,
        source: "youtube"
      },
      lastTrack.requester
    );
    res.tracks = res.tracks.filter(
      (t) => t.info.identifier !== lastTrack.info.identifier
    );

    if (res && res.tracks.length > 0)
      await player.queue.add(
        res.tracks.slice(0, 10).map((track) => {
          (track.requester = lastTrack.requester),
            (track.pluginInfo.clientData = {
              ...(track.pluginInfo.clientData || {}),
              fromAutoplay: true
            });

          return track;
        })
      );

    return;
  }

  if (lastTrack.info.sourceName === "jiosaavn") {
    const res = await player.search(
      { query: `jsrec:${lastTrack.info.identifier}`, source: "jsrec" },
      lastTrack.requester
    );

    if (res.tracks.length > 0) {
      const track = res.tracks.filter(
        (v) => v.info.identifier !== lastTrack.info.identifier
      )[0];
      await player.queue.add(track);
    }
  }

  return;
}

module.exports = { Lavalink };
