const {
  EmbedBuilder,
  SlashCommandBuilder,
  InteractionContextType,
  ApplicationIntegrationType,
  AttachmentBuilder
} = require("discord.js");
const { profileImage } = require("discord-arts");
const { t } = require("i18next");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("memberinfo")
    .setDescription("📖 View your or any member's information.")
    .setContexts(InteractionContextType.Guild)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select a member or leave empty to view your own info.")
        .setRequired(false)
    ),
  usage: "[member]: <GuildMember|InteractionUser>",
  category: "information",
  cooldown: 120,
  global: true,
  premium: false,
  devOnly: false,
  disabled: false,
  ephemeral: false,
  voiceChannelOnly: false,
  botPermissions: [],
  userPermissions: ["SendMessages"],

  async execute(client, interaction, lng) {
    const { user, guild, options } = interaction;
    const member = await guild.members.fetch(
      options.getUser("member").id || user.id
    );

    const profileBuffer = await profileImage(member.id);
    const banner = new AttachmentBuilder(profileBuffer, {
      name: "banner.png"
    });

    const joinedPosition = client.utils.addSuffix(
      Array.from(
        guild.members.cache
          .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
          .keys()
      ).indexOf(member.id) + 1
    );

    const topRoles = member.roles.cache
      .sort((a, b) => b.position - a.position)
      .map((r) => r)
      .slice(0, 5);

    const MemberInfo = new EmbedBuilder()
      .setColor(member.displayHexColor || client.utils.getRandomColor())
      .setThumbnail(member.displayAvatarURL({ extension: "png", size: 1024 }))
      .setDescription(`<@${member.id}>`)
      .setImage("attachment://banner.png")
      .addFields(
        {
          name: t("commands:memberinfo.username", { lng }),
          value: `- ${member.user.username}`,
          inline: true
        },
        {
          name: t("commands:memberinfo.nickname", { lng }),
          value: `- ${member.displayName}`,
          inline: true
        },
        {
          name: t("commands:memberinfo.id", { lng }),
          value: `- ${member.id}`,
          inline: false
        },
        {
          name: t("commands:memberinfo.position", { lng }),
          value: `- ${joinedPosition}`,
          inline: false
        },
        {
          name: t("commands:memberinfo.roles", {
            lng,
            count: member.roles.cache.size
          }),
          value: `- ${topRoles.join("\n- ")}`,
          inline: false
        },
        {
          name: t("commands:memberinfo.boost", { lng }),
          value: member.premiumSince
            ? `- Since <t:${Math.floor(member.premiumSinceTimestamp / 1000)}:F>`
            : "- No",
          inline: true
        },
        {
          name: t("commands:memberinfo.creation", { lng }),
          value: [
            `- <t:${Math.floor(member.user.createdTimestamp / 1000)}:F>`,
            `- <t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`
          ].join("\n"),
          inline: false
        },
        {
          name: t("commands:memberinfo.join", { lng }),
          value: [
            `- <t:${Math.floor(member.joinedTimestamp / 1000)}:F>`,
            `- <t:${Math.floor(member.joinedTimestamp / 1000)}:R>`
          ].join("\n"),
          inline: false
        }
      )
      .setFooter({
        text: t("embeds:default.footer", {
          username: client.user.username,
          year: new Date().getFullYear()
        })
      });

    await interaction.followUp({ embeds: [MemberInfo], files: [banner] });
  }
};
