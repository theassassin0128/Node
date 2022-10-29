const {
    EmbedBuilder,
    Client,
    SlashCommandBuilder,
    ChatInputCommandInteraction
} = require("discord.js");
const {
    colour
} =require("../../config.json");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Replies with an embed containing the avatar of a user.")
    .addUserOption(options => options
        .setName("user")
        .setDescription("The user to show avatar")
    ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */
    execute: async(interaction, client) => {
        
        const info = new EmbedBuilder()
        .setDescription("**Avatar. For URL click on the image.**")
        .setColor(colour.main)
        .setTimestamp()
        
        const User = await interaction.options.getUser("user") || interaction.user;
      
        try {
            info.setAuthor({
                name: `${User.tag}`,
                iconURL: `${User.avatarURL({dynamic: true, size: 4096})}`
            })
            .setImage(`${User.avatarURL({dynamic: true, size: 4096})}`)
  
        
            await interaction.reply({
                embeds: [info]
            });

        } catch (error) {
            console.log(error)
        };
    }
};