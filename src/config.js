const { PermissionFlagsBits } = require("discord.js");

module.exports = {
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
				prefix: true, // Enables Prefix commands
				slash: true, // Enables Slash commands
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
				event: true,
				command: true,
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
	},

	// Links to use anywhere
	links: {
		website: "https://theassassin0128.github.io/hopeless-bot",
		invite: "https://discord.com/oauth2/authorize?client_id=1030698369435320350",
		server: "https://discord.gg/E6H9VvBdTk",
		github: "https://github.com/theassassin0128/Node#readme",
	},

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
	emojis: require("./emojis.js"),
	categories: require("./categories.js"),

	// Config for all plugins
	auto_moderation: {
		enabled: true,
	},

	dashboard: {
		enabled: true,
		base_url: "",
		failure_url: "",
		port: "3000",
	},

	economy: {
		enabled: true,
		currency: "💵",
		daily_coins: 25,
		min_beg_amount: 10,
		max_beg_amount: 250,
	},

	music: {
		enabled: true,
		idle_time: 180000,
		max_search_results: 10,
		default_source: "ytm",
		sources: ["ytmsearch", "ytm", "ytsearch", "yt", "spotifysearch", "spotify"],
		lavalink_nodes: [
			// locally hosted node
			{
				authorization: "youshallnotpass",
				host: "localhost",
				port: 6969,
				id: "Local Node",
				requestSignalTimeoutMS: 10000,
				closeOnError: true,
				enablePingOnStatsCheck: true,
				retryDelay: 10e3,
				secure: false,
				retryAmount: 5,
			},
			// nodes from https://lavalinks-list.vercel.app/non-ssl
			{
				authorization: "youshallnotpass",
				host: "node.lewdhutao.my.eu.org",
				port: 80,
				id: "LewdHuTao - Lavalink",
				requestSignalTimeoutMS: 10000,
				closeOnError: true,
				enablePingOnStatsCheck: true,
				retryDelay: 10e3,
				secure: false,
				retryAmount: 5,
			},
		],
	},

	giveaways: {
		enabled: true,
		reaction: "🎁",
	},

	image: {
		enabled: true,
		base_api: "https://strangeapi.fun/api",
	},

	moderation: {
		enabled: true,
		colors: {
			timeout: "#102027",
			umtimeout: "#4B636E",
			kick: "#FF7961",
			softban: "#AF4448",
			ban: "#D32F2F",
			unban: "#00C853",
			vmute: "#102027",
			vunmute: "#4B636E",
			deafen: "#102027",
			undeafen: "#4B636E",
			disconnect: "random",
			move: "#ffcda2",
		},
	},

	rank: {
		enabled: true,
		xp_cool_down: 10,
		default_level_up_message: "{tag}, You just advanced to **Level {level}**",
	},

	suggestion: {
		enabled: true,
		emoji: {
			up_vote: "⬆️",
			down_vote: "⬇️",
		},
	},

	ticket: {
		enabled: true,
	},
};
