const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
	MessageFlags,
	InteractionContextType,
	ApplicationIntegrationType,
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a member from the server.")
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("The member to ban from the server.")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option
				.setName("reason")
				.setDescription("Reason for the baning the target.")
				.setRequired(false),
		),
	usage: "[target]: <target> (reason): <reason>",
	category: "moderation",
	cooldown: 10,
	global: true,
	premium: false,
	devOnly: false,
	disabled: false,
	voiceChannelOnly: false,
	userPermissions: ["BanMembers", "ModerateMembers"],
	botPermissions: ["BanMembers", "ModerateMembers", "ManageGuild"],
	async execute(client, interaction, lng) {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		let errArray = [];
		let errEmbed = new EmbedBuilder()
			.setColor(client.config.colors.Wrong)
			.setTitle(t("commands:default.errorTitle", { lng }));

		const { member, guild, options } = interaction;
		const target = await guild.members.fetch(options.getUser("target", true)?.id);
		const reason = options.getString("reason") ?? t("commands:ban.reason", { lng });
		const bot = await guild.members.fetchMe();

		if (!target) errArray.push(t("commands:ban.errors.member", { lng }));
		if (!target.moderatable) errArray.push(t("commands:ban.errors.moderatable", { lng }));
		if (!target.manageable) errArray.push(t("commands:ban.errors.manageable", { lng }));

		if (member.roles.highest.position <= target.roles.highest.position) {
			errArray.push(t("commands:ban.errors.userRole", { lng }));
		}
		if (bot.roles.highest.position <= target.roles.highest.position) {
			errArray.push(t("commands:ban.errors.botRole", { lng }));
		}

		if (errArray.length) {
			errEmbed.setDescription(errArray.join("\n"));
			return interaction.followUp({
				embeds: [errEmbed],
			});
		}

		await target.ban({ reason });
		return interaction.followUp({
			content: t("commands:ban.reply", { lng, target: target.displayName, reason }),
		});
	},
};
