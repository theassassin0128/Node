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
		.setName("userinfo")
		.setDescription("Replies an embed containing user information")
		.setDMPermission(false)
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
			let color = null;
			if (!User.roles.color) {
				color = colour.main;
			} else {
				color = User.roles.color.hexColor;
			}
			let Roles = User.roles.cache;

			const info = new EmbedBuilder()
				.setAuthor({
					name: `${user.username}'s Information`,
					iconURL: `${user.displayAvatarURL({ size: 2048 })}`,
				})
				.setThumbnail(User.displayAvatarURL({ size: 4096 }))
				.addFields(
					{
						name: "**__General Information__**",
						value: [
							`**Name** : ${user.tag}`,
							`**ID** : ${user.id}`,
							`**Nickname** : ${User.displayName || None}`,
							`**Bot?** : ${user.bot ? "Yes" : "No"} `,
							`**Joined Server** : on ${moment(
								User.joinedAt
							).format(
								"dddd, MMMM Do YYYY, h:mm:ss A"
							)}\n** - ${moment(
								User.joinedAt,
								"YYYYMMDD"
							).fromNow()}**`,
							`**Joined Discord** : on ${moment(
								user.createdAt
							).format(
								"dddd, MMMM Do YYYY, h:mm:ss A"
							)}\n** - ${moment(
								user.createdAt,
								"YYYYMMDD"
							).fromNow()}**`,
						].join("\n"),
					},
					{
						name: `__Role Information__`,
						value: [
							`**Roles** : Total - ${Roles.size - 1}`,
							"More info will be added in the next update.",
						].join("\n"),
					}
				)
				.setColor(color);

			interaction.reply({
				embeds: [info],
			});
		} catch (err) {
			console.error(err);
		}
	},
};
