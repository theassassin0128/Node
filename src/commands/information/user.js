const {
	EmbedBuilder,
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
	ReactionUserManager,
} = require("discord.js");
const { colour } = require("../../config.json");
const moment = require("moment");

module.exports = {
	developer: true,
	data: new SlashCommandBuilder()
		.setName("user")
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
			let colour = User.roles.color.hexColor;

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
							`**:identification_card: Name** : ${user.tag}`,
							`**:id: ID** : ${user.id}`,
							`**:placard: Nickname** : ${User.displayName} || None`,
							`**:robot: Bot** : ${
								user.bot ? ":white_check_mark: Yes" : ":x: No"
							} `,
							`**Joined Server** : \n${moment(
								User.joinedAt
							).format(
								"dddd, MMMM Do YYYY, h:mm:ss A"
							)}\n** - ${moment(
								User.joinedAt,
								"YYMMDD"
							).fromNow()}**`,
						].join("\n"),
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
				.setColor(colour);

			interaction.reply({
				embeds: [info],
			});
		} catch (err) {
			console.error(err);
		}
	},
};
