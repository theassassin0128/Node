const {
  EmbedBuilder,
  SlashCommandBuilder,
  ChannelType,
  ApplicationIntegrationType,
  InteractionContextType
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("📖 View the server information.")
    .setContexts(InteractionContextType.Guild)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
  usage: "",
  category: "information",
  cooldown: 30,
  global: true,
  premium: false,
  devOnly: false,
  disabled: false,
  ephemeral: false,
  voiceChannelOnly: false,
  botPermissions: ["SendMessages"],
  userPermissions: ["SendMessages"],

  async execute(client, interaction, lng) {
    const guild = await client.guilds.fetch(interaction.guild.id);
    const members = await guild.members.fetch();
    const channels = guild.channels.cache;
    const emojis = guild.emojis.cache;
    const stickers = guild.stickers.cache;

    const embed = new EmbedBuilder()
      .setColor(client.utils.getRandomColor())
      .setThumbnail(guild.iconURL({ size: 1024, extension: "png" }))
      .setImage(guild.bannerURL())
      .setAuthor({ name: guild.name, iconURL: guild.iconURL() })
      .addFields([
        {
          name: t("commands:serverinfo.id", { lng }),
          value: `- ${guild.id}`,
          inline: true
        },
        {
          name: t("commands:serverinfo.ownedBy", { lng }),
          value: `- <@${guild.ownerId}>`,
          inline: true
        },
        {
          name: t("commands:serverinfo.boost", { lng }),
          value: [
            `- **${guild.premiumSubscriptionCount}** Boosts`,
            `( Level: **${guild.premiumTier}** )`
          ].join(" "),
          inline: false
        },
        {
          name: t("commands:serverinfo.members", { lng, size: members.size }),
          value: [
            "-",
            `**${members.filter((m) => !m.user.bot).size}** Humans`,
            "|",
            `**${members.filter((m) => m.user.bot).size}** Bots`
          ].join(" "),
          inline: true
        },
        {
          name: t("commands:serverinfo.expressions", {
            lng,
            size: emojis.size + stickers.size
          }),
          value: [
            `- **${emojis.filter((e) => e.animated === false).size}** Normal`,
            `| **${emojis.filter((e) => e.animated === true).size}** Animated`,
            `| **${stickers.size}** Sticker`
          ].join(" "),
          inline: false
        },
        {
          name: t("commands:serverinfo.channels", { lng, size: channels.size }),
          value: [
            `- **${
              channels.filter((c) => c.type === ChannelType.GuildText).size
            }** Text | **${
              channels.filter((c) => c.type === ChannelType.GuildVoice).size
            }** Voice`,
            `- ${t("commands:serverinfo.channelView", { lng })}`
          ].join("\n"),
          inline: false
        },
        {
          name: t("commands:serverinfo.roles", {
            lng,
            size: guild.roles.cache.size
          }),
          value: `- ${t("commands:serverinfo.roleView", { lng })}`,
          inline: false
        },
        {
          name: t("commands:serverinfo.createdOn", { lng }),
          value: [
            `- <t:${Math.floor(guild.createdTimestamp / 1000)}:F>`,
            `- <t:${Math.floor(guild.createdTimestamp / 1000)}:R>`
          ].join("\n"),
          inline: true
        }
      ])
      .setFooter({
        text: t("embeds:default.footer", {
          username: client.user.username,
          year: new Date().getFullYear()
        })
      });

    await interaction.followUp({
      embeds: [embed]
    });
  }
};
