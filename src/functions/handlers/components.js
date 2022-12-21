const { loadFiles } = require("../loaders/loadFiles.js");

async function loadComponents(client) {
	await client.buttons.clear();
	const Files = await loadFiles("src/components/buttons");
	Files.forEach((file) => {
		const button = require(file);
		client.buttons.set(button.name, button);
	});

	await client.modals.clear();
	const modalFiles = await loadFiles("src/components/modals");
	modalFiles.forEach((file) => {
		const modal = require(file);
		client.modals.set(modal.name, modal);
	});

	await client.selectMenus.clear();
	const menuFiles = await loadFiles("src/components/selectMenus");
	menuFiles.forEach((file) => {
		const selectMenu = require(file);
		client.selectMenus.set(selectMenu.name, selectMenu);
	});

	return console.log("loaded component files");
}

module.exports = { loadComponents };
