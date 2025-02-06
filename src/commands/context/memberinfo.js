const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
	InteractionContextType,
	AttachmentBuilder,
	ApplicationIntegrationType,
} = require("discord.js");
const { profileImage } = require("discord-arts");

/** @type {import("@types/command").ContextMenuStructure} */
module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("Member Information")
		.setType(ApplicationCommandType.User)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
	category: "information",
	cooldown: 20,
	premium: false,
	guildOnly: true,
	testOnly: false,
	devOnly: false,
	disabled: false,
	botPermissions: ["SendMessages"],
	userPermissions: ["UseApplicationCommands"],
	execute: async (client, interaction) => {
		await interaction.deferReply();

		const { targetId, guild } = interaction;
		const member = await guild.members.fetch(targetId);
		const profileBuffer = await profileImage(targetId);
		const imageAttachment = new AttachmentBuilder(profileBuffer, {
			name: "profile.png",
		});

		const embed = new EmbedBuilder()
			.setThumbnail(member.displayAvatarURL({ size: 4096 }))
			.setImage("attachment://profile.png")
			.setDescription(`<@${member.id}>`)
			.addFields([
				{
					name: "📛 username",
					value: `- ${member.user.username}`,
					inline: true,
				},
				{
					name: "🆔 ID",
					value: `- ${member.id}`,
					inline: true,
				},
				{
					name: `🎖 Roles [${member.roles.cache.size}] Shows up to 15`,
					value: `${member.roles.cache
						.map((r) => `<@&${r.id}>`)
						.slice(0, 15)
						.join(", ")}`,
					inline: false,
				},
				{
					name: "🔰 Nickname",
					value: `- ${member.displayName}`,
					inline: true,
				},
				{
					name: "🚀 Server Boost",
					value: member.premiumSince ? "- Yes" : "- No",
					inline: true,
				},
				{
					name: "📆 Creation Date",
					value: `- <t:${Math.floor(
						member.user.createdTimestamp / 1000,
					)}:F>\n- (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>)`,
					inline: false,
				},
				{
					name: "📆 Joined Date",
					value: `- <t:${Math.floor(
						member.joinedTimestamp / 1000,
					)}:F>\n- (<t:${Math.floor(member.joinedTimestamp / 1000)}:R>)`,
					inline: false,
				},
			])
			.setColor(member.roles.color?.hexColor || client.utils.getRandomColor());

		return await interaction.followUp({
			embeds: [embed],
			files: [imageAttachment],
		});
	},
};
