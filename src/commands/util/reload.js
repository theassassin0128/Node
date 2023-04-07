const { SlashCommandBuilder } = require("discord.js");
const { loadCommands } = require("../../functions/handlers/commands.js");
const { loadEvents } = require("../../functions/handlers/events.js");
const { loadButtons } = require("../../functions/handlers/buttons.js");
const { owner } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("realod certain files.")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("Files to reload")
        .setRequired(true)
        .addChoices(
          { name: "Command", value: "c" },
          { name: "Event", value: "e" },
          { name: "Button", value: "b" }
        )
    ),
  execute: async (interaction, client) => {
    const string = interaction.options.getString("type");

    if (!interaction.user.id === owner.id)
      return interaction.reply({
        content:
          " Sorry, You are not the owner of this application. So, you can't use this command",
        ephemeral: true,
      });

    switch (string) {
      case "c":
        {
          await loadCommands(client);
          interaction.reply({
            content: "Realoaded Command Files.",
            ephemeral: true,
          });
        }
        break;
      case "e":
        {
          for (const [key, value] of client.events)
            client.removeListener(`${key}`, value, true);
          await loadEvents(client);
          interaction.reply({
            content: "Reloaded Event Files",
            ephemeral: true,
          });
        }
        break;
      case "b":
        {
          await loadButtons(client);
          interaction.reply({
            content: "Realoaded Button Files.",
            ephemeral: true,
          });
        }
        break;
      default:
        break;
    }
  },
};
