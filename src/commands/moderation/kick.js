const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member from the server.")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to kick from the server.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("Reason for the kick the target.")
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
  userPermissions: ["KickMembers", "ModerateMembers"],
  botPermissions: ["KickMembers", "ModerateMembers", "ManageGuild"],
  async execute(client, interaction, lng) {
    let errArray = [];
    let errEmbed = new EmbedBuilder()
      .setColor(client.config.colors.Wrong)
      .setTitle(t("commands:kick.failed", { lng }));

    const { member, guild, options } = interaction;
    const target = await guild.members.fetch(
      options.getUser("target", true).id
    );
    const reason =
      options.getString("reason") || t("commands:default.reason", { lng });
    const bot = await guild.members.fetchMe();

    if (!target) {
      errArray.push(`- ${t("commands:kick.noMember", { lng })}`);
    }

    if (!target.moderatable) {
      errArray.push(`- ${t("commands:kick.notModeratable", { lng })}`);
    }

    if (!target.manageable) {
      errArray.push(`- ${t("commands:kick.notManageable", { lng })}`);
    }

    if (member.roles.highest.position <= target.roles.highest.position) {
      errArray.push(`- ${t("commands:kick.userRole", { lng })}`);
    }

    if (bot.roles.highest.position <= target.roles.highest.position) {
      errArray.push(`- ${t("commands:kick.botRole", { lng })}`);
    }

    if (errArray.length) {
      errEmbed.setDescription(errArray.join("\n"));
      return interaction.followUp({
        embeds: [errEmbed]
      });
    }

    await target.kick(reason);
    await interaction.followUp({
      content: t("commands:kick.reply", {
        lng,
        target: target.displayName,
        reason
      })
    });
  }
};
