const {
	EmbedBuilder,
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
} = require("discord.js");
const { colour } = require("../../config.json");
const moment = require("moment");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("roleinfo")
		.setDescription("Replies an embed containing role information")
		.setDMPermission(false)
		.addRoleOption((options) =>
			options.setName("role").setDescription("The role").setRequired(true)
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const role = (await interaction.guild.roles.fetch()).get(
			interaction.options.getRole("role").id
		);
		const rEmbed = new EmbedBuilder()
			.setTitle("Role Information")
			.setColor(role.hexColor)
			.setThumbnail(role.icon ? role.iconURL : null)
			.addFields(
				{
					name: "Name",
					value: `${role.name}`,
				},
				{
					name: "ID",
					value: `${role.id}`,
				},
				{
					name: "Created On",
					value: `${moment(role.createdAt).format(
						"dddd, MMMM Do YYYY, h:mm:ss A"
					)}\n - ${moment(role.createdAt, "YYYYMMDD").fromNow()}`,
				},
				{
					name: `Members`,
					value: `${role.members.size}`,
				},
				{
					name: `Position (from top)`,
					value: `${
						interaction.guild.roles.cache.size - role.position
					}`,
				},
				{
					name: "Colour Code",
					value: `${role.hexColor}`,
				},
				{
					name: "EXTRA",
					value: [
						`Mentionable : ${role.mentionable}`,
						`Separated : ${role.hoist}`,
						`Integration : ${role.managed}`,
					].join("\n"),
				}
			);

		interaction.reply({
			embeds: [rEmbed],
		});
	},
};
