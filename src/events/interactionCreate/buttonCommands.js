const { ButtonInteraction, Client } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ButtonInteraction} interaction
   * @param {Client} client
   * @returns
   */
  async execute(interaction, client) {
    if (!interaction.isButton()) return;

    try {
      const { customId } = interaction;
      const splitArray = customId.split("-");
      const id = splitArray[1];
      const button = await client.buttons.get(splitArray[0]);

      if (!button) {
        interaction.reply({
          content: "This button doesn't exist.",
          ephemeral: true,
        });
        return;
      }

      if (button.devOnly) {
        if (!devs.includes(interaction.member.id)) {
          interaction.reply({
            content: "Only developers are allowed to run this command.",
            ephemeral: true,
          });
          return;
        }
      }

      if (button.testOnly) {
        if (!(interaction.guild.id === testServer)) {
          interaction.reply({
            content: "This command cannot be ran here.",
            ephemeral: true,
          });
          return;
        }
      }

      if (button.permissionsRequired?.length) {
        for (const permission of button.permissionsRequired) {
          if (!interaction.member.permissions.has(permission)) {
            interaction.reply({
              content: `You do not have enough permissions to use this command.`,
              ephemeral: true,
            });
            return;
          }
        }
      }
      if (button.botPermissions?.length) {
        const bot = interaction.guild.members.me;

        for (const permission of button.botPermissions) {
          if (!bot.permissions.has(permission)) {
            interaction.reply({
              content: `I do not have enough permissions to execute this command.`,
              ephemeral: true,
            });
            return;
          }
        }
      }

      button.execute(interaction, client, id);
    } catch (error) {
      interaction.reply({
        content: `An error occurred.\n${error}`,
        ephemeral: true,
      });
    }
  },
};
