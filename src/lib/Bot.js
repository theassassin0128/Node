const { Client, Collection } = require("discord.js");
const { Logger } = require("./Logger.js");
const { Utils } = require("@src/utils");
const { MusicManager } = require("./Lavalink.js");
const { DatabaseManager } = require("@db/Manager.js");
const { Handlers } = require("@src/handlers");
const { Helpers } = require("@src/helpers");

class Bot extends Client {
  /**
   * Types for discord.js ClientOptions
   * @param {import("discord.js").ClientOptions} options - The options for the client
   */
  constructor(options) {
    super(options);

    /**
     * The base configuration file for the bot
     * @type {import("@src/config.js")}
     */
    this.config = require("@src/config.js");

    /**
     * The package.json file
     * @type {import("@package.json")}
     */
    this.pkg = require("@root/package.json");

    /**
     * The database manager for the bot
     * @type {DatabaseManager}
     */
    this.db = new DatabaseManager(this);

    /**
     * The log manager for the bot
     * @type {Logger}
     */
    this.logger = new Logger();
    this.utils = new Utils(this);
    this.helpers = new Helpers(this);
    this.handlers = new Handlers(this);

    /** @type {Collection<string, import("@types/index").CommandStructure>} */
    this.commands = new Collection();

    /** @type {Collection<string, Collection<string, string>>} */
    this.cooldowns = new Collection();

    // Initialize Music Manager if enabled
    if (this.config.music.enabled) {
      /**
       * The lavalink manager for the bot
       * @type {MusicManager}
       */
      this.lavalink = new MusicManager(this);
    }
  }
}

module.exports = { Bot };
