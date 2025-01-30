const { Client, Collection } = require("discord.js");
const { Functions } = require("./Functions.js");
const { LavalinkPlayer } = require("./LavalinkPlayer.js");
const { DB } = require("@db/DB.js");
const { Logger } = require("./Logger.js");

class DiscordClient extends Client {
	/**
	 * Typing for discord.js ClientOptions
	 * @param {import("discord.js").ClientOptions} options - The options for the client
	 */
	constructor(options) {
		super(options);

		// Load configuration and package information
		this.config = require("@src/config.js");
		this.pkg = require("@root/package.json");

		// Initialize the database
		this.db = new DB(this);

		// Initialize global functions and utilities
		this.wait = require("timers/promises").setTimeout;
		this.utils = require("@utils/index.js");
		this.helpers = require("@helpers/index.js");
		this.logger = new Logger(this);
		this.functions = new Functions(this);

		// Initialize client collections with types
		/** @type {Collection<string, import("@types/event.js").EventStructure>} */
		this.events = new Collection();

		/** @type {Collection<string, import("@types/command.js").CommandStructure>} */
		this.commands = new Collection();

		// Initialize Music Manager if enabled
		if (this.config.plugins.music.enabled) {
			this.lavalink = new LavalinkPlayer(this);
		}
	}

	/** a function to start everything
	 * @returns {Promise<void>}
	 */
	async start() {
		console.clear();

		// Load the helpers modules
		this.helpers.antiCrash(this); // Load antiCrash system
		this.helpers.loadLocales(this); // Load locales
		this.helpers.logVanity(this); // Log the vanity
		await this.helpers.loadEvents(this, "src/events"); // Load event modules
		await this.helpers.loadCommands(this, "src/commands"); // Load command modules

		// Connect to the database
		await this.db.init();

		// Log into the client
		await this.login(this.config.secrets.discord.token);
	}
};

module.exports = { DiscordClient };
