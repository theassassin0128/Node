const mongoose = require("mongoose");
const chalk = require("chalk");
const { MongoClient } = require("mongodb");
const { GuildManager } = require("./managers/GuildManager.js");
const { Users } = require("./models/users.js");
const { cacheWithLimits } = require("./utils/cacheWithLimits.js");

class DatabaseManager extends MongoClient {
  /**
   * Base Client to use in this class
   * @param {import("@lib/Bot.js").Bot} client
   */
  constructor(client) {
    super(client.config.mongodbUri, client.config.mongodbOptions);

    /**
     * The Base Client
     * @type {import("@lib/Bot.js").Bot}
     */
    this.client = client;

    /**
     * A function to create a cache factory
     * @returns {import("./utils/cacheWithLimits.js").CacheFactory}
     */
    this.makeCache = cacheWithLimits(client.config.mongodb);

    /**
     * A manager to manage guild data in databse
     * @type {GuildManager}
     */
    this.guilds = new GuildManager(this);

    // database clases with methods
    this.users = new Users(client);
  }

  /**
   * A function to connect to mongodb through mongoose
   * @returns {Promise<void>}
   */
  async connect() {
    try {
      await super.connect();
      await mongoose.connect(this.client.config.mongodbUri);
      this.client.logger.success(
        `${chalk.magenta("MongoDB")} database connected`
      );
    } catch (error) {
      this.client.logger.error(
        `Failed to connect to ${chalk.magenta("MongoDB")}: ${error}`
      );
      process.exit(1);
    }
  }

  /**
   * A function to disconnect from mongodb
   * @returns {Promise<void>}
   */
  async disconnect() {
    try {
      await super.close();
      await mongoose.disconnect();
      this.client.logger.info(
        `${chalk.magenta("MongoDB")} database disconnected`
      );
    } catch (error) {
      this.client.logger.error(
        `Failed to disconnect from ${chalk.magenta("MongoDB")}: ${error}`
      );
    }
  }
}

module.exports = { DatabaseManager };
