const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
	InteractionContextType,
	ApplicationIntegrationType,
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/command").ContextMenuStructure} */
module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("Message Information")
		.setType(ApplicationCommandType.Message)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
	category: "information",
	cooldown: 30,
	premium: false,
	guildOnly: true,
	devOnly: false,
	global: true,
	disabled: false,
	botPermissions: ["SendMessages"],
	userPermissions: ["UseApplicationCommands"],
	execute: async (client, interaction, lng) => {
		await interaction.deferReply();

		const { targetId, channel } = interaction;
		const message = await channel.messages.fetch(targetId);

		const embed = new EmbedBuilder()
			.setThumbnail(message.author.displayAvatarURL({ size: 4096 }))
			.setDescription(`[${t("context:messageinfo.click", { lng })}](${message.url})`)
			.addFields([
				{
					name: t("context:messageinfo.author", { lng }),
					value: `<@${message.author.id}>`,
					inline: true,
				},
				{
					name: t("context:messageinfo.id"),
					value: `- ${message.id}`,
					inline: true,
				},
				{
					name: t("context:messageinfo.creation", { lng }),
					value: `- <t:${Math.floor(
						message.createdTimestamp / 1000,
					)}:F>\n- <t:${Math.floor(message.createdTimestamp / 1000)}:R>`,
					inline: false,
				},
				{
					name: t("context:messageinfo.edit", { lng }),
					value: message.editedTimestamp
						? `- <t:${Math.floor(message.editedTimestamp / 1000)}:F>\n- <t:${Math.floor(
								message.editedTimestamp / 1000,
						  )}:R>`
						: "- Not Edited",
					inline: false,
				},
			])
			.setColor(client.utils.getRandomColor());

		return await interaction.followUp({
			embeds: [embed],
		});
	},
};
