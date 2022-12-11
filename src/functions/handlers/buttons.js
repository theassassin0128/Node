//Creating a function to load command files
async function loadButtons(client) {
	//Requiring properties
	const { loadFiles } = require("../loaders/loadFiles.js");
	const ascii = require("ascii-table");
	const table = new ascii("BUTTONS").setHeading("files", "status");

	//Clearing the cache to add the files again
	await client.buttons.clear();

	//Getting loadFiles function
	const Files = await loadFiles("src/components/buttons");

	//A for lop to add all files client.buttons collection
	Files.forEach((file) => {
		//Requiring properties
		const F = file.split("/"); // using this to make an array and get the file name
		const button = require(file);

		//adding files to the collection
		client.buttons.set(button.data.name, button);

		table.addRow(F[8], "success");
		//Here "F[8]" 8 can be changed to any number depending on the lenth of your file path.
		//mine is "mnt/Archive/My Projects/Node (Discord)/SRC/Commands/Fun/{files}"
	});

	//For the ascii-table to debug
	return console.log(table.toString());
}

//exporting the commands
module.exports = { loadButtons };
