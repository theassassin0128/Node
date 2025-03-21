const { Base } = require("./Base.js");

/**
 * Represents a discord guild (or a server) on Database.
 * @extends {Base}
 */
class Guild extends Base {
  constructor(manager, data) {
    super(manager);

    // this._patch(data);

    /**
     * The id of the guild
     * @type {string}
     * @readonly
     */
    this.id = data.id;

    /**
     * The name of the guild
     * @type {string}
     * @readonly
     */
    this.name = data.name;

    /**
     * The language of the guild
     * @type {string}
     * @readonly
     */
    this.locale = data.locale;

    /**
     * The guild owner id
     * @type {string}
     * @readonly
     */
    this.ownerId = data.ownerId;

    /**
     * The time the guild schema was created
     * @type {Date}
     * @readonly
     */
    this.createdAt = data.createdAt;

    /**
     * The time the the client user joined the guild
     * @type {Date}
     * @readonly
     */
    this.joinedAt = data.joinedAt;

    /**
     * The time the client user left the server
     * @type {Date}
     * @readonly
     */
    this.leftAt = data.leftAt;

    if ("level" in data) {
      const level = {
        enabled: false,
        message: "",
        channel: "",
        rewards: []
      };

      if ("enabled" in data.level) {
        level.enabled = data.level.enabled ??= false;
      }

      if ("message" in data.level) {
        level.message = data.level.message ??= config.level.defaultMessage;
      }

      if ("channelId" in data.level) {
        level.channel = data.level.channel ??= null;
      }

      if ("rewards" in data.level) {
        for (const r of data.level.rewards) level.rewards.push(r);
      }

      /**
       * The reward object for level reward array
       * @typedef {object} RewardObject
       * @property {number} Level
       * @property {string} role
       */

      /**
       * the object for guild level config data
       * @typedef {object} LevelObject
       * @property {boolean} enabled
       * @property {string} message
       * @property {string} channel
       * @property {RewardObject[]} rewards
       */

      /**
       * The level up system config for the guild
       * @type {LevelObject}
       * @readonly
       */
      this.level = level;
    }
  }
}

module.exports = { Guild };
