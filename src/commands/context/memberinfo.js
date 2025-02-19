const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
	InteractionContextType,
	AttachmentBuilder,
	ApplicationIntegrationType,
} = require("discord.js");
const { t } = require("i18next");
const { profileImage } = require("discord-arts");

/** @type {import("@typings/index").CommandStructure} */
module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("Member Information")
		.setType(ApplicationCommandType.User)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
	category: "information",
	cooldown: 180,
	premium: false,
	guildOnly: true,
	devOnly: false,
	global: true,
	disabled: false,
	botPermissions: ["SendMessages"],
	userPermissions: ["UseApplicationCommands"],
	execute: async (client, interaction, lng) => {
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
					name: t("context:memberinfo.username", { lng }),
					value: `- ${member.user.username}`,
					inline: true,
				},
				{
					name: t("context:memberinfo.nickname", { lng }),
					value: `- ${member.displayName}`,
					inline: true,
				},
				{
					name: t("context:memberinfo.id", { lng }),
					value: `- ${member.id}`,
					inline: false,
				},
				{
					name: t("context:memberinfo.boost", { lng }),
					value: member.premiumSince ? `- <t:${member.premiumSinceTimestamp}:R>` : "- No",
					inline: false,
				},
				{
					name: t("context:memberinfo.creation", { lng }),
					value: `- <t:${Math.floor(
						member.user.createdTimestamp / 1000,
					)}:F>\n- <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`,
					inline: false,
				},
				{
					name: t("context:memberinfo.join", { lng }),
					value: `- <t:${Math.floor(member.joinedTimestamp / 1000)}:F>\n- <t:${Math.floor(
						member.joinedTimestamp / 1000,
					)}:R>`,
					inline: false,
				},
				{
					name: t("context:memberinfo.roles", { lng, count: member.roles.cache.size }),
					value: `${member.roles.cache
						.map((r) => r)
						.slice(0, 15)
						.join(", ")}`,
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
