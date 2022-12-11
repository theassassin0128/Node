const {
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
	StringSelectMenuBuilder,
	StringSelectMenuOptionBuilder,
	ActionRowBuilder,
} = require("discord.js");
const { url } = require("../../config.json");
module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName("reaction-role")
		.setDescription("Returns a select menu"),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId("reaction-role")
			.setMinValues(1)
			.setMaxValues(1)
			.setOptions(
				new StringSelectMenuOptionBuilder({
					label: "admin",
					value: "gives you admin role",
				}),
				new StringSelectMenuOptionBuilder({
					label: "moderator",
					value: "gives you moderator role",
				})
			);

		const AR = new ActionRowBuilder().addComponents(selectMenu);

		interaction.reply({
			content: "Give Yourself a role by Selecting a role.",
			components: [AR],
		});
	},
};
