const { Client, Collection, Partials } = require("discord.js");
require("dotenv").config();
const { Token, DataBase } = process.env;

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

const { loadConfig } = require("./functions/loaders/loadConfig.js");
const { loadEvents } = require("./functions/handlers/events.js");
const { loadCommands } = require("./functions/handlers/commands.js");
const { connectDB } = require("./database/config/connect.js");
const { loadButtons } = require("./functions/handlers/buttons.js");

client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();
client.buttons = new Collection();
client.guildConfig = new Collection();

try {
	client.login(Token);
	connectDB(DataBase);
	loadConfig(client);
	loadEvents(client);
	loadCommands(client);
} catch (error) {
	console.error(error);
}
try {
	client.login(Token);
	connectDB(DataBase);
	loadCommands(client);
	loadButtons(client);
	loadEvents(client);
	loadConfig(client);
} catch (error) {
	console.error(error);
}
