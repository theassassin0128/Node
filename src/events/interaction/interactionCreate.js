/** @type {import("@types/index").EventStructure} */
module.exports = {
  name: "interactionCreate",
  /**
   * types for base commmand interaction
   * @param {import("discord.js").BaseInteraction} interaction
   */
  async execute(client, interaction) {
    // For handling slash commands
    if (interaction.isChatInputCommand()) {
      await client.handlers.handleCommands(interaction);
    }

    // For handling auto complete interactions
    else if (interaction.isAutocomplete()) {
      await client.handlers.handleAutocomplete(interaction);
    }

    // For handling contextmenu commands
    else if (interaction.isContextMenuCommand()) {
      await client.handlers.handleContext(interaction);
    }

    // Buttons
    // else if (interaction.isButton()) {
    // 	switch (interaction.customId) {
    // 		case "TICKET_CREATE":
    // 			return ticketHandler.handleTicketOpen(interaction);
    //
    // 		case "TICKET_CLOSE":
    // 			return ticketHandler.handleTicketClose(interaction);
    //
    // 		case "SUGGEST_APPROVE":
    // 			return suggestionHandler.handleApproveBtn(interaction);
    //
    // 		case "SUGGEST_REJECT":
    // 			return suggestionHandler.handleRejectBtn(interaction);
    //
    // 		case "SUGGEST_DELETE":
    // 			return suggestionHandler.handleDeleteBtn(interaction);
    // 	}
    // }

    // Modals
    // else if (interaction.type === InteractionType.ModalSubmit) {
    // 	switch (interaction.customId) {
    // 		case "SUGGEST_APPROVE_MODAL":
    // 			return suggestionHandler.handleApproveModal(interaction);
    //
    // 		case "SUGGEST_REJECT_MODAL":
    // 			return suggestionHandler.handleRejectModal(interaction);
    //
    // 		case "SUGGEST_DELETE_MODAL":
    // 			return suggestionHandler.handleDeleteModal(interaction);
    // 	}
    // }
  }
};
