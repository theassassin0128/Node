const { loadFiles } = require("../loaders/loadFiles.js");
const ascii = require("ascii-table");
const table = new ascii("BUTTONS").setHeading("name", "status");

async function loadButtons(client) {
	await client.buttons.clear();
	const Files = await loadFiles("src/components/buttons");
	Files.forEach((file) => {
		const button = require(file);
		client.buttons.set(button.name, button);

		table.addRow(button.name, "🟢");
	});

	return console.log(table.toString());
}

module.exports = { loadButtons };
