require("dotenv").config(); // Load environment variables from .env file
require("module-alias/register"); // Register module aliases

const { GatewayIntentBits, Partials } = require("discord.js");
const { Bot } = require("@lib/Bot.js");

// Initializing the client with necessary intents and partials
const client = new Bot({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildExpressions,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
    Partials.User,
    Partials.GuildScheduledEvent,
    Partials.ThreadMember
  ],
  allowedMentions: {
    parse: ["users", "roles", "everyone"],
    repliedUser: false
  },
  failIfNotExists: true
});

/**
 * A function to start everything
 * @returns {Promise<void>}
 */
async function start() {
  console.clear();

  // Load welcome message
  client.helpers.loadWelcome();

  // Load anticrash system
  client.helpers.antiCrash();

  // Check and validate the configuraton
  client.utils.validate();

  // Load languages
  await client.helpers.loadLanguages();

  // Load events
  await client.helpers.loadEvents("src/events");

  // Load commands
  await client.helpers.loadCommands("src/commands");

  // Connect to the database
  await client.db.connect();

  // Log into the client
  client.login(client.config.bot.token);
}

// Start the bot and handle any errors
start().catch((error) => {
  throw error;
});

// Exporting the client for other use
module.exports = { client };
