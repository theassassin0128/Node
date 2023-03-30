const { REST, Routes } = require("discord.js");
const { Token } = process.env;
const rest = new REST({ version: "10" }).setToken(Token);
const { bot, guilds } = require("../../config.json");
const { loadFiles } = require("../loaders/loadFiles.js");

async function loadCommands(client, dir) {
	console.time("Commands load time");

	client.commands = new Map();
	const commands = new Array();
	const commandsArray = new Array();

	const files = await loadFiles(dir);

	for (const file of files) {
		try {
			const command = require(file);

			client.commands.set(command.data.name, command);

			commands.push({
				Command: file.split("/").pop().slice(0, -3) + ".js",
				Status: "✅️",
			});
			commandsArray.push(command.data.toJSON());
		} catch (error) {
			commands.push({
				Command: file.split("/").pop().slice(0, -3),
				Status: "❌️",
			});
		}
	}

	rest.put(Routes.applicationGuildCommands(bot.id, guilds.main), {
		body: commandsArray,
	});

	console.table(commands, ["Command", "Status"]);
	console.info("\x1b[36m%s\x1b[0m", "Loaded Commands.");
	console.timeEnd("Commands load time");
}

module.exports = { loadCommands };
