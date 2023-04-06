const { REST, Routes } = require("discord.js");
const { DISCORD_TOKEN, BOT_ID, GUILD_TEST } = process.env;
const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
const { loadFiles } = require("../loaders/loadFiles.js");

async function loadCommands(client) {
	console.time("Commands load time");

	client.commands = new Map();
	const commands = new Array();
	const commandsArray = new Array();
	const devCommandsArray = new Array();

	const files = await loadFiles("src/commands");

	for (const file of files) {
		try {
			const command = require(file);

			client.commands.set(command.data.name, command);

			commands.push({
				Command: file.split("/").pop().slice(0, -3) + ".js",
				Status: "✅️",
			});

			if (command.dev == true)
				devCommandsArray.push(command.data.toJSON());
			else commandsArray.push(command.data.toJSON());
		} catch (error) {
			console.error(error);
			commands.push({
				Command: file.split("/").pop().slice(0, -3),
				Status: "❌️",
			});
		}
	}

	rest.put(Routes.applicationGuildCommands(BOT_ID, GUILD_TEST), {
		body: devCommandsArray,
	});
	rest.put(Routes.applicationCommands(BOT_ID), {
		body: commandsArray,
	});

	console.table(commands, ["Command", "Status"]);
	console.info("\x1b[36m%s\x1b[0m", "Loaded Commands.");
	console.timeEnd("Commands load time");
}

module.exports = { loadCommands };
