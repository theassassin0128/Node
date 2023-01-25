const {
	SlashCommandBuilder,
	EmbedBuilder,
	Client,
	ChatInputCommandInteraction,
} = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roles")
		.setDescription("Returns embed(s) with server roles."),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const roles = interaction.guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((r) => r);
		const size = roles.toString().length;
		if (size > 5750)
			return interaction.reply({
				content: "Too many roles to display.",
				ephemeral: true,
			});

		const rEmbed = new EmbedBuilder()
			.setTitle("ALL ROLES OF THIS SERVER")
			.setColor(colour.main)
			.setDescription(`${roles.join("\n").replace("@everyone", " ")}`);

		const rEmbed1 = new EmbedBuilder()
			.setTitle("ALL SERVER ROLES")
			.setColor(colour.main);

		const rEmbed2 = new EmbedBuilder()
			.setTitle("ALL SERVER ROLES")
			.setColor(colour.main);

		const rEmbed3 = new EmbedBuilder()
			.setTitle("ALL SERVER ROLES")
			.setColor(colour.main);

		const rEmbed4 = new EmbedBuilder()
			.setTitle("ALL SERVER ROLES")
			.setColor(colour.main);

		interaction.reply({
			embeds: [rEmbed],
		});
	},
};
