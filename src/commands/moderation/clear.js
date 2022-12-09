const {
	SlashCommandBuilder,
	Client,
	PermissionFlagsBits,
	ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName("clear")
		.setDescription("Delete a certain amount of messages.")
		.addIntegerOption((option) =>
			option
				.setName("amount")
				.setDescription("Number of messages to delete.")
				.setRequired(true)
		)
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const { options } = interaction;

		const amount = options.getInteger("amount");

		if (100 < amount < 0) {
			return interaction.reply(
				"Please, enter a valid amount between **1-100**"
			);
		}

		const dMsg = await interaction.channel.bulkDelete(amount, true);

		if (dMsg.size <= 0) {
			interaction.reply({
				content: `Couldn't delete any message.`,
				ephemeral: true,
			});
		} else {
			interaction.reply({
				content: `Successfully deleted ${dMsg.size} messages.`,
				ephemeral: true,
			});
		}
	},
};
