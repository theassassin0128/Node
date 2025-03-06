const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  InteractionContextType,
  ApplicationIntegrationType
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
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the baning the target.")
        .setRequired(false)
    ),
  usage: "[target]: <GuildMember> (reason): <reason>",
  category: "moderation",
  cooldown: 10,
  global: true,
  premium: false,
  devOnly: false,
  disabled: false,
  ephemeral: true,
  voiceChannelOnly: false,
  userPermissions: ["BanMembers", "ModerateMembers"],
  botPermissions: ["BanMembers", "ModerateMembers", "ManageGuild"],
  async execute(client, interaction, lng) {
    let errArray = [];
    let errEmbed = new EmbedBuilder()
      .setColor(client.config.colors.Wrong)
      .setTitle(t("commands:ban.failed", { lng }));

    const { member, guild, options } = interaction;
    const target = await guild.members.fetch(
      options.getUser("target", true).id
    );
    const reason =
      options.getString("reason") || t("commands:default.reason", { lng });
    const bot = await guild.members.fetchMe();

    if (!target) {
      errArray.push(`- ${t("commands:ban.noMember", { lng })}`);
    }

    if (!target.moderatable) {
      errArray.push(`- ${t("commands:ban.notModeratable", { lng })}`);
    }

    if (!target.manageable) {
      errArray.push(`- ${t("commands:ban.notManageable", { lng })}`);
    }

    if (member.roles.highest.position <= target.roles.highest.position) {
      errArray.push(`- ${t("commands:ban.userRole", { lng })}`);
    }

    if (bot.roles.highest.position <= target.roles.highest.position) {
      errArray.push(`- ${t("commands:ban.botRole", { lng })}`);
    }

    if (errArray.length) {
      errEmbed.setDescription(errArray.join("\n"));
      return interaction.followUp({
        embeds: [errEmbed]
      });
    }

    await target.ban({ reason });
    await interaction.followUp({
      content: t("commands:ban.reply", {
        lng,
        target: target.displayName,
        reason
      })
    });
  }
};
