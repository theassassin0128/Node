const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
		if (!interaction.isButton()) return;

		try {
			const { customId } = interaction;
			const splitArray = customId.split("-");
			const id = splitArray[1];
			const button = await client.buttons.get(splitArray[0]);

			if (!button)
				return interaction.reply({
					content: "This button doesn't exist.",
					ephemeral: true,
				});

			button.execute(interaction, client, id);
		} catch (error) {
			interaction.reply({
				content: `An error occurred.\n${error}`,
				ephemeral: true,
			});
		}
	},
};
