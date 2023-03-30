const { loadFiles } = require("../loaders/loadFiles.js");

async function loadButtons(client, dir) {
	console.time("Buttons load time");

	client.buttons = new Map();
	const buttons = new Array();

	const files = await loadFiles(dir);

	for (const file of files) {
		try {
			const button = require(file);

			client.buttons.set(button.name, button);

			buttons.push({
				Button: file.split("/").pop().slice(0, -3) + ".js",
				Status: "✅️",
			});
		} catch (error) {
			buttons.push({
				Button: file.split("/").pop().slice(0, -3),
				Status: "❌️",
			});
		}
	}

	console.table(buttons, ["Button", "Status"]);
	console.info("\x1b[36m%s\x1b[0m", "Loaded Buttons.");
	console.timeEnd("Buttons load time");
}

module.exports = { loadButtons };
