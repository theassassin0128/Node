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

const { loadEvents } = require("./bot/functions/handlers/events.js");
const { loadCommands } = require("./bot/functions/handlers/commands.js");
const { loadButtons } = require("./bot/functions/handlers/buttons.js");

client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

try {
	client.login(Token);
	loadEvents(client);
	loadCommands(client);
	loadButtons(client);
} catch (error) {
	console.error(error);
}
