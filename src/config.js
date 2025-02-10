const { env } = require("./env.js");

module.exports = {
	// Basic settings
	defaultLocale: env.DEFAULT_LOCALE, // Default locale for the bot

	// Bot settings
	bot: {
		// Discord client ID
		id: env.DISCORD_CLIENT_ID,
		// Discord bot token
		token: env.DISCORD_CLIENT_TOKEN,
		// Discord client secret
		secret: env.DISCORD_CLIENT_SECRET,
		// Bot owner ID
		ownerId: env.OWNER_ID,
		// Bot guild ID
		guildId: env.GUILD_ID,
		// Bot developers ids.
		devs: env.DEV_IDS,
		// Wheither to make the commands global or not
		global: true,
		// Whether to allow invite command or not
		allowedInvite: true,
		// Default cooldown ammount in secconds
		defaultCooldown: 3,
	},

	// DataBase secrect
	mongodbUri: env.MONGO_URI, // Mongodb URI. Get it from mongodb.com

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
