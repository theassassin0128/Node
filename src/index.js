//Requiring properties
const { Client, Collection, Partials } = require("discord.js");
require("dotenv").config();
const { Token } = process.env;

//Making a client property to use globally.
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

//Requiring functions
const { loadEvents } = require("./functions/handlers/events.js");
const { loadCommands } = require("./functions/handlers/commands.js");
const { loadButtons } = require("./functions/handlers/buttons.js");

//Collections to store data
client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.buttons = new Collection();

//loading the functions
loadEvents(client);
loadCommands(client);
loadButtons(client);

//Connect to your bot by using a token (provided by discord)
try {
	client.login(Token);
} catch (err) {
	console.error(err);
}
