require("dotenv").config();
const { Token } = process.env;
const { client } = require("./src/bot.js");
const { loadEvents } = require("./src/functions/handlers/events.js");
const { loadCommands } = require("./src/functions/handlers/commands.js");
const { loadButtons } = require("./src/functions/handlers/buttons.js");

try {
	client.login(Token);
	loadEvents(client, "src/events");
	loadCommands(client, "src/commands");
	loadButtons(client, "src/components/buttons");
} catch (error) {
	console.error(error);
}
