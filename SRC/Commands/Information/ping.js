const {
    SlashCommandBuilder,
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
} = require("discord.js");
const { author, version } = require(`${process.cwd()}/package.json`);
const ms = require("ms");
const { colour, owner, image } = require("../../config.json");

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with pong! & WS Latency"),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute: async (interaction, client) => {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let webLatency = new Date() - interaction.createdAt;
        let apiLatency = client.ws.ping;

        let emLatency = {
            Green: "🟢",
            Yellow: "🟡",
            Red: "🔴",
        };

        let latancy = new EmbedBuilder()
            .setColor(colour.main)
            .setTitle(`Latency And API Ping`)
            .addFields(
                {
                    name: "📡 Websocket Latency",
                    value: `\`${
                        webLatency <= 200
                            ? emLatency.Green
                            : webLatency <= 400
                            ? emLatency.Yellow
                            : emLatency.Red
                    }\` \`${webLatency}\`ms`,
                },
                {
                    name: "🛰 API Latency",
                    value: `\`${
                        apiLatency <= 200
                            ? emLatency.Green
                            : apiLatency <= 400
                            ? emLatency.Yellow
                            : emLatency.Red
                    }\` \`${apiLatency}\`ms`,
                },
                {
                    name: "⏲ Uptime",
                    value: `\`${days}Days\` : \`${hours}Hrs\` : \`${minutes}Mins\` : \`${seconds}Secs\``,
                }
            )
            .setFooter({
                text: `${client.user.username} • v${version}`,
                iconURL: `${client.user.avatarURL({
                    dynamic: true,
                    size: 4096,
                })}`,
            })
            .setTimestamp();

        interaction.reply({
            embeds: [latancy],
        });
    },
};
