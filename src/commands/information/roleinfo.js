const {
  EmbedBuilder,
  SlashCommandBuilder,
  ApplicationIntegrationType,
  InteractionContextType
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("roleinfo")
    .setDescription("📖 View any role's information.")
    .setContexts(InteractionContextType.Guild)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Select a role to view.")
        .setRequired(true)
    ),
  usage: "[role]: <role>",
  category: "information",
  cooldown: 20,
  global: true,
  premium: false,
  devOnly: false,
  disabled: false,
  ephemeral: false,
  voiceChannelOnly: false,
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],

  async execute(client, interaction, lng) {
    const { guild, options } = interaction;
    const role = options.getRole("role", true);

    const embed = new EmbedBuilder()
      .setColor(role.hexColor)
      .setThumbnail(role.icon ? role.iconURL() : null)
      .addFields([
        {
          name: t("commands:roleinfo.role", { lng }),
          value: `- ${role}`,
          inline: true
        },
        {
          name: t("commands:roleinfo.id", { lng }),
          value: `- ${role.id}`,
          inline: true
        },
        {
          name: t("commands:roleinfo.createdOn", { lng }),
          value: [
            "-",
            `<t:${Math.floor(role.createdTimestamp / 1000)}:F>`,
            "|",
            `<t:${Math.floor(role.createdTimestamp / 1000)}:R>`
          ].join(" "),
          inline: false
        },
        {
          name: t("commands:roleinfo.mentionable", { lng }),
          value: `- ${role.mentionable ? "Yes" : "No"}`,
          inline: true
        },
        {
          name: t("commands:roleinfo.hoisted", { lng }),
          value: `- ${role.hoist ? "Yes" : "No"}`,
          inline: true
        },
        {
          name: t("commands:roleinfo.botRole", { lng }),
          value: `- ${role.managed ? "Yes" : "No"}`,
          inline: true
        },
        {
          name: t("commands:roleinfo.color", { lng }),
          value: `- ${role.hexColor}`,
          inline: true
        },
        {
          name: t("commands:roleinfo.members", { lng }),
          value: `- ${role.members.size}`,
          inline: true
        },
        {
          name: t("commands:roleinfo.position", { lng }),
          value: `- ${guild.roles.cache.size - role.position}`,
          inline: true
        }
      ])
      .setFooter({
        text: t("embeds:default.footer", {
          lng,
          username: client.user.username,
          year: new Date().getFullYear()
        })
      });

    await interaction.followUp({ embeds: [embed] });
  }
};
