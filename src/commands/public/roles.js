const {
  SlashCommandBuilder,
  EmbedBuilder,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Returns embed(s) with server roles."),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute: async (interaction, client) => {
    const roles = interaction.guild.roles.cache.sort(
      (a, b) => b.position - a.position
    );
    const roleString = roles.map((r) => r);
    const size = roleString.toString().length;
    if (size > 3608)
      return interaction.reply({
        content: `Too many roles to display. About [${roles.size - 1}] roles.`,
        ephemeral: true,
      });

    const rEmbed = new EmbedBuilder()
      .setTitle("ALL ROLES OF THIS SERVER")
      .setColor(colour.main)
      .setDescription(`${roleString.join("\n").replace("@everyone", " ")}`);

    interaction.reply({
      embeds: [rEmbed],
    });
  },
};
