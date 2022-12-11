async function loadButtons(client) {
	const { loadFiles } = require("../loaders/loadFiles.js");
	const ascii = require("ascii-table");
	const table = new ascii("BUTTONS").setHeading("files", "status");

	await client.buttons.clear();

	const Files = await loadFiles("src/components/buttons");

	Files.forEach((file) => {
		const F = file.split("/");
		const button = require(file);

		client.buttons.set(button.name, button);

		table.addRow(F[8], "success");
	});

	return console.log(table.toString());
}

module.exports = { loadButtons };
