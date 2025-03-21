const { Collection } = require("discord.js");
const { Guild } = require("../structures/Guild.js");
const { CachedManager } = require("./CachedManager.js");

/**
 * Manages Database methods for Guilds and stores their cache.
 * @extends {CachedManager}
 */
class GuildManager extends CachedManager {
  constructor(manager, iterable) {
    super(manager, Guild, iterable);

    /**
     * The cache of this Manager
     * @type {Collection<string, Guild>}
     * @name GuildManager#cache
     */
    this.cache;
  }

  /**
   * * A getter function to get the collection that represents this manager
   * @returns {import("mongodb").Collection}
   * @private
   * @readonly
   */
  get collection() {
    return this.manager.db().collection("Guild");
  }

  /**
   * A function to get stored guild data from database
   * @param {string} id - id of guild to get
   * @returns {Promise<Guild>}
   */
  async get(id) {
    if (!id || typeof id !== "string") {
      throw new Error(`parameter id is missing`);
    }

    const existing = this.cache.get(id);
    console.log(this.cache);
    if (existing) return existing;

    const guild = this.client.guilds.cache.get(id);
    if (!guild) return;

    var data = await this.collection.findOne({ _id: guild.id });
    if (data) return this._add(data, true);

    const userDB = await this.client.db.users.get(guild.ownerId);
    await userDB.save();

    data = {
      _id: guild.id,
      name: guild.name,
      ownerId: guild.ownerId,
      joinedAt: guild.joinedAt,
      language: this.client.config.defaultLanguage
    };

    await this.collection.insertOne(data);
    return this._add(data, true);

    // {
    //   let change = false;
    //   if (data.name !== guild.name) {
    //     data.name = guild.name;
    //     change = true;
    //   }
    //
    //   if (data.ownerId !== guild.ownerId) {
    //     data.ownerId = guild.ownerId;
    //     change = false;
    //   }
    //
    //   if (change) {
    //     await this.collection.updateOne(
    //       { _id: guild.id },
    //       { $push: data },
    //       { upsert: true }
    //     );
    //   }
    // }
  }

  /**
   * Options used to fetch a single guild.
   * @typedef {BaseFetchOptions} FetchGuildOptions
   * @property {GuildResolvable} guild The guild to fetch
   * @property {boolean} [withCounts=true] Whether the approximate member and presence counts should be returned
   */

  /**
   * Options used to fetch multiple guilds.
   * @typedef {Object} FetchGuildsOptions
   * @property {string} [before] Get guilds before this guild id
   * @property {string} [after] Get guilds after this guild id
   * @property {number} [limit] Maximum number of guilds to request (1-200)
   */

  /**
   * Obtains one or multiple guilds from Discord, or the guild cache if it's already available.
   * @param {GuildResolvable|FetchGuildOptions|FetchGuildsOptions} [options] The guild's id or options
   * @returns {Promise<Guild|Collection<string, Guild>>}
   */
  async fetch(options = {}) {
    const id = this.resolveId(options) ?? this.resolveId(options.guild);

    if (id) {
      if (!options.force) {
        const existing = this.cache.get(id);
        if (existing) return existing;
      }

      const data = await this.collection.findOne({ _id: id });
      return this._add(data, options.cache);
    }

    //** @type {Array} */
    const data = await this.collection.find();
    return data.reduce(
      (coll, guild) => coll.set(guild._id, new Guild(this.manager, guild)),
      new Collection()
    );
  }

  /**
   * A function to update the database
   * @param {string} _id
   * @param {string} key
   * @param {string|object|Array|number|boolean|any} value
   * @returns {import("mongodb").UpdateResult}
   */
  async update(_id, key, value) {
    const update = { $set: { [key]: value } };
    const result = await this.collection.updateOne({ _id }, update, {
      upsert: true
    });
    return result;
  }
}

module.exports = { GuildManager };
