const {
	EmbedBuilder,
	Client,
	Interaction,
	InteractionType,
} = require("discord.js");
const { image, colour } = require("../../config.json");

module.exports = {
	name: "interactionCreate",
	/**
	 * @param {Interaction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		if (interaction.isChatInputCommand()) {
			try {
				const command = await client.commands.get(
					interaction.commandName
				);

				if (!command)
					return new Error("There is no code for this command");

				command.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					content:
						"There was an error while executing the interaction",
					ephemeral: true,
				});
				console.error(error);
			}
		} else if (interaction.isButton()) {
			try {
				const { customId } = interaction;
				const button = await client.buttons.get(customId);

				if (!button)
					return new Error("There is no code for this button");

				button.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					content:
						"There was an error while executing the interaction",
					ephemeral: true,
				});
				console.error(error);
			}
		} else if (interaction.isAnySelectMenu()) {
			try {
				const { customId } = interaction;
				const selectMenu = await client.selectMenus.get(customId);

				if (!selectMenu)
					return new Error("There is no code for this select Menu");

				selectMenu.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					content:
						"There was an error while executing the interaction",
					ephemeral: true,
				});
				console.error(error);
			}
		} else if (interaction.type == InteractionType.ModalSubmit) {
			try {
				const { customId } = interaction;
				const modal = await client.modals.get(customId);

				if (!modal)
					return new Error("There is no code for this modal.");

				modal.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					content:
						"There was an error while executing the interaction",
					ephemeral: true,
				});
				console.error(error);
			}
		}
	},
};
