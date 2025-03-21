const {
  SlashCommandBuilder,
  Routes,
  InteractionContextType,
  ApplicationIntegrationType
} = require("discord.js");
const { URLSearchParams } = require("url");
const fs = require("fs");
const path = require("path");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Testing some features.")
    .setContexts(InteractionContextType.Guild)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall),
  usage: "",
  category: "none",
  cooldown: 0,
  global: true,
  premium: false,
  devOnly: true,
  disabled: false,
  ephemeral: true,
  voiceChannelOnly: false,
  botPermissions: [],
  userPermissions: [],
  async execute(client, interaction) {
    const { guildId } = client.config.bot;
    const filePath = path.join(
      "src",
      "database",
      "structures",
      "GuildData.json"
    );
    const response = await client.rest.get(Routes.guild(guildId), {
      query: new URLSearchParams({ with_counts: true })
    });

    if (response) fs.writeFileSync(filePath, JSON.stringify(response));
    await interaction.followUp({ content: "Test completed" });
  }
};
