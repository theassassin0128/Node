const { EmbedBuilder } = require("discord.js");

/**
 * A function to send errors to discord
 * @param {import("@lib/Bot").Bot} client
 * @param {Error} error
 * @returns {Promise<void>}
 */
async function sendError(client, error) {
  if (!error) return;
  if (!client.config.logChannel) return;

  /** @type {import("discord.js").GuildTextBasedChannel} */
  const channel = await client.channels.fetch(client.config.logChannel);
  if (!channel) return;
  if (!channel.send) return;

  const errStack = error?.stack ? error.stack : error;
  const embed = new EmbedBuilder()
    .setColor(client.config.colors.Wrong)
    .setTitle("AN ERROR OCCURRED")
    .setDescription(
      `\`\`\`js\n${errStack.length > 4000 ? errStack.substring(0, 4000) + "..." : errStack}\n\`\`\``
    )
    .setFooter({
      text: `Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB CPU: ${(
        process.cpuUsage().system /
        1024 /
        1024
      ).toFixed(2)}%`
    })
    .setTimestamp();

  channel.send({ embeds: [embed] }).catch(client.logger.error);
}

module.exports = sendError;
