const { REST, Routes } = require("discord.js");
const { Token } = process.env;
const rest = new REST({ version: "10" }).setToken(Token);
const { bot, guilds } = require("../../config.json");

async function loadCommands(client) {
    const { loadFiles } = require("../Loaders/loadFiles.js");
    const ascii = require("ascii-table");
    const table = new ascii("COMMANDS").setHeading("Commands", "Success");

    await client.commands.clear();

    let commands = [];
    let developerCommands = [];

    const Files = await loadFiles("SRC/Commands");

    Files.forEach((file) => {
        const command = require(file);
        client.commands.set(command.data.name, command);

        if (command.developer) {
            developerCommands.push(command.data.toJSON());
        } else {
            commands.push(command.data.toJSON());
        }

        table.addRow(command.data.name, "Success");
    });

    rest.put(Routes.applicationGuildCommands(bot.id, guilds.test), {
        body: developerCommands,
    });
    rest.put(Routes.applicationCommands(bot.id), { body: commands });

    return console.log(table.toString(), "\nCommands are loaded.");
}

module.exports = { loadCommands };
