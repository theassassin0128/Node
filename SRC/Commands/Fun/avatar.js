const {
    EmbedBuilder,
    Client,
    SlashCommandBuilder,
    ChatInputCommandInteraction,
} = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription(
            "Replies with an embed containing the avatar of a user."
        )
        .addUserOption((options) =>
            options.setName("user").setDescription("The user to show avatar")
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: async (interaction, client) => {
        const User =
            (await interaction.options.getUser("user")) || interaction.user;

        const info = new EmbedBuilder()
            .setImage(`${User.avatarURL({ dynamic: true, size: 4096 })}`)
            .setColor(colour.main);

        try {
            interaction.reply({
                embeds: [info],
            });
        } catch (error) {
            console.log(error);
        }
    },
};
