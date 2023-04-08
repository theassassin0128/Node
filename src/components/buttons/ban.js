const {
  EmbedBuilder,
  PermissionFlagsBits,
  Client,
  ChatInputCommandInteraction,
} = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
  name: "Ban",
  permissionsRequire: [PermissionFlagsBits.BanMembers],
  botPermissions: [PermissionFlagsBits.BanMembers],
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   * @returns
   */
  execute: async (interaction, client, id) => {
    const member = (await interaction.guild.members.fetch()).get(id);
    const errorEmbed = new EmbedBuilder();
    const errorArray = [];

    if (!member) {
      interaction.reply({
        embeds: [
          errorEmbed
            .setDescription("The member is no longer a part of this server")
            .setColor(colour.error),
        ],
        ephemeral: true,
      });
      return;
    }

    if (!member.moderatable)
      errorArray.push("The Member is not moderatable by this bot.");
    if (errorArray.length) {
      interaction.reply({
        embeds: [
          errorEmbed
            .setDescription(errorArray.join("\n"))
            .setColor(colour.error),
        ],
        ephemeral: true,
      });
      return;
    }

    const bEmbed = new EmbedBuilder()
      .setTitle("__BAN NOTICE__")
      .setDescription(
        `Dear ${member},\nThis is to notify you that have been banned in ${interaction.guild.name}.`
      )
      .setColor(colour.main)
      .setFooter({
        text: interaction.guild.name,
        iconURL: interaction.guild.iconURL(),
      })
      .setTimestamp();

    if (!member.user.bot) {
      await member.send({
        content: `${member}`,
        embeds: [bEmbed],
      });
    }

    try {
      await member.ban({
        deleteMessageSeconds: 60 * 60 * 24 * 7,
        reason: `Banned by ${interaction.user.tag} & Member Logging System.`,
      });
      interaction.reply({
        content: `Successfully Banned the user`,
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("ERROR Occured")
            .setDescription(`An error occoured while executing the command.\n`)
            .setColor(colour.error),
        ],
        ephemeral: true,
      });
    }
  },
};
