const mongoose = require("mongoose");
const chalk = require("chalk");
const models = require("./models/index");

class DataBase {
  /**
   * Base Client to use in this class
   * @param {import("@lib/Bot.js").Bot} client
   */
  constructor(client) {
    this.client = client;

    // database clases with methods
    this.guilds = new models.Guilds(client);
    this.users = new models.Users(client);
  }

  /**
   * A function to connect to mongodb through mongoose
   * @returns {Promise<void>}
   */
  async connect(client) {
    try {
      await mongoose.connect(client.config.mongodbUri);
      this.client.logger.info(
        `${chalk.magentaBright("Mongodb")} database connected`
      );
    } catch (error) {
      this.client.logger.error(error);
    }
  }

  /**
   * A function to disconnect from mongodb
   * @returns {Promise<void>}
   */
  async disconnect() {
    try {
      await mongoose.disconnect();
      this.client.logger.info(
        `${chalk.magentaBright("Mongodb")} database disconnected`
      );
    } catch (error) {
      this.client.logger.error(error);
    }
  }
}

module.exports = { DataBase };
