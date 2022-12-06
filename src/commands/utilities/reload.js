const {
	Client,
	ChatInputCommandInteraction,
	SlashCommandBuilder,
} = require("discord.js");

const { loadEvents } = require("../../functions/handlers/events.js");
const { loadCommands } = require("../../functions/handlers/commands.js");

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName("reload")
		.setDescription("Relaod Commands & Events")
		.addSubcommand((options) =>
			options.setName("events").setDescription("Relaod Event files.")
		)
		.addSubcommand((options) =>
			options.setName("commands").setDescription("Relaod command files.")
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const subCommand = interaction.options.getSubcommand();

		switch (subCommand) {
			case "events":
				{
					for (const [key, value] of client.events)
						client.removeListener(`${key}`, value, true);
					loadEvents(client);
					interaction.reply({
						content: "Reloaded Events.",
						ephemeral: true,
					});
				}
				break;
			case "commands":
				{
					loadCommands(client);
					interaction.reply({
						content: "Reloaded Commands.",
						ephemeral: true,
					});
				}
				break;
		}
	},
};
