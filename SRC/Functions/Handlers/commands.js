// Requiring all necessary Properties
const { REST, Routes } = require("discord.js");
const { Token } = process.env;
const rest = new REST({ version: "10" }).setToken(Token);
const { bot, guilds } = require("../../config.json");

//Creating a function to load command files
async function loadCommands(client) {
	//Requiring properties
	const { loadFiles } = require("../Loaders/loadFiles.js");
	const ascii = require("ascii-table");
	const table = new ascii("COMMANDS").setHeading("files", "status");

	//Clearing the cache to add the files again
	await client.commands.clear();

	//Empty arrays
	let commands = [];
	let developerCommands = [];

	//Getting loadFiles function
	const Files = await loadFiles("SRC/Commands");

	//A for lop to add all files client.commands collection
	Files.forEach((file) => {
		//Requiring properties
		const F = file.split("/"); // using this to make an array and get the file name
		const command = require(file);

		//adding files to the collection
		client.commands.set(command.data.name, command);

		//seperating normal & development commands
		if (command.developer) {
			developerCommands.push(command.data.toJSON());
		} else {
			commands.push(command.data.toJSON());
		}

		/* 
        //command file validation
		if (!command.data.name) {
			table.addRow(F[8], "file is missing command name.");
		}
		if (!command.data.description) {
			table.addRow(F[8], "file is missing command description.");
		}
        */ // Note this will only work if you are not using SlashCommandBuilders.

		table.addRow(F[8], "success");
		//Here "F[8]" 8 can be changed to any number depending on the lenth of your file path.
		//mine is "mnt/Archive/My Projects/Node (Discord)/SRC/Commands/Fun/{files}"
	});

	//Adding the slash commands to discord
	rest.put(Routes.applicationGuildCommands(bot.id, guilds.test), {
		body: developerCommands,
	});
	rest.put(Routes.applicationCommands(bot.id), { body: commands });

	//For the ascii-table to debug
	return console.log(table.toString());
}

//exporting the commands
module.exports = { loadCommands };
