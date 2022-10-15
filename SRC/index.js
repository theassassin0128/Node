const {
    Client,
    Collection,
    Partials
} = require("discord.js");
require("dotenv").config();
const { Token, DataBase } = process.env;
  
  
//All Functions
/*const { loadEvents } = require(`./Handlers/Events.js`);
const { loadCommands } = require(`./Handlers/Commands.js`);*/
  
  
//Making a client property to use globally.
const client = new Client({
    intents: 3276799,
    partials: [
        Partials.Channel,
        Partials.User
    ],
    allowedMentions: {
        repliedUser: false
    }
});

//Collections to store message/slash commands.
client.commands = new Collection();
client.aliases = new Collection();
  
  
//Connect to your bot by using a token (provided by discord)
try {
    client.login(Token);
} catch (error) {
    console.error(error);
};