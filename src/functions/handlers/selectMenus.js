async function loadSelectMenus(client) {
	const { loadFiles } = require("../loaders/loadFiles.js");
	const ascii = require("ascii-table");
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

module.exports = { loadSelectMenus };
