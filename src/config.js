module.exports = {
	// Language settings
	language: require("./languages.js"),

	// Bot settings
	bot: {
		// Discord client ID
		id: process.env.DISCORD_CLIENT_ID,
		// Discord bot token
		token: process.env.DISCORD_CLIENT_TOKEN,
		// Discord client secret
		secret: process.env.DISCORD_CLIENT_SECRET,
		// Bot owner ID
		ownerId: process.env.OWNER_ID,
		// Bot guild ID
		guildId: process.env.GUILD_ID,
		// Bot developers ids.
		/** @type {string[]} */
		devs: process.env.DEV_IDS ? JSON.parse(process.env.DEV_IDS) : [],
		// Wheither to make the commands global or not
		global: true,
		// Whether to allow invite command or not
		allowedInvite: true,
		// Default cooldown ammount in secconds
		defaultCooldown: 3,
	},

	// Mongodb URI. Get it from mongodb.com
	mongodbUri: process.env.MONGO_URI,

	// Log channel ids
	logChannel: process.env.LOG_CHANNEL_ID,
	commandLogChannel: process.env.COMMAND_CHANNEL_ID,

	// settings and configuration to use with "table" package
	table: {
		// Set true to enable & false to disable
		sync: true,

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

	// Dashboard settings
	dashboard: {
		enabled: true,
		// Base url for the dashboard
		baseUrl: "/",
		// URL to redirect on failure
		failureUrl: "/error",
		// Port for the dashboard
		port: process.env.DASHBOARD_PORT ? Number.parseInt(process.env.PORT) : 7000,
	},

	// Settings for the economy system
	economy: {
		enabled: true,
		// Currency symbol for the economy system
		currency: "💰",
		// Daily coins reward
		dailyCoins: 100,
		// Minimum amount for begging
		minBegAmount: 10,
		// Maximum amount for begging
		maxBegAmount: 250,
	},

	// Settings for the music system
	music: {
		enabled: true,
		// Idle time in milliseconds before disconnecting
		idleTime: 180000,
		// Maximum search results to display
		maxSearchResults: 10,
		// Default player volume
		defaultVolume: 50,
		// minimum voule allowed for the player
		minVolume: 0,
		// maxiimum voule allowed for the player
		maxVolume: 150,
		/**
		 * * Default music source
		 * ? Provide one from the list below
		 * @type {import("lavalink-client").SearchPlatform}
		 */
		defaultSource: "youtube",
		/**
		 * * Available sources for use
		 * ? These are based on the lavalink/example.application.yml file
		 * ! Don't try to change this unless you know what you are doing.
		 * @type {import("lavalink-client").SearchPlatform[]}
		 */
		sources: [
			"youtube",
			"youtubemusic",
			"youtube music",
			"music youtube",
			"yt",
			"ytsearch",
			"ytm",
			"ytmsearch",
			"spotify",
			"spotify.com",
			"spotifycom",
			"sp",
			"sprec",
			"spsearch",
			"spsuggestion",
			"soundcloud",
			"sc",
			"scsearch",
			"tts",
			"flowery",
			"flowerytts",
			"flowery.tts",
			"http",
			"https",
			"link",
			"local",
			"uri",
		],
		/** * Lavalink nodes for the music system */
		lavalinkNodes: require("@root/lavalink-nodes.js"),
		/**
		 * * Emojis to use in buttons and messages of music system.
		 * ! Don't change the keys. Only change the values.
		 * ? If you want to use custome emojis just change the values with your emojis
		 */
		emojis: {
			next: "⏭️",
			pause: "⏸️",
			previous: "⏮️",
			stop: "⏹️",
			play: "▶️",
			resume: "▶️",
			loop: "🔁",
			loop2: "🔂",
			shuffle: "🔀",
			speedup: "⏩",
			slowdown: "⏪",
			queue: "📄",
			playlist: "💿",
			volumeUp: "🔊",
			volumeDown: "🔉",
			autoPlay: "🎙",
		},
	},

	// Settings for the giveaway system
	giveaways: {
		enabled: true,
		// Reaction emoji for giveaways
		reaction: "🎁",
	},

	// Settings for the image system
	fun: {
		enabled: true,
		// Base API URL for image commands
		baseApi: "https://strangeapi.fun/api",
	},

	// Settings for the moderation system
	moderation: {
		enabled: true,
		colors: {
			timeout: "#102027", // Color for timeout action
			umtimeout: "#4B636E", // Color for untimeout action
			kick: "#FF7961", // Color for kick action
			softban: "#AF4448", // Color for softban action
			ban: "#D32F2F", // Color for ban action
			unban: "#00C853", // Color for unban action
			vmute: "#102027", // Color for voice mute action
			vunmute: "#4B636E", // Color for voice unmute action
			deafen: "#102027", // Color for deafen action
			undeafen: "#4B636E", // Color for undeafen action
			disconnect: "random", // Color for disconnect action
			move: "#ffcda2", // Color for move action
		},
	},

	// Settings for the rank system
	rank: {
		enabled: true,
		xpCoolDown: 10, // Cooldown time in seconds for earning XP
		defaultLevelUpMessage: "{tag}, You just advanced to **Level {level}**", // Default message for level up
	},

	// Settings for the suggestion system
	suggestion: {
		enabled: true,
		downVote: "⬇️",
		upVote: "⬆️",
	},

	// Settings for the ticket system
	ticket: {
		enabled: true,
	},
	anime: {
		enabled: true,
		baseApi: "https://api.trace.moe",
	},
	image: {
		enabled: true,
		baseApi: "https://api.trace.moe",
	},
	automod: {
		enabled: true,
	},
	social: {
		enabled: true,
	},

	// For embeds colors. Can be used anywhere
	colors: require("./colors.json"),

	// Images to use everywhere
	images: {
		glitch:
			"https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png",
	},

	// Icons for using everywhere
	icons: {
		youtube: "https://i.imgur.com/xzVHhFY.png",
		spotify: "https://i.imgur.com/qvdqtsc.png",
		soundcloud: "https://i.imgur.com/MVnJ7mj.png",
		applemusic: "https://i.imgur.com/Wi0oyYm.png",
		deezer: "https://i.imgur.com/xyZ43FG.png",
		jiosaavn: "https://i.imgur.com/N9Nt80h.png",
	},

	// Links to use everywhere
	links: {
		botWebsite: process.env.BOT_WEBSITE,
		supportServer: process.env.SUPPORT_SERVER,
		githubRepo: "https://github.com/theassassin0128/Node#readme",
	},

	// Emojis to use with messages. Can be used everywhere.
	emojis: {
		normal: {
			error: "❌",
			check: "✔️",
			music: "🎵",
			volume: "🔉",
			ball: "🎱",
			christmas: "🎄",
			heart: "❤️",
			paper: "📰",
			scissors: "✂️",
			stone: "🪨",
			pong: "🏓",
			birthday: "🎂",
			clock: "⏰",
			gift: "🎁",
			medal: "🏅",
			party: "🎉",
			info: "ℹ️",
			arrowDown: "⬇️",
			arrowUp: "⬆️",
			dcredits: "💳",
			tv: "📺",
			slash: "",
		},
		Bot: {
			add: "📥",
			info: "ℹ️",
			min: "🔻",
		},
		economy: {
			pocket: "👛",
			bank: "🏦",
			coins: "💰",
		},
		badges: {
			bot: "🤖",
			management: "👑",
			bug: "🐛",
			developer: "👨‍💻",
			supporter: "👨‍🔧",
			team: "👨‍👩‍👧‍👦",
			booster: "🚀",
			partner: "🤝",
			voter: "🗳️",
			support: "🔧",
			moderator: "👮",
			designer: "🎨",
			active: "🔥",
			event: "🎉",
			vip: "👑",
			marketing: "📈",
		},
		animated: {
			loading: "🔄️",
		},
	},
};
