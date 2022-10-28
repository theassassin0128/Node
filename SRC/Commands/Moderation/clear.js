const {
    SlashCommandBuilder,
    Client,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Delete a certain amount of messages.")
    .addIntegerOption(
        option => option
        .setName("amount")
        .setDescription("Number of messages to delete.")
        .setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    ,
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute: async(interaction, client) => {
        const {member, guild, user} = interaction;

        const amount = interaction.options.getInteger("amount");

        if(100 < amount < 0) {
            return interaction.reply("Please, enter a valid amount between **1-100**")
        };

        const dMsg = await interaction.channel.bulkDelete(amount, true);
        interaction.reply({
            content: `Successfully deleted ${dMsg.size} messages.`,
            ephemeral: true
        })
    }
};