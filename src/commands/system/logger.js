const {
	SlashCommandBuilder,
	InteractionContextType,
	ApplicationIntegrationType,
	EmbedBuilder,
	MessageFlags,
	ChannelType,
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("logger")
		.setDescription("Setup logging system to send logs to a channel")
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.addSubcommand((option) =>
			option
				.setName("setup")
				.setDescription("Setup to logger to recive logs")
				.addStringOption((option) =>
					option
						.setName("category")
						.setDescription("The type of log to set")
						.setRequired(true)
						.addChoices([
							{
								name: "Information",
								value: "info",
							},
							{
								name: "Warning",
								value: "warn",
							},
							{
								name: "Error",
								value: "error",
							},
							{
								name: "Debug",
								value: "debug",
							},
							{
								name: "Success",
								value: "success",
							},
							{
								name: "Custom",
								value: "custom",
							},
						]),
				)
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("The channel to send the logs")
						.addChannelTypes(ChannelType.GuildText),
				)
				.addRoleOption((option) =>
					option.setName("role").setDescription("Role to mention when sending the log"),
				)
				.addBooleanOption((option) =>
					option
						.setName("enabled")
						.setDescription("Select true to enable and Flase to disable"),
				),
		)
		.addSubcommand((option) =>
			option.setName("status").setDescription("Get stats for the logging system"),
		)
		.addSubcommand((option) =>
			option.setName("destroy").setDescription("Remove the logging system"),
		),
	usage: "[subcommand]: <subcommand> | [options]?: <options|null>",
	category: "none",
	cooldown: 0,
	premium: false,
	guildOnly: true,
	testOnly: false,
	devOnly: true,
	disabled: false,
	voiceChannelOnly: false,
	botPermissions: ["ManageChannels", "ManageWebhooks"],
	userPermissions: ["ManageWebhooks"],
	execute: async (client, interaction) => {
		await interaction.deferReply({
			flags: MessageFlags.Ephemeral,
		});

		const subCommand = interaction.options.getSubcommand(true);

		switch (subCommand) {
			case "setup":
				{
					const category = interaction.options.getString("category", true);
					const channelId = interaction.options.getChannel("channel")?.id ?? null;
					const roleId = interaction.options.getRole("role")?.id ?? null;
					const enabled = interaction.options.getBoolean("enabled") ?? true;

					const loggerSchema = await client.db.models.logger.findOne({
						clientId: client.user.id,
					});

					if (!loggerSchema) {
						if (!channelId) {
							return interaction.followUp({
								content: t("commands:logger.noChannel"),
								flags: MessageFlags.Ephemeral,
							});
						}

						await client.db.models.logger.create({
							clientId: client.user.id,
							[category]: {
								enabled: true,
								channelId: channelId,
								roleId: roleId,
							},
						});

						return interaction.followUp({
							content: t("commands:logger.created"),
							flags: MessageFlags.Ephemeral,
						});
					}

					if (!Object.getOwnPropertyNames(loggerSchema.toObject()).includes(category)) {
						if (!channelId) {
							return interaction.followUp({
								content: t("commands:logger.noChannel"),
								flags: MessageFlags.Ephemeral,
							});
						}

						loggerSchema[category] = {
							enabled: true,
							channelId: channelId,
							roleId: roleId,
						};

						await loggerSchema.save();
						return interaction.followUp({
							content: t("commands:logger.created"),
							flags: MessageFlags.Ephemeral,
						});
					}

					if (channelId) loggerSchema[category].channelId = channelId;
					if (roleId) loggerSchema[category].roleId = roleId;
					if (!enabled) loggerSchema[category].enabled = false;
					console.log(enabled);

					await loggerSchema.save();
					interaction.followUp({
						content: t("commands:logger.updated"),
						flags: MessageFlags.Ephemeral,
					});
				}
				break;

			case "status":
				{
					const doc = await client.db.models.logger.findOne({
						clientId: client.user.id,
					});

					if (!doc) {
						return interaction.followUp({
							content: t("commands:logger.noLogger"),
							flags: MessageFlags.Ephemeral,
						});
					}

					const status = new EmbedBuilder()
						.setTitle("Logging System Status")
						.setDescription(t("commands:logger.description"))
						.setFooter({
							text: t("embeds:default.footer", {
								u: client.user.username,
								y: new Date().getFullYear(),
							}),
						})
						.setColor(client.config.colors.Main)
						.addFields([
							{
								name: "Information",
								value: `Status: ${
									doc.info.enabled ? "Active" : "Deactive"
								} \nChannel: <#${doc.info.channelId ?? "None"}> \n Role: <@&${
									doc.info.roleId ?? "None"
								}>`,
							},
							{
								name: "Error",
								value: `Status: ${
									doc.error.enabled ? "Active" : "Deactive"
								} \nChannel: <#${doc.error.channelId ?? "None"}> \n Role: <@&${
									doc.error.roleId ?? "None"
								}>`,
							},
							{
								name: "Warning",
								value: `Status: ${
									doc.warn.enabled ? "Active" : "Deactive"
								} \nChannel: <#${doc.warn.channelId ?? "None"}> \n Role: <@&${
									doc.warn.roleId ?? "None"
								}>`,
							},
							{
								name: "Debug",
								value: `Status: ${
									doc.debug.enabled ? "Active" : "Deactive"
								} \nChannel: <#${doc.debug.channelId ?? "None"}> \n Role: <@&${
									doc.debug.roleId ?? "None"
								}>`,
							},
							{
								name: "Success",
								value: `Status: ${
									doc.success.enabled ? "Active" : "Deactive"
								} \nChannel: <#${doc.success.channelId ?? "None"}> \n Role: <@&${
									doc.success.roleId ?? "None"
								}>`,
							},
							{
								name: "Custom",
								value: `Status: ${
									doc.custom.enabled ? "Active" : "Deactive"
								} \nChannel: <#${doc.custom.channelId ?? "None"}> \n Role: <@&${
									doc.custom.roleId ?? "None"
								}>`,
							},
						]);

					interaction.followUp({
						embeds: [status],
						flags: MessageFlags.Ephemeral,
					});
				}
				break;

			case "destroy":
				{
					const doc = await client.db.models.logger.findOneAndDelete({
						clientId: client.user.id,
					});

					if (doc.$isDeleted) {
						interaction.followUp({
							content: t("commands:logger.destroy"),
							flags: MessageFlags.Ephemeral,
						});
					}
				}
				break;
		}
	},
};
