const {
    Client,
    Collection,
    Partials,
    GatewayIntentBits,
    Events,
} = require("discord.js");
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

const { loadEvents } = require("./Functions/Handlers/events.js");

//Collections to store data
client.events = new Collection();
client.commands = new Collection();
client.aliases = new Collection();

loadEvents(client);

//Connect to your bot by using a token (provided by discord)
try {
    client.login(Token);
} catch (err) {
    console.error(err);
};