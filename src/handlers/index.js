const {
  ChatInputCommandInteraction,
  ContextMenuCommandInteraction,
  AutocompleteInteraction
} = require("discord.js");
const { handleCommands } = require("./commands.js");
const { handleContext } = require("./context.js");
const { handleAutocomplete } = require("./autocomplete.js");

class Handlers {
  /**
   * Base Client to use in this class
   * @param {import("@lib/Bot").Bot} client
   */
  constructor(client) {
    // Base Client as a property of this class
    this.client = client;

    this.handlePlayerButtons = require("./playerButtons.js");
  }

  /**
   * A function to handle slash commands
   * @param {ChatInputCommandInteraction} interaction
   * @returns {Promise<void>}
   */
  async handleCommands(interaction) {
    await handleCommands(this.client, interaction);
  }

  /**
   * A function to handle contextmenu commands
   * @param {ContextMenuCommandInteraction} interaction
   * @returns {Promise<void>}
   */
  async handleContext(interaction) {
    await handleContext(this.client, interaction);
  }

  /**
   * A function to handle AutoComplete Commands
   * @param {AutocompleteInteraction} interaction
   * @returns {Promise<void>}
   */
  async handleAutocomplete(interaction) {
    await handleAutocomplete(this.client, interaction);
  }
}

module.exports = { Handlers };
