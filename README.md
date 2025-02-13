# 🚀 Node - Multipurpose Discord Bot

[![Version][version-shield]][version-shield-link]
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Support Server][support-shield]][support-server]
[![MIT License][license-shield]][license-url]
[![CodeQL][codeql]][codeql-url]
[![Dependency Review][dependency-review]][dependency-review-url]
[![CodeFactor][code-factor]][code-factor-url]

## 🌟 Introduction

[![Invite Node](./public/assets/profile.png)](https://discord.com/oauth2/authorize?client_id=1030698369435320350)

**Node** is a multipurpose Discord bot, specially made for **Moderation** & **Server-Management**. It is built with [discord.js](https://github.com/discordjs/discord.js), a powerful [Node.js](https://nodejs.org) module that allows you to easily interact with the [Discord API](https://discord.com/developers/docs/intro).

[✉️ Invite Node](https://discord.com/oauth2/authorize?client_id=1030698369435320350) • [🆘 Support Server](https://discord.gg/E6H9VvBdTk) • [📝 Bug & Request Feature](https://github.com/theassassin0128/Node/issues)

## 📊 Road Map

- [x] **Basic Bot**
- [x] **Website** _(basic)_
- [x] **Music Bot** _(basic)_
- [x] **Moderation** _(basic)_
- [x] **Advanced Bot**
- [ ] **Dashboard**
- [ ] **Documentation**

## 💡 Features

- **Advanced Logger**
- **Moderation Tools**
- **Music Streaming**
- **Server Management**
- **High Customization**
- **Multi-Language Support**
- **Predefined Types**
- **Event & Permission Validation**
- **Templates for Events, Commands & Contexts**

## ❗❗ Prerequisites

Before you get started, you need to have the following:

- [![Node.JS](https://img.shields.io/badge/Node.js_V18%2B-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/download/)
- [![Discord.JS](https://img.shields.io/badge/Discord.JS_V14%2B-7289DA?style=for-the-badge&logo=discord&logoColor=white)](https://discord.js.org/)
- [![Lavalink](https://img.shields.io/badge/Lavalink_V4%2B-fa6f18?style=for-the-badge)](https://github.com/lavalink-devs/lavalink)
- [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/try/download/community)

## 🚀 Get Started

1. First clone the [repository](https://github.com/theassassin0128/Node.git) or download a stable version from [releases](https://github.com/theassassin0128/Node/releases)
1. Copy `example.lavalink-nodes.json` to `lavalink-nodes.json`

   - Host your own local lavalink node or provide one.
   - For help head to https://lavalink.dev

1. Copy `.env.example` to `.env` and fill in the values as detailed below.
1. Create a [MongoDB](https://www.mongodb.com/) database and fill in `MONGO_URI`.
1. Create a Discord application at https://discord.com/developers/applications.
1. Go to the Bot tab and click "Add Bot"

   - Click "Reset Token" and fill in `DISCORD_CLIENT_TOKEN`
   - Disable "Public Bot" unless you want your bot to be visible to everyone
   - Enable "Server Members Intent", "Presence Intent" and "Message Content Intent" under "Privileged Gateway Intents"

1. Go to the OAuth2 tab (General), copy your "Client ID", and fill in `DISCORD_CLIENT_ID`.
1. Install dependencies and run the bot
   ```bash
   npm install # install required packages
   npm start   # start your bot
   npm run dev # if you want to run in dev mode
   ```
1. Now go to the URL generator tab, in scopes select "bot", "application.commands" scroll down select "Administrator" permission, copy the URL, open the URL and invite the bot to your server.
1. Start using the bot. Use `/ping` or `/botinfo` commands.

## 📜 Commands

| Name       | Description                                                    |
| ---------- | -------------------------------------------------------------- |
| botinfo    | Replies with bot's stats                                       |
| invite     | Returns a link button with embedded invite-link.               |
| roleinfo   | Similar to botinfo, replies with information of a server role  |
| roles      | Replies with an embed message with a full list of server roles |
| serverinfo | Same as roleinfo, replies with info about a Discord server     |
| memberinfo | Same as serverinfo, replies with information of a Discord user |

These are some public commands of the bot.

## 🤝 Contributing

Contributions are welcome! Please check the [issues page](https://github.com/theassassin0128/Node/issues) for open issues and feature requests.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

[version-shield]: https://img.shields.io/github/package-json/v/theassassin0128/Node?style=for-the-badge
[version-shield-link]: https://github.com/theassassin0128/Node
[contributors-shield]: https://img.shields.io/github/contributors/theassassin0128/Node?style=for-the-badge
[contributors-url]: https://github.com/theassassin0128/Node/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/theassassin0128/Node?style=for-the-badge
[forks-url]: https://github.com/theassassin0128/Node/network/members
[stars-shield]: https://img.shields.io/github/stars/theassassin0128/Node?style=for-the-badge
[stars-url]: https://github.com/theassassin0128/Node/stargazers
[issues-shield]: https://img.shields.io/github/issues/theassassin0128/Node?style=for-the-badge
[issues-url]: https://github.com/theassassin0128/Node/issues
[support-shield]: https://img.shields.io/discord/1054284394791178291?logo=discord&colorB=7289DA&style=for-the-badge
[support-server]: https://discord.gg/E6H9VvBdTk
[license-shield]: https://img.shields.io/github/license/theassassin0128/Node?style=for-the-badge
[license-url]: https://github.com/theassassin0128/Node/blob/master/LICENSE
[codeql]: https://img.shields.io/github/actions/workflow/status/theassassin0128/Node/codeql.yml?style=for-the-badge&logo=github&label=Codeql
[codeql-url]: https://github.com/theassassin0128/Node/actions/workflows/codeql.yml
[dependency-review]: https://img.shields.io/github/actions/workflow/status/theassassin0128/Node/dependency-review.yml?style=for-the-badge&label=Dependency%20Review&logo=github
[dependency-review-url]: https://github.com/theassassin0128/Node/actions?query=workflow%3A%22Dependency+Review%22
[code-factor]: https://img.shields.io/codefactor/grade/github/theassassin0128/node?logo=codefactor&logoColor=%23F44A6A&style=for-the-badge
[code-factor-url]: https://www.codefactor.io/repository/github/theassassin0128/node
