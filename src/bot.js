const { Client, Collection, Partials } = require("discord.js");

const client = new Client({
  intents: 65471,
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

const { loadEvents } = require("./functions/handlers/events.js");
const { loadCommands } = require("./functions/handlers/commands.js");
const { loadButtons } = require("./functions/handlers/buttons.js");

try {
  loadEvents(client);
  loadCommands(client);
  loadButtons(client);
} catch (error) {
  console.error(error);
}

module.exports = { client };
