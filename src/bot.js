const { Client, Collection, Partials, IntentsBitField } = require("discord.js");

// All the required intents.
const {
  Guilds,
  GuildMembers,
  GuildEmojisAndStickers,
  GuildMessageReactions,
  GuildMessages,
  MessageContent,
  DirectMessages,
  DirectMessageReactions,
  GuildIntegrations,
  GuildModeration,
  GuildWebhooks,
  GuildVoiceStates,
  GuildPresences,
} = IntentsBitField.Flags;

// All the required Partials
const {
  User,
  Message,
  GuildMember,
  ThreadMember,
  Channel,
  Reaction,
  GuildScheduledEvent,
} = Partials;

// Creating a discord client to use globally
const client = new Client({
  intents: [
    Guilds,
    GuildMembers,
    GuildEmojisAndStickers,
    GuildMessageReactions,
    GuildMessages,
    MessageContent,
    DirectMessages,
    DirectMessageReactions,
    GuildIntegrations,
    GuildModeration,
    GuildWebhooks,
    GuildVoiceStates,
    GuildPresences,
  ],
  partials: [User, Message, GuildMember, ThreadMember, Channel, Reaction],
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
