const { Client } = require("discord.js");

class DiscordClient extends Client {
	constructor(options) {
		super(options);
	}
	start() {
		this.login(process.env.DISCORD_BOT_TOKEN);
	}
}

module.exports = { DiscordClient };
