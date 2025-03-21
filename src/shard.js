require("dotenv").config(); // Load environment variables from .env file
require("module-alias/register"); // Register module aliases

const { ShardingManager } = require("discord.js");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();
const chalk = require("chalk");

async function shardStart() {
  const manager = new ShardingManager("./src/index.js", {
    respawn: true,
    token: process.env.DISCORD_CLIENT_TOKEN,
    totalShards: "auto",
    shardList: "auto"
  });

  manager.on("shardCreate", (shard) => {
    shard.on("ready", () => {
      logger.info(
        `Shard ${chalk.cyan(shard.id)} connected to Discord's Gateway.`
      );
    });

    shard.on("disconnect", () => {
      logger.info(
        `Shard ${chalk.cyan(shard.id)} disconnected from Discord's Gateway.`
      );
    });

    shard.on("error", logger.error);
  });

  await manager.spawn();
  logger.info(`${chalk.blueBright(manager.totalShards)} shard(s) spawned.`);
}

shardStart().catch(logger.error);
