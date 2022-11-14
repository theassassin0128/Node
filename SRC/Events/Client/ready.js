const ascii = require("ascii-table");
const { bot } = require(`${process.cwd()}/SRC/config.json`);
const { DataBase } = process.env;
const { connect } = require("mongoose");
const { Client } = require("discord.js");

module.exports = {
    name: "ready",
    once: true,
    /**
     *
     * @param {Client} client
     * @returns
     */
    execute: async (client) => {
        client.user.setPresence({
            activities: [
                {
                    type: "LISTENING",
                    name: "?help",
                },
            ],
            status: "online",
        });

        console.log(`Ready! Logged in as ${client.user.tag}`);
        if (!DataBase) return;
        try {
            connect(DataBase, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("DataBase is Connected.");
        } catch (error) {
            console.error(error);
        }
    },
};
