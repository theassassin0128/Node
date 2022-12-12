const { loadFiles } = require("../loaders/loadFiles.js");
const ascii = require("ascii-table");

async function loadButtons(client) {
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

async function loadSelectMenus(client) {
	const table = new ascii("SELECT MENUS").setHeading("files", "status");

	await client.selectMenus.clear();

	const Files = await loadFiles("src/components/selectMenus");

	Files.forEach((file) => {
		const F = file.split("/");
		const selectMenu = require(file);

		client.selectMenus.set(selectMenu.name, selectMenu);

		table.addRow(F[8], "success");
	});

	return console.log(table.toString());
}

async function loadModals(client) {
	const table = new ascii("BUTTONS").setHeading("files", "status");

	await client.modals.clear();

	const Files = await loadFiles("src/components/modals");

	Files.forEach((file) => {
		const F = file.split("/");
		const modal = require(file);

		client.modals.set(modal.name, modal);

		table.addRow(F[8], "success");
	});

	return console.log(table.toString());
}

module.exports = { loadButtons, loadSelectMenus, loadModals };
