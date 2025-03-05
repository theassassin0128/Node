const {
  SlashCommandBuilder,
  EmbedBuilder,
  version,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
  ApplicationIntegrationType,
  InteractionContextType
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("📖 View bot's information.")
    .setContexts(InteractionContextType.Guild)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
  usage: "",
  category: "utility",
  cooldown: 60,
  global: true,
  premium: false,
  devOnly: false,
  disabled: false,
  ephemeral: false,
  voiceChannelOnly: false,
  botPermissions: [
    "SendMessages",
    "ReadMessageHistory",
    "SendMessagesInThreads"
  ],
  userPermissions: ["SendMessages"],

  async execute(client, interaction, lng) {
    const reply = await interaction.fetchReply();
    const gateway = client.ws.ping;
    const response = reply.createdTimestamp - interaction.createdTimestamp;
    const member = await interaction.guild.members.fetchMe();

    const embed = new EmbedBuilder()
      .setColor(client.utils.getRandomColor())
      .addFields([
        {
          name: t("commands:botinfo.tag", { lng }),
          value: `- ${client.user.tag}`,
          inline: true
        },
        {
          name: t("commands:botinfo.nickname", { lng }),
          value: `- ${member.displayName}`,
          inline: true
        },
        {
          name: t("commands:botinfo.id", { lng }),
          value: `- ${client.user.id}`,
          inline: true
        },
        {
          name: t("commands:botinfo.gatewayPing", { lng }),
          value: `- ${gateway}ms`,
          inline: true
        },
        {
          name: t("commands:botinfo.responseTime", { lng }),
          value: `- ${response}ms`,
          inline: true
        },
        {
          name: t("commands:botinfo.uptime", { lng }),
          value: `- ${client.utils.timeFormat(client.uptime)}`,
          inline: true
        },
        {
          name: t("commands:botinfo.version", { lng }),
          value: `- ${client.pkg.version}`,
          inline: true
        },
        {
          name: t("commands:botinfo.ownedBy", { lng }),
          value: `- <@${client.config.bot.ownerId}>`,
          inline: true
        },
        {
          name: t("commands:botinfo.commands", { lng }),
          value: `- ${client.commands.filter((c) => c.global).size}`,
          inline: true
        },
        {
          name: t("commands:botinfo.host", { lng }),
          value: [
            `- [nodejs](https://nodejs.org/en) (${process.version})`,
            `- [discord.js](https://discord.js.org/#/) (${version})`
          ].join("\n"),
          inline: true
        },
        {
          name: t("commands:botinfo.stats", { lng }),
          value: [
            `- CPU : ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`,
            `- RAM : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )} MB`
          ].join("\n"),
          inline: true
        }
      ])
      .setFooter({
        text: t("embeds:default.footer", {
          username: client.user.username,
          year: new Date().getFullYear()
        })
      })
      .setTimestamp();

    const githubButton = new ButtonBuilder()
      .setLabel("GitHub")
      .setStyle(ButtonStyle.Link)
      .setURL(client.config.links.githubRepo);

    const discordButton = new ButtonBuilder()
      .setLabel("Support")
      .setStyle(ButtonStyle.Link)
      .setURL(client.config.links.supportServer);

    const inviteButton = new ButtonBuilder()
      .setLabel("Invite Me")
      .setStyle(ButtonStyle.Link)
      .setURL(await client.utils.getInvite());

    const websiteButton = new ButtonBuilder()
      .setLabel("Website")
      .setStyle(ButtonStyle.Link)
      .setURL(client.config.links.botWebsite);

    const actionRow = new ActionRowBuilder()
      .addComponents(githubButton)
      .addComponents(discordButton)
      .addComponents(inviteButton)
      .addComponents(websiteButton);

    return interaction.followUp({
      embeds: [embed],
      components: [actionRow]
    });
  }
};
