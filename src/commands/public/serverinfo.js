const {
	EmbedBuilder,
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
	disabled: true,
	data: new SlashCommandBuilder()
		.setName("serverinfo")
		.setDescription("Replies with server information.")
		.setDMPermission(false),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const { guild } = interaction;
		let Roles = guild.roles.cache;
		let owner = (await guild.members.fetch()).get(guild.ownerId);
		let Channels = await guild.channels.fetch();

		let server = new EmbedBuilder()
			.setTitle(`${interaction.guild.name}`)
			.addFields(
				{
					name: "🆔 ID",
					value: `${guild.id}`,
				},
				{
					name: "📅 Created On",
					value: `${moment(guild.createdAt).format(
						"dddd, MMMM Do YYYY, h:mm:ss A",
					)}\n - ${moment(guild.createdAt, "YYYYMMDD").fromNow()}`,
				},
				{
					name: "👑 Owned by",
					value: `${owner} (${owner.id})`,
				},
				{
					name: `👥 Members [${guild.memberCount}]`,
					value: "More information will be added in future Updates.",
				},
				{
					name: `💬 Channels [${Channels.size}]`,
					value: "More information will be added in the future updates.",
				},
				{
					name: `🔐 Roles [${Roles.size}]`,
					value: "Use `/roles` to get a list of roles",
				},
			)
			.setColor(colour.main)
			.setThumbnail(guild.iconURL({ size: 4096 }));

		interaction.reply({
			embeds: [server],
		});
	},
};
