const {
	EmbedBuilder,
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
} = require("discord.js");
const { colour } = require("../../config.json");
const moment = require("moment");

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName("user-info")
		.setDescription("Replies an embed containing user information")
		.addUserOption((options) =>
			options.setName("user").setDescription("The user")
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		try {
			const user =
				interaction.options.getUser("user") || interaction.user;
			const User = interaction.guild.members.cache.get(user.id);

			let Roles = User.roles.cache;

			let info1 = new EmbedBuilder()
				.setTitle(`${user.tag}`)
				.setImage()
				.setDescription(
					`**Nick Name : ${User.displayName} | ${user}\nUser Name: ${User.user.username} \nID : __${user.id}__**`
				)
				.addFields(
					{
						name: "Joined Server",
						value: `${moment(User.joinedAt).format(
							"dddd, MMMM Do YYYY, h:mm:ss A"
						)}\n** - ${moment(
							User.joinedAt,
							"YYYYMMDD"
						).fromNow()}**`,
					},
					{
						name: "Joined Discord",
						value: `${moment(user.createdAt).format(
							"dddd, MMMM Do YYYY, h:mm:ss A"
						)}\n** - ${moment(
							user.createdAt,
							"YYYYMMDD"
						).fromNow()}**`,
					},
					{
						name: `Roles [${Roles.size - 1}]`,
						value: "More info will be added in the next update.",
					}
				)
				.setColor(colour.main);

			interaction.reply({
				embeds: [info1],
			});
		} catch (err) {
			interaction.reply({
				content: `${err}`,
			});
		}
	},
};
