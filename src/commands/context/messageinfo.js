const {
	ContextMenuCommandBuilder,
	ApplicationCommandType,
	EmbedBuilder,
	InteractionContextType,
	ApplicationIntegrationType,
} = require("discord.js");

/** @type {import("@types/command").ContextMenuStructure} */
module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName("Message Information")
		.setType(ApplicationCommandType.Message)
		.setContexts([InteractionContextType.Guild, InteractionContextType.BotDM])
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
	category: "information",
	cooldown: 20,
	premium: false,
	guildOnly: false,
	testOnly: false,
	devOnly: false,
	disabled: false,
	botPermissions: ["SendMessages"],
	userPermissions: ["UseApplicationCommands"],
	execute: async (client, interaction) => {
		await interaction.deferReply();

		const { targetId, channel } = interaction;
		const message = await channel.messages.fetch(targetId);

		const embed = new EmbedBuilder()
			.setThumbnail(message.author.displayAvatarURL({ size: 4096 }))
			.setDescription(`[Click here for the message](${message.url})`)
			.addFields([
				{
					name: "✍ Author",
					value: `<@${message.author.id}>`,
					inline: true,
				},
				{
					name: "🆔 Message ID",
					value: `- ${message.id}`,
					inline: true,
				},
				{
					name: "📆 Creation Date",
					value: `- <t:${Math.floor(
						message.createdTimestamp / 1000,
					)}:F>\n- (<t:${Math.floor(message.createdTimestamp / 1000)}:R>)`,
					inline: false,
				},
				{
					name: "📆 Edit Date",
					value: message.editedTimestamp
						? `- <t:${Math.floor(message.editedTimestamp / 1000)}:F>\n- (<t:${Math.floor(
								message.editedTimestamp / 1000,
						  )}:R>)`
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
