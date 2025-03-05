const { Client, Collection } = require("discord.js");
const { Logger } = require("./Logger.js");
const { Utils } = require("@src/utils");
const { Lavalink } = require("./Lavalink.js");
const { DataBase } = require("@src/database");

class Bot extends Client {
  /**
   * Types for discord.js ClientOptions
   * @param {import("discord.js").ClientOptions} options - The options for the client
   */
  constructor(options) {
    super(options);

    // Load configuration and package information
    this.config = require("@src/config.js");
    this.pkg = require("@root/package.json");

    // Initialize the database
    this.db = new DataBase(this);

    // Initialize global functions and utilities
    this.logger = new Logger();
    this.utils = new Utils(this);
    this.helpers = require("@src/helpers");
    this.handlers = require("@src/handlers");

    /** @type {Collection<string, import("@types/index").CommandStructure>} */
    this.commands = new Collection();

    /** @type {Collection<string, Collection<string, string>>} */
    this.cooldowns = new Collection();

    // Initialize Music Manager if enabled
    if (this.config.music.enabled) this.lavalink = new Lavalink(this);
  }
}

module.exports = { Bot };
