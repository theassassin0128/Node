const { EmbedBuilder } = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
  name: "Kick",
  execute: async (interaction, client, id) => {
    const member = (await interaction.guild.members.fetch()).get(id);
    const errorEmbed = new EmbedBuilder();
    const errorArray = [];

    if (!interaction.member.permissions.has("KickMembers"))
      errorArray.push("You do not have the required permission");
    if (!member)
      return interaction.reply({
        embeds: [
          errorEmbed
            .setDescription("The member is no longer a part of this server")
            .setColor("#ff0000"),
        ],
        ephemeral: true,
      });
    if (!member.moderatable)
      errorArray.push("The Member is not moderatable by this bot.");
    if (errorArray.length)
      return interaction.reply({
        embeds: [
          errorEmbed.setDescription(errorArray.join("\n")).setColor("#ff0000"),
        ],
        ephemeral: true,
      });

    try {
      member.kick(`Kicked by ${interaction.user.tag} & Member Logging System.`);
      await interaction.reply({
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
