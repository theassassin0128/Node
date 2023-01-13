const { EmbedBuilder } = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
	name: "Ban",
	execute: async (interaction, client, id) => {
		const member = (await interaction.guild.members.fetch()).get(id);
		const errorEmbed = new EmbedBuilder();
		const errorArray = [];

		if (!interaction.member.permissions.has("BanMembers"))
			errorArray.push("You do not have the required permission");
		if (!member)
			return interaction.reply({
				embeds: [
					errorEmbed
						.setDescription(
							"The member is no longer a part of this server"
						)
						.setColor("#ff0000"),
				],
				ephemeral: true,
			});
		if (!member.moderatable)
			errorArray.push("The Member is not moderatable by this bot.");
		if (errorArray.length)
			return interaction.reply({
				embeds: [
					errorEmbed
						.setDescription(errorArray.join("\n"))
						.setColor("#ff0000"),
				],
				ephemeral: true,
			});

		const bEmbed = new EmbedBuilder()
			.setTitle("__BAN NOTICE__")
			.setDescription(
				`Dear User,\nI am sorry to say this but you are officially been banned in ${interaction.guild.name}. Your account is created not long ago. Because of this & for some other reason the moderator found your account suspicious. As a result you have been **BANNED**.`
			)
			.setColor(colour.main)
			.setFooter({ text: "BANNED" })
			.setTimestamp();

		if (!member.bot) {
			await member.send({
				content: `${member}`,
				embeds: [bEmbed],
			});
		}

		try {
			member.ban({
				deleteMessageSeconds: 60 * 60 * 24 * 7,
				reason: `Banned by ${interaction.user.tag} & Member Logging System.`,
			});
			await interaction.reply({
				content: `Successfully Banned the user`,
				ephemeral: true,
			});
		} catch (error) {
			interaction.reply({
				content: `Error: ${error}`,
				ephemeral: true,
			});
		}
	},
};
