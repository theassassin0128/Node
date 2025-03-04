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
          name: t("commands:serverinfo.boost", { lng }),
          value: `- **${guild.premiumSubscriptionCount}** Boosts (level: ${guild.premiumTier})`,
          inline: true
        },
        {
          name: t("commands:serverinfo.ownedBy", { lng }),
          value: `- <@${guild.ownerId}>`,
          inline: true
        },
        {
          name: t("commands:serverinfo.members", { lng, size: members.size }),
          value: `- **${members.filter((m) => !m.user.bot).size}** Humans | **${
            members.filter((m) => m.user.bot).size
          }** Bots (${members.size})`,
          inline: true
        },
        {
          name: t("commands:serverinfo.channels", { lng, size: channels.size }),
          value: [
            `**${
              channels.filter((c) => c.type === ChannelType.GuildCategory).size
            }**   Categories`,
            `**${
              channels.filter((c) => c.type === ChannelType.GuildText).size
            }**   Text`,
            `**${
              channels.filter((c) => c.type === ChannelType.GuildVoice).size
            }**   Voice`,
            `**${
              channels.filter((c) => c.type === ChannelType.GuildAnnouncement)
                .size
            }**   Announcement`,
            `**${
              channels.filter((c) => c.type === ChannelType.GuildStageVoice)
                .size
            }**   Stage`,
            `**${
              channels.filter((c) => c.type === ChannelType.GuildForum).size
            }**   Forum`,
            `**${
              channels.filter((c) => c.type === ChannelType.GuildMedia).size
            }**   Media`,
            `**${
              channels.filter((c) => c.type === ChannelType.GuildDirectory).size
            }**   Directory`
          ].join("\n"),
          inline: false
        },
        {
          name: t("commands:serverinfo.emojis", {
            lng,
            size: emojis.size + stickers.size
          }),
          value: `- **${
            emojis.filter((e) => e.animated === false).size
          }** Normal | **${
            emojis.filter((e) => e.animated === true).size
          }** Animated | **${stickers.size}** Sticker`,
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
          value: `- <t:${Math.floor(
            guild.createdTimestamp / 1000
          )}:F> | <t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
          inline: true
        }
      ])
      .setFooter({
        text: t("embeds:default.footer", {
          username: client.user.username,
          year: new Date().getFullYear()
        })
      });

    let server = new EmbedBuilder()
      .setTitle(`${interaction.guild.name}`)
      .addFields(
        {
          name: "🆔 ID",
          value: `${guild.id}`
        },
        {
          name: "📅 Created On",
          value: `<t:${Math.floor(
            guild.createdTimestamp / 1000
          )}:F> | <t:${Math.floor(guild.createdTimestamp / 1000)}:R>`
        },
        {
          name: "👑 Owned by",
          value: `<@${guild.ownerId}> (${guild.ownerId})`
        },
        {
          name: `👥 Members [${guild.memberCount}]`,
          value: "More information will be added in future Updates."
        },
        {
          name: `💬 Channels [${channels.size}]`,
          value: "More information will be added in the future updates."
        },
        {
          name: `🔐 Roles [${guild.roles.cache.size}]`,
          value: "Use `/roles` to get a list of roles"
        }
      )
      .setColor(client.utils.getRandomColor())
      .setThumbnail(guild.iconURL({ size: 4096 }));

    await interaction.followUp({
      embeds: [embed]
    });
  }
};
