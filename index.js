require("dotenv").config();
const { DISCORD_TOKEN } = process.env;
const { client } = require("./src/bot.js");

try {
  client.login(DISCORD_TOKEN);
} catch (error) {
  console.error(error);
}
