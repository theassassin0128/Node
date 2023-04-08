[![CodeQL](https://github.com/THE-ASSASSIN0128/Node/actions/workflows/codeql.yml/badge.svg?branch=master)](https://github.com/THE-ASSASSIN0128/Node/actions/workflows/codeql.yml)
[![Dependency Review](https://github.com/THE-ASSASSIN0128/Node/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/THE-ASSASSIN0128/Node/actions/workflows/dependency-review.yml)

# NODE

**Node** is a multipurpose discord Bot. Specially made for _Moderation_ & _Server-Management_. It was made with [discord.js](https://github.com/discordjs/discord.js) which is a powerful [**Node.js**](https://nodejs.org/en/) module that allows you to easily interact with the [Discord API](https://discord.com/developers/docs/intro).

## Road Map

> **Warning**. _This is a work in progress project. Feel free to contribute._

- [x] **Basic Bot**
- [ ] **Moderation Bot**
- [ ] **Chat Bot**
- [ ] **Web based Dashboard**
- [ ] **Website**

## Features

- **Multiserver Member Logging System**

## Get Started

1. Copy `.env.example` to `.env` and fill in the values as detailed below.
1. Create a [MongoDB](https://www.mongodb.com/) database and fill in `DATABASE_URL`.
1. Create a Discord application at https://discord.com/developers/applications.
1. Go to the Bot tab and click "Add Bot"
   - Click "Reset Token" and fill in `DISCORD_TOKEN`
   - Disable "Public Bot" unless you want your bot to be visible to everyone
   - Enable "Server Members Intent", "Presence Intent" and "Message Content Intent" under "Privileged Gateway Intents"
1. Go to the OAuth2 tab (General), copy your "Client ID", and fill in `BOT_ID`.
1. Install dependencies and run the bot
   ```
   npm install
   npm start
   ```
1. Now go to URL generator tab, in scopes select "bot", "application.commands" scroll down select "Administrator" permission copy the url and invite the bot to your server.
1. Start using the bot. Use `/ping` or `/botinfo` commands.

## Customization

1. If you want you can change the embed message `colours`, `devs` or some links such as `github` or `discord server invite link`.
1. To change these parametars head to `src/config.json`.
1. Change however you like.

> **Note** : use hex colour code for the colours. (example: #FF0000 means "RED")

## Commands

| Name       | description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| botinfo    | Replies with bot's stats in an embed message                           |
| clear      | Detele a specific amount of messages.                                  |
| emit       | It can be used to emit an event.                                       |
| invite     | Returns a link button with embeded invite-link.                        |
| reload     | Can be used to reload certain files without restarting the application |
| role       | Able to manage (give/remove) role of single/multiple users             |
| roleinfo   | Similar to botinfo replies with information of a server role           |
| roles      | Replies with an embed message with full list of roles (UpTo 150)       |
| serverinfo | Same as roleinfo replies with info about a discord server              |
| timeout    | Can be used to timeout a single user for a specific period of time     |
| userinfo   | Same as serverinfo replies with information of a discord user          |
| member-log | Commands to setup/delete/toggle member logging system                  |

Written above are some commands of the bot.
