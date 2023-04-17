const {
  ChatInputCommandInteraction,
  Client,
  PermissionFlagsBits,
} = require("discord.js");
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
    if (!interaction.isAutocomplete()) return;

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
            content: `You need \`${permission}\` permission to use this command.`,
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
            content: `I need \`${permission}\` permission to execute this command.`,
            ephemeral: true,
          });
          return;
        }
      }
    }

    try {
      await command.autocomplete(interaction, client);
    } catch (error) {
      interaction.reply({
        content: `An error occured.\n${error}`,
      });
      return;
    }
  },
};
