/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "interactionCreate",
	/**
	 * types for base commmand interaction
	 * @param {import("discord.js").BaseInteraction} interaction
	 */
	execute: async (client, interaction) => {
		// For handling slash commands
		if (interaction.isChatInputCommand()) {
			await client.handlers.handleCommands(client, interaction);
		}

		// For handling auto complete interactions
		if (interaction.isAutocomplete()) {
			try {
				const command = client.commands.get(interaction.commandName);

				if (!command) return;
				if (!command.autocomplete) return;

				await command.autocomplete(client, interaction);
			} catch (error) {
				client.logger.error(error);
			}
		}

		// For handling contextmenu commands
		if (interaction.isContextMenuCommand()) {
			await client.handlers.handleContext(client, interaction);
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
	},
};
