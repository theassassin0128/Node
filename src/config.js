const { env } = require("./env.js");

module.exports = {
	// Basic settings
	defaultLocale: env.DEFAULT_LOCALE, // Default locale for the bot

	// Bot settings
	bot: {
		global: true, // Wheither to make the commands global or not
		allowedInvite: true, // Whether to allow invite command or not
		status: "online", // Bot status example: online, idle, dnd, invisible
		id: env.DISCORD_CLIENT_ID, // Discord client ID
		ownerId: env.OWNER_ID, // Bot owner ID
		guildId: env.GUILD_ID, // Bot guild ID
		devs: env.DEV_IDS, // Bot developers ids.
		token: env.DISCORD_CLIENT_TOKEN, // Discord bot token
		secret: env.DISCORD_CLIENT_SECRET, // Discord client secret
	},

	// DataBase secrect
	mongodbUri: env.MONGO_URI, // Mongodb URI. Get it from mongodb.com

	// Spotify secrets
	spotify: {
		id: env.SPOTIFY_CLIENT_ID, // Spotify client ID
		secret: env.SPOTIFY_CLIENT_SECRET, // Spotify client secret
	},

	// settings and configuration to use with "table" package
	table: {
		// Set true to enable & false to disable
		sync: true,
		event: false,
		command: false,

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

	// Media files for using in messages and embeds
	media: require("./media.js"),

	// For embeds colors. Can be used anywhere
	colors: require("./colors.json"),

	// For all categories
	categories: require("./categories.js"),

	// Config for all plugins
	plugins: require("./plugins.js"),
};
