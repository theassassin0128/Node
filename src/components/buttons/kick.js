const { EmbedBuilder } = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
	name: "Kick",
	execute: async (interaction, client, id) => {
		const member = (await interaction.guild.members.fetch()).get(id);
		const errorEmbed = new EmbedBuilder();
		const errorArray = [];

		if (!interaction.member.permissions.has("KickMembers"))
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

		const kEmbed = new EmbedBuilder()
			.setTitle("__KICK NOTICE__")
			.setDescription(
				`Dear User,\nI am sorry to say this but you are officially been kicked out of ${interaction.guild.name}. Your account is created not long ago. Because of this the moderator found your account suspicious. As a result you have been **KICKED** out of the server.`
			)
			.setColor(colour.main)
			.setFooter({ text: "KICKED" })
			.setTimestamp();

		if (!member.bot) {
			await member.send({
				content: `${member}`,
				embeds: [kEmbed],
			});
		}

		try {
			member.kick(
				`Kicked by ${interaction.user.tag} & Member Logging System.`
			);
			await interaction.reply({
				content: `Successfully kicked the user`,
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
