const ascii = require("ascii-table");
const { bot } = require(`${process.cwd()}/SRC/config.json`);
const { DataBase } = process.env;
const { connect } = require("mongoose");
const { loadCommands } = require("../../Functions/Handlers/commands.js");

module.exports = {
    name: "ready",
    once: true,
    execute: async (client) => {
        loadCommands(client);

        client.user.setPresence({
            activities: [
                {
                    type: "LISTENING",
                    name: "?help",
                },
            ],
            status: "idle",
        });

        const Table = new ascii("BOT");

        Table.addRow("tag", `${client.user.tag}`);
        Table.addRow("id", `${client.user.id}`);
        Table.addRow("prefix", `${bot.prefix}`);
        Table.addRow("guild(s)", `${client.guilds.cache.size}`);

        console.log(
            Table.toString(),
            `\nReady! Logged in as ${client.user.tag}`
        );
        if (!DataBase) return;
        try {
            connect(DataBase, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("🟢 DataBase Connected.");
        } catch (error) {
            console.error(error);
        }
    },
};
