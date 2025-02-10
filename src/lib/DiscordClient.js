const { Client, Collection } = require("discord.js");
const { Utils } = require("./Utils.js");
const { LavalinkPlayer } = require("./LavalinkPlayer.js");
const { Logger } = require("./Logger.js");

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
		this.wait = require("timers/promises").setTimeout;
		this.helpers = require("@src/helpers");
		this.handlers = require("@src/handlers");
		this.logger = new Logger();
		this.utils = new Utils(this);

		// Initialize client collections with types
		/** @type {Collection<string, import("@types/event.js").EventStructure>} */
		this.events = new Collection();

		/** @type {Collection<string, import("@types/command.js").CommandStructure>} */
		this.commands = new Collection();

		/** @type {Collection<string, Collection<string, string>>} */
		this.cooldowns = new Collection();

		// Initialize Music Manager if enabled
		if (this.config.plugins.music.enabled) this.lavalink = new LavalinkPlayer(this);
	}

	/**
	 * A function to start everything
	 * @returns {Promise<void>}
	 */
	async start() {
		console.clear();

		// Load the helper modules
		this.helpers.antiCrash(this); // Load antiCrash system
		this.helpers.loadLocales(); // Load locales
		this.helpers.logVanity(this); // Log the vanity
		await this.helpers.loadEvents(this, "src/events"); // Load event modules
		await this.helpers.loadCommands(this, "src/commands"); // Load command modules

		// Connect to the database
		await this.db.connect(this);

		// Log into the client
		await this.login(this.config.bot.token);
	}
}

module.exports = { DiscordClient };
