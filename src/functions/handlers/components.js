async function loadComponents(client) {
	const { loadFiles } = require("../loaders/loadFiles.js");
	const ascii = require("ascii-table");
	const table = new ascii("COMPONENTS").setHeading("files", "status");
	await client.buttons.clear();
	const Files = await loadFiles("src/components/buttons");

	Files.forEach((file) => {
		const button = require(file);
		client.buttons.set(button.name, button);

		table.addRow(file.split("/")[8], "success");
	});

	await client.modals.clear();
	const modalFiles = await loadFiles("src/components/modals");
	modalFiles.forEach((file) => {
		const modal = require(file);
		client.modals.set(modal.name, modal);

		table.addRow(file.split("/")[8], "success");
	});

	await client.selectMenus.clear();
	const menuFiles = await loadFiles("src/components/selectMenus");
	menuFiles.forEach((file) => {
		const selectMenu = require(file);
		client.selectMenus.set(selectMenu.name, selectMenu);

		table.addRow(file.split("/")[8], "success");
	});

	return console.log(table.toString());
}

module.exports = { loadComponents };
