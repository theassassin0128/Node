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

const { loadEvents } = require("./src/functions/handlers/events.js");
const { loadCommands } = require("./src/functions/handlers/commands.js");
const { loadButtons } = require("./src/functions/handlers/buttons.js");

client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

client
	.login(Token)
	.then(() => {
		loadEvents(client, "src/events");
		loadCommands(client, "src/commands");
		loadButtons(client, "src/components/buttons");
	})
	.catch(() => {
		console.error;
	});
