const {
    SlashCommandBuilder,
    Client,
    ChatInputCommandInteraction
} = require("discord.js");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("ping").setDescription("replies with pong!"),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute: async(interaction, client) => {
        interaction.reply({
            content: "Pong!",
            ephemeral: true
        })
    }
}