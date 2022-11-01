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

        console.log(`Ready! Logged in as ${client.user.tag}`);
        if (!DataBase) return;
        try {
            connect(DataBase, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        } catch (error) {
            console.error(error);
        }
    },
};
