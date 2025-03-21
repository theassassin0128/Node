/**
 * A function to handle AutoComplete Commands
 * @param {import("@lib/Bot").Bot} client
 * @param {import("discord.js").AutocompleteInteraction} interaction
 * @returns {Promise<void>}
 */
async function handleAutocomplete(client, interaction) {
  try {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    if (!command.autocomplete) return;

    await command.autocomplete(client, interaction);
  } catch (error) {
    client.logger.error(error);
    client.utils.errors.send(error);
  }
}

module.exports = { handleAutocomplete };
