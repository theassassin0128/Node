const { Client, Collection, Partials } = require("discord.js");
require("dotenv").config();
const { Token } = process.env;

const client = new Client({
	intents: 3276799,
	partials: [
		Partials.User,
		Partials.Message,
		Partials.GuildMember,
		Partials.ThreadMember,
	],
	allowedMentions: {
		repliedUser: false,
	},
});

const { loadEvents } = require("./functions/handlers/events.js");
const { loadCommands } = require("./functions/handlers/commands.js");
const { loadButtons } = require("./functions/handlers/buttons.js");

client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.buttons = new Collection();

loadEvents(client);
loadCommands(client);
loadButtons(client);

try {
	client.login(Token);
} catch (err) {
	console.error(err);
}
