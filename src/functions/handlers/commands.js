const { REST, Routes } = require("discord.js");
const { Token } = process.env;
const rest = new REST({ version: "10" }).setToken(Token);
const { bot, guilds } = require("../../config.json");

async function loadCommands(client) {
	const { loadFiles } = require("../loaders/loadFiles.js");
	const ascii = require("ascii-table");
	const table = new ascii("COMMANDS").setHeading("files", "status");

	await client.commands.clear();

	let commands = [];
	let developerCommands = [];

	const Files = await loadFiles("src/commands");

	Files.forEach((file) => {
		const F = file.split("/");
		const command = require(file);

		client.commands.set(command.data.name, command);

		if (command.developer) {
			developerCommands.push(command.data.toJSON());
		} else {
			commands.push(command.data.toJSON());
		}

		table.addRow(F[8], "success");
	});

	rest.put(Routes.applicationGuildCommands(bot.id, guilds.test), {
		body: developerCommands,
	});
	rest.put(Routes.applicationCommands(bot.id), { body: commands });

	return console.log(table.toString());
}

module.exports = { loadCommands };
