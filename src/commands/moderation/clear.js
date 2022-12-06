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
		.addUserOption((option) =>
			option.setName("member").setDescription("Pick a guild member.")
		)
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const { user, options } = interaction;

		const amount = options.getInteger("amount");
		const mUser = options.getUser("member");

		if (100 < amount < 0) {
			return interaction.reply(
				"Please, enter a valid amount between **1-100**"
			);
		}

		if (mUser) {
			const msg = await await interaction.channel.messages.fetch();
			let i = [];
			const uMsg = await msg.filter((m) => m.author.id === mUser.id);
			i.push(uMsg);
			const dMsg = await interaction.channel.bulkDelete(uMsg, true);

			interaction.reply({
				content: `Deleted ${dMsg.size} of ${mUser}.`,
			});
		} else {
			const dMsg = await interaction.channel.bulkDelete(amount, true);
			interaction.reply({
				content: `Successfully deleted ${dMsg.size} messages.`,
				ephemeral: true,
			});
		}
	},
};
