module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;

		try {
			const command = await client.commands.get(interaction.commandName);

			if (!command)
				return interaction.reply({
					content: "This command isn't available.",
					ephemeral: true,
				});

			command.execute(interaction, client);
		} catch (error) {
			return interaction.reply({
				content: `An error occured.\n${error}`,
			});
		}
	},
};
