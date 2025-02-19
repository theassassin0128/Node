const { Client, Collection } = require("discord.js");
const { Logger } = require("./Logger.js");
const { LavalinkPlayer } = require("./LavalinkPlayer.js");
const { validateSystem } = require("@src/validations");

class DiscordClient extends Client {
	/**
	 * Types for discord.js ClientOptions
	 * @param {import("discord.js").ClientOptions} options - The options for the client
	 */
	constructor(options) {
		super(options);

		// Load configuration and package information
		this.config = require("@src/config.js");
		this.pkg = require("@root/package.json");

		// Initialize the database
		this.db = require("@src/database");

		// Initialize global functions and utilities
		this.logger = new Logger();
		this.utils = require("@src/utils");
		this.helpers = require("@src/helpers");
		this.handlers = require("@src/handlers");

		/** @type {Collection<string, import("@types/index").CommandStructure>} */
		this.commands = new Collection();

		/** @type {Collection<string, Collection<string, string>>} */
		this.cooldowns = new Collection();

		// Initialize Music Manager if enabled
		if (this.config.music.enabled) this.lavalink = new LavalinkPlayer(this);
	}

	/**
	 * A function to start everything
	 * @returns {Promise<void>}
	 */
	async start() {
		console.clear();

		// Load locales
		this.helpers.loadLocales(this);

		// Load vanity and welcome message
		this.helpers.logVanity(this);

		// Check and validate the configuraton
		await validateSystem(this);

		// Load antiCrash system
		this.helpers.antiCrash(this);

		// Load events
		await this.helpers.loadEvents(this, "src/events");

		// Load commands
		await this.helpers.loadCommands(this, "src/commands");

		// Connect to the database
		await this.db.connect(this);

		// Log into the client
		await this.login(this.config.bot.token);
	}
}

module.exports = { DiscordClient };
