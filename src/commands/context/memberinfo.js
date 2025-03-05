const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
  EmbedBuilder,
  AttachmentBuilder,
  InteractionContextType,
  ApplicationIntegrationType
} = require("discord.js");
const { t } = require("i18next");
const { profileImage } = require("discord-arts");

/** @type {import("@types/index").ContextStructure} */
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
  ephemeral: false,
  botPermissions: ["SendMessages"],
  userPermissions: ["UseApplicationCommands"],

  async execute(client, interaction, lng) {
    const { targetId, guild } = interaction;
    const member = await guild.members.fetch(targetId);
    const topRoles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((r) => r)
      .slice(0, 5);

    const profileBuffer = await profileImage(member.id);
    const banner = new AttachmentBuilder(profileBuffer, {
      name: "banner.png"
    });

    const embed = new EmbedBuilder()
      .setColor(member.roles.color?.hexColor || client.utils.getRandomColor())
      .setThumbnail(member.displayAvatarURL({ size: 4096 }))
      .setImage("attachment://banner.png")
      .setDescription(`<@${member.id}>`)
      .addFields([
        {
          name: t("context:memberinfo.username", { lng }),
          value: `- ${member.user.username}`,
          inline: true
        },
        {
          name: t("context:memberinfo.nickname", { lng }),
          value: `- ${member.displayName}`,
          inline: true
        },
        {
          name: t("context:memberinfo.id", { lng }),
          value: `- ${member.id}`,
          inline: false
        },
        {
          name: t("context:memberinfo.roles", {
            lng,
            count: member.roles.cache.size
          }),
          value: `- ${topRoles.join("\n- ")}`,
          inline: false
        },
        {
          name: t("context:memberinfo.boost", { lng }),
          value: member.premiumSince
            ? `- Since <t:${Math.floor(member.premiumSinceTimestamp / 1000)}:F>`
            : "- No",
          inline: false
        },
        {
          name: t("context:memberinfo.creation", { lng }),
          value: [
            `- <t:${Math.floor(member.user.createdTimestamp / 1000)}:F>`,
            `- <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`
          ].join("\n"),
          inline: false
        },
        {
          name: t("context:memberinfo.join", { lng }),
          value: [
            `- <t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
            `- <t:${Math.floor(member.joinedTimestamp / 1000)}:R>`
          ].join("\n"),
          inline: false
        }
      ]);

    await interaction.followUp({ embeds: [embed], files: [banner] });
  }
};
