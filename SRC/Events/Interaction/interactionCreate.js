const {
    EmbedBuilder,
    Client,
    ChatInputCommandInteraction,
} = require("discord.js");
const { image, colour } = require(`${process.cwd()}/SRC/config.json`);
const { version } = require(`${process.cwd()}/package.json`);

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            try {
                //Getting the command
                const command = client.commands.get(interaction.commandName);
                //Returning a message if the command isn't valid
                if (!command) {
                    interaction.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle("ERROR")
                                .setDescription(
                                    `**Sorry**, This [${interaction.commandName}] command doesn't exist. Try using /help to get help with commands.`
                                )
                                .setColor(colour.error)
                                .setThumbnail(
                                    client.user.avatarURL({
                                        dynamic: true,
                                        size: 4096,
                                    })
                                )
                                .setFooter({
                                    text: client.user.username,
                                    icomURL: client.user.avatarURL({
                                        dynamic: true,
                                        size: 4096,
                                    }),
                                })
                                .setTimestamp(),
                        ],
                    }) && client.interactions.delete(interaction.command);
                    return;
                }

                command.execute(interaction, client);
            } catch (error) {
                interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setAuthor({
                                name: "ERROR",
                                iconURL: `${image.error}`,
                            })
                            .setColor(colour.error)
                            .setDescription(
                                `There was an error while executing the command.\n**ERROR :**\n${error}`
                            ),
                    ],
                });
                console.error(error);
            }
        }
    },
};
