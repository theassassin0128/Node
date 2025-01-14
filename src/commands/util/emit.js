const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("emit")
    .setDescription("Emit an Event")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("The event to emit")
        .setRequired(true)
        .setChoices(
          {
            name: "guildMemeberAdd",
            value: "m1",
          },
          {
            name: "guildMemberRemove",
            value: "m2",
          },
        ),
    )
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to emit an event.")
        .setRequired(false),
    ),
  execute: async (interaction, client) => {
    const user = interaction.options.getUser("user");
    let member = interaction.member;
    if (user) member = interaction.guild.members.cache.get(user.id);
    const string = interaction.options.getString("event");
    switch (string) {
      case "m1":
        {
          await client.emit("guildMemberAdd", member);

          interaction.reply({
            content: "Emitted Guild Member Add event successfully.",
            ephemeral: true,
          });
        }
        break;
      case "m2":
        {
          await client.emit("guildMemberRemove", member);

          interaction.reply({
            content: "Emitted Guild Member Remove event successfully.",
            ephemeral: true,
          });
        }
        break;
    }
  },
};
