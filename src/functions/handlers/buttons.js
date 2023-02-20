const { loadFiles } = require("../loaders/loadFiles.js");
const ascii = require("ascii-table");
const table = new ascii("BUTTONS").setHeading("name", "status");

async function loadButtons(client, dir) {
	await client.buttons.clear();
	const Files = await loadFiles(dir);
	Files.forEach((file) => {
		const button = require(file);
		client.buttons.set(button.name, button);

		table.addRow(button.name, "done");
	});

	return console.log(table.toString());
}

module.exports = { loadButtons };
