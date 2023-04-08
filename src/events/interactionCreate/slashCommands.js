const { ChatInputCommandInteraction, Client } = require("discord.js");
const { devs } = require("../../config.json");
const testServer = process.env["GUILD_TEST"];

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {Client} client
   * @param {ChatInputCommandInteraction} interaction
   * @returns
   */
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    try {
      const command = await client.commands.get(interaction.commandName);

      if (!command) {
        interaction.reply({
          content: "This command isn't available.",
          ephemeral: true,
        });
        return;
      }

      if (command.devOnly) {
        if (!devs.includes(interaction.member.id)) {
          interaction.reply({
            content: "Only developers are allowed to run this command.",
            ephemeral: true,
          });
          return;
        }
      }

      if (command.testOnly) {
        if (!(interaction.guild.id === testServer)) {
          interaction.reply({
            content: "This command cannot be ran here.",
            ephemeral: true,
          });
          return;
        }
      }

      if (command.permissionsRequired?.length) {
        for (const permission of command.permissionsRequired) {
          if (!interaction.member.permissions.has(permission)) {
            interaction.reply({
              content: `You do not have enough permissions to use this command.`,
              ephemeral: true,
            });
            return;
          }
        }
      }
      if (command.botPermissions?.length) {
        const bot = interaction.guild.members.me;

        for (const permission of command.botPermissions) {
          if (!bot.permissions.has(permission)) {
            interaction.reply({
              content: `I do not have enough permissions to execute this command.`,
              ephemeral: true,
            });
            return;
          }
        }
      }

      await command.execute(interaction, client);
    } catch (error) {
      interaction.reply({
        content: `An error occured.\n${error}`,
      });
      return;
    }
  },
};
