module.exports = {
	// Dashboard settings
	dashboard: {
		enabled: true,
		baseUrl: "", // Base URL for the dashboard
		failureUrl: "", // URL to redirect on failure
		port: "3000", // Port for the dashboard
	},

	// Settings for the economy system
	economy: {
		enabled: true,
		currency: "💵", // Currency symbol for the economy system
		dailyCoins: 100, // Daily coins reward
		minBegAmount: 10, // Minimum amount for begging
		maxBegAmount: 250, // Maximum amount for begging
	},

	// Settings for the music system
	music: {
		enabled: true,
		idleTime: 180, // Idle time in seconds before disconnecting
		maxSearchResults: 10, // Maximum search results to display
		defaultSource: "yt", // Default music source
		sources: ["ytmsearch", "ytm", "ytsearch", "yt", "spotifysearch", "spotify"], // Available music sources
		// Lavalink nodes for the music system
		lavalinkNodes: [
			// locally hosted node
			{
				id: "Local Node",
				authorization: "youshallnotpass",
				host: "localhost",
				port: 6969,
				secure: false,
				requestSignalTimeoutMS: 10000,
				closeOnError: true,
				enablePingOnStatsCheck: true,
				retryDelay: 10e3,
				retryAmount: 3,
			},

			// from lavanodes
			{
				id: "Koi Node V4",
				authorization: "prplmoe.me",
				host: "lavav4.prplmoe.me",
				port: 1118,
				secure: false,
				requestSignalTimeoutMS: 10000,
				closeOnError: true,
				enablePingOnStatsCheck: true,
				retryDelay: 10e3,
				retryAmount: 3,
			},
		],
	},

	// Settings for the giveaway system
	giveaways: {
		enabled: true,
		reaction: "🎁", // Reaction emoji for giveaways
	},

	// Settings for the image system
	fun: {
		enabled: true,
		baseApi: "https://strangeapi.fun/api", // Base API URL for image commands
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
		emoji: {
			upVote: "⬆️", // Emoji for upvote
			downVote: "⬇️", // Emoji for downvote
		},
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
};
