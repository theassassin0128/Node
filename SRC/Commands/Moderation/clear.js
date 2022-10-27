const {
    SlashCommandBuilder,
    Client,
    ChatInputCommandInteraction
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
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute: async(interaction, client) => {
        const amount = interaction.options.getInteger("amount");

        if (100 < amount < 0) {
            return interaction.reply("Please, enter a valid amount between **1-100**")
        }
        await interaction.channel.bulkDelete(amount, true);
        interaction.reply({
            content: `${amount + "hi"}`
        })
    }
}