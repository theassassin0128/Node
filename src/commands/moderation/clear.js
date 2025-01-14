const {
  SlashCommandBuilder,
  Client,
  PermissionFlagsBits,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete a certain amount of messages.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("Number of messages to delete.")
        .setMaxValue(100)
        .setMinValue(1)
        .setRequired(true),
    )
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The member to delete messages.")
        .setRequired(false),
    ),
  permissionsRequired: ["ManageMessages"],
  botPermissions: ["ManageMessages"],
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
  execute: async (interaction, client) => {
    const { options, channel } = interaction;
    const amount = options.getInteger("amount");
    const member = options.getUser("target");

    if (member) {
      const fetchMessages = await channel.messages.fetch();
      let i = 0;
      let messagesToDelete = [];
      fetchMessages.filter((message) => {
        if (message.author.id == member.id && amount > i) {
          messagesToDelete.push(message);
          i++;
        }
      });

      const dMessages = await channel.bulkDelete(messagesToDelete, true);
      interaction.reply({
        content: `Deleted \`${dMessages.size}\` messages of ${member}`,
        ephemeral: true,
      });
    } else {
      const dMessages = await channel.bulkDelete(amount, true);
      interaction.reply({
        content: `Deleted \`${dMessages.size}\` messages in ${channel}.`,
        ephemeral: true,
      });
    }
  },
};
