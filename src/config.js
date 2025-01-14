const { PermissionFlagsBits } = require("discord.js");

module.exports = {
	image_links: {
		glitch:
			"https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png",
	},

	cache_size: {
		guilds: 100,
		users: 10000,
		members: 10000,
	},

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
	emojis: require("./emojis"),
	categories: require("./categories"),
	plugins: require("./plugins"),

	// For all secrets and tokens
	secrets: {
		// Discord bot secrets
		discord: {
			id: process.env.DISCORD_CLIENT_ID, // Discord client ID
			token: process.env.DISCORD_BOT_TOKEN, // Discord bot token
			secret: process.env.DISCORD_CLIENT_SECRET, // Discord client secret
		},

		// Spotify secrets
		spotify: {
			id: process.env.SPOTIFY_CLIENT_ID, // Spotify client ID
			secret: process.env.SPOTIFY_CLIENT_SECRET, // Spotify client secret
		},

		// Myanimelist secrets
		myanimelist: {
			id: process.env.MAL_CLIENT_ID, // Myanimelist client ID
			secret: process.env.MAL_CLIENT_SECRET, // Myanimelist client secret
		},
	},

	// For all configurations
	config: {
		// Basic settings
		defaultLocale: process.env.DEFAULT_LOCALE, // Default locale for the bot
		timeFormat: process.env.TIME_FORMAT, // Time format for the bot to use

		// Bot settings
		bot: {
			status: "online", // Bot status example: online, idle, dnd, invisible
			allowedInvite: false, // Whether to allow invite command or not
			devs: ["720186844540567583"], // Bot developers. Add discord user IDs
			prefix: process.env.DEFAULT_PREFIX, // Default prefix for the bot
			ownerId: process.env.OWNER_ID, // Bot owner ID
			guildId: process.env.SERVER_ID, // Bot guild ID
		},

		// Mongodb config
		mongoUri: process.env.MONGO_URI, // Mongodb URI. Get it from mongodb.com

		// Command settings
		command: {
			// Default settings for all commands
			cooldown: 3, // In seconds
			global: true, // Whether to enable globally or not
			devOnly: true, // Whether to enable only for developers or not
			ephemeral: true, // Whether to send ephemeral messages or not
			premium: false, // Whether to enable only for premium users or not
			permissions: {
				prefix: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ViewChannel], // Default permissions. example: ["SEND_MESSAGES"]
				slash: [
					PermissionFlagsBits.SendMessages,
					PermissionFlagsBits.ViewChannel,
					PermissionFlagsBits.UseApplicationCommands,
				], // Default permissions. example: ["SEND_MESSAGES"]
			},

			// Set true to enable & false to disable
			enabled: {
				prefix: true, // Enables Prefix command
				slash: true, // Enables Slash command
				context: true, // Enables Context command
				buttons: true, // Enables Buttons command
				modals: true, // Enables Modals command
			},
		},

		// Table settings to use with "table" package
		table: {
			// Set true to enable & false to disable
			sync: true,
			event: false,
			command: false,

			// Table border styles. Change it as you like
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
	},

	color: {
		main: "90B63E",
		failed: "FF0000",
		error: "E3C647",
		success: "2EFF00",
		standby: "000000",
		log: {
			msg: "2EFF00",
			mod: "FF0000",
			svr: "00FF00",
		},
	},

	// For all links
	links: {
		website: "https://theassassin0128.github.io/hopeless-bot",
		invite: "https://discord.com/oauth2/authorize?client_id=1030698369435320350",
		server: "https://discord.gg/E6H9VvBdTk",
		github: "https://github.com/theassassin0128/Node#readme",
	},
};
