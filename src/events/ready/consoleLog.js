const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { DATABASE_URL } = process.env;

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} client
   */
  execute: async (client) => {
    console.log("\n\x1b[36m%s\x1b[0m", `Ready! Logged in as ${client.user.tag}`);

    if (!DATABASE_URL) return;
    try {
      mongoose.connect(DATABASE_URL, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("DATABASE connected.");
    } catch (error) {
      console.error(`Error Occured:\n${error}`);
    }
  },
};
