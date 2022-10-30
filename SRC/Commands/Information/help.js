const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
} = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription(
            "Replies with an embed containing commands & their uses"
        )
        .addStringOption((options) =>
            options.setName("command").setDescription("The Command")
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: async (interaction, client) => {
        const cmd = interaction.options.getString("command");

        const hEmbed = new EmbedBuilder()
            .setTitle("Welcome to *Node* World")
            .setDescription(
                `Here is a list of Commands you can use\n\n${client.commands
                    .map((c) => c.data.name)
                    .join("\n")}`
            )
            .setColor(colour.main);

        interaction.reply({
            embeds: [hEmbed],
        });
    },
};
