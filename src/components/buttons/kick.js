const {
  EmbedBuilder,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
  Client,
} = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
  name: "Kick",
  permissionsRequire: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
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

    const kEmbed = new EmbedBuilder()
      .setTitle("__KICK NOTICE__")
      .setDescription(
        `Dear ${member},\nThis is to notify you that have been kicked out of ${interaction.guild.name}.`
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
        embeds: [kEmbed],
      });
    }

    try {
      await member.kick(
        `Kicked by ${interaction.user.tag} & Member Logging System.`
      );
      interaction.reply({
        content: `Successfully kicked the user`,
        ephemeral: true,
      });
    } catch (error) {
      interaction.reply({
        content: `Error: ${error}`,
        ephemeral: true,
      });
    }
  },
};
