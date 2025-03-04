const {
  SlashCommandBuilder,
  ApplicationIntegrationType,
  InteractionContextType
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("💬 Emit an discord.js event for debug and dev purposes.")
    .setContexts(InteractionContextType.Guild)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("The event to emit.")
        .setRequired(true)
        .setChoices(
          {
            name: "guildMemeberAdd",
            value: "guildMemberAdd"
          },
          {
            name: "guildMemberRemove",
            value: "guildMemberRemove"
          },
          {
            name: "guildBanAdd",
            value: "guildBanAdd"
          },
          {
            name: "guildBanRemove",
            value: "guildBanRemove"
          }
        )
    )
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("Select a member to be part of the event.")
        .setRequired(false)
    ),
  usage: '[event]: "event"',
  category: "utility",
  cooldown: 0,
  global: true,
  premium: false,
  devOnly: true,
  disabled: false,
  ephemeral: true,
  voiceChannelOnly: false,
  botPermissions: [],
  userPermissions: [],

  async execute(client, interaction, lng) {
    const event = interaction.options.getString("event", true);
    const member = interaction.options.getMember("user") ?? interaction.member;

    switch (event) {
      case "guildMemberAdd": {
        client.emit("guildMemberAdd", member);
        await interaction.followUp({
          content: t("commands:emit.reply", { lng, event })
        });
        break;
      }

      case "guildMemberRemove": {
        client.emit("guildMemberRemove", member);
        await interaction.followUp({
          content: t("commands:emit.reply", { lng, event })
        });
        break;
      }

      case "guildBanAdd": {
        client.emit("guildBanAdd", member);
        await interaction.followUp({
          content: t("commands:emit.reply", { lng, event })
        });
        break;
      }

      case "guildBanRemove": {
        client.emit("guildBanRemove", member);
        await interaction.followUp({
          content: t("commands:emit.reply", { lng, event })
        });
        break;
      }
    }
  }
};
