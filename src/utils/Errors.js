const { EmbedBuilder } = require("discord.js");

class Errors {
  constructor(client) {
    /**
     * @type {import("@lib/Bot.js").Bot}
     */
    this.client = client;
  }

  /**
   * A function to send errors to discord
   * @param {Error} error
   * @returns {Promise<void>}
   */
  async send(error) {
    if (!error) return;
    if (!this.client.config.logChannel) return;

    /** @type {import("discord.js").GuildTextBasedChannel} */
    const channel = await this.client.channels.fetch(
      this.client.config.logChannel
    );
    if (!channel) return;
    if (!channel.send) return;

    const embed = new EmbedBuilder()
      .setColor(this.client.config.colors.Wrong)
      .setFooter({
        text: `Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
          2
        )} MB CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`
      });

    if (error instanceof Error && error.stack) {
      const [name, ...rest] = error.stack.split("\n");
      const stack = rest.map((l) => l.replace(/^/, "\n")).join("");

      embed.setFields([
        {
          name: "Error",
          value: `\`\`\`\n${name}\n\`\`\``
        },
        {
          name: "Stack",
          value: `\`\`\`bash\n${
            stack.length > 1024 ? stack.substring(0, 1021) + "..." : stack
          }\n\`\`\``
        }
      ]);
    } else {
      embed.setDescription(
        error.length > 4000 ? error.substring(0, 3997) + "..." : error
      );
    }

    channel.send({ embeds: [embed] }).catch(this.client.logger.error);
  }
}

module.exports = { Errors };
