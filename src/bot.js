const { Client, Collection, Partials } = require("discord.js");

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

client.events = new Collection();
client.commands = new Collection();
client.buttons = new Collection();

module.exports = { client };
