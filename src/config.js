module.exports = {
	// Basic settings
	defaultLocale: process.env.DEFAULT_LOCALE, // Default locale for the bot
	timeFormat: process.env.TIME_FORMAT, // Time format for the bot to use

	// Bot settings
	bot: {
		allowedInvite: true, // Whether to allow invite command or not
		status: "online", // Bot status example: online, idle, dnd, invisible
		id: process.env.DISCORD_CLIENT_ID, // Discord client ID
		ownerId: process.env.OWNER_ID, // Bot owner ID
		guildId: process.env.SERVER_ID, // Bot guild ID
		devs: ["720186844540567583"], // Bot developers. Add discord user IDs
		token: process.env.DISCORD_CLIENT_TOKEN, // Discord bot token
		secret: process.env.DISCORD_CLIENT_SECRET, // Discord client secret
	},

	// DataBase secrect
	mongodbUri: process.env.MONGO_URI, // Mongodb URI. Get it from mongodb.com

	// Spotify secrets
	spotify: {
		id: process.env.SPOTIFY_CLIENT_ID, // Spotify client ID
		secret: process.env.SPOTIFY_CLIENT_SECRET, // Spotify client secret
	},

	// Command settings
	command: {
		// Default settings for all commands
		cooldown: 3, // In seconds
		global: true, // Whether to enable globally or not

		// Set true to enable & false to disable
		enabled: {
			context: true, // Enables Context menu commands
			buttons: true, // Enables Buttons
			modals: true, // Enables Modals
		},
	},

	// settings and configuration to use with "table" package
	table: {
		// Set true to enable & false to disable
		enabled: {
			sync: true,
			event: false,
			command: false,
		},

		// Table border styles. Change it as you like.
		// For more info: https://www.npmjs.com/package/table
		border: {
			topBody: `─`,
			topJoin: `┬`,
			topLeft: `┌`,
			topRight: `┐`,
			bottomBody: `─`,
			bottomJoin: `┴`,
			bottomLeft: `└`,
			bottomRight: `┘`,
			bodyLeft: `│`,
			bodyRight: `│`,
			bodyJoin: `│`,
			joinBody: `─`,
			joinLeft: `├`,
			joinRight: `┤`,
			joinJoin: `┼`,
		},
	},

	// Emojis for messages. Can be used anywhere
	emojis: require("./emojis.js"),

	// Links to use anywhere
	links: {
		website: "https://theassassin0128.github.io/Node",
		invite: "https://discord.com/oauth2/authorize?client_id=1030698369435320350",
		server: "https://discord.gg/E6H9VvBdTk",
		github: "https://github.com/theassassin0128/Node#readme",
	},

	// Media files for using in messages and embeds
	media: {
		// Images for using with embeds and messages
		images: {
			glitch:
				"https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png",
		},
	},

	// Cache size for the bot
	cache_size: {
		guilds: 100,
		users: 10000,
		members: 10000,
	},

	// Icons for using in embeds with music system
	icons: {
		youtube: "https://i.imgur.com/xzVHhFY.png",
		spotify: "https://i.imgur.com/qvdqtsc.png",
		soundcloud: "https://i.imgur.com/MVnJ7mj.png",
		applemusic: "https://i.imgur.com/Wi0oyYm.png",
		deezer: "https://i.imgur.com/xyZ43FG.png",
		jiosaavn: "https://i.imgur.com/N9Nt80h.png",
	},

	// For embeds colors. Can be used anywhere
	colors: require("./colors.json"),

	// For all categories
	categories: require("./categories.js"),

	// Config for all plugins
	plugins: require("./plugins.js"),
};
