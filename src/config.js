const { readdirSync, lstatSync } = require("fs");
const { join } = require("path");

module.exports = {
  // Default languages for the bot
  defaultLanguage: process.env.DEFAULT_LANGUAGE,
  // Available languages for the bot
  availableLanguages: readdirSync(join(__dirname, "locales")).filter((file) => {
    const isDirectory = lstatSync(
      join(__dirname, "locales", file)
    ).isDirectory();
    const langFiles = readdirSync(join(__dirname, "locales", file));

    if (isDirectory && langFiles.length > 0) return true;
  }),

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
    // Syncronization logs
    showSyncLogs: true
  },

  // Mongodb URI. Get it from mongodb.com
  mongodbUri: process.env.MONGO_URI,

  // Log channel ids
  logChannel: process.env.LOG_CHANNEL_ID,
  commandLogChannel: process.env.COMMAND_CHANNEL_ID,

  // Dashboard settings
  dashboard: {
    enabled: true,
    // Base url for the dashboard
    baseUrl: "/",
    // URL to redirect on failure
    failureUrl: "/error",
    // Port for the dashboard
    port: process.env.DASHBOARD_PORT ?? 3000
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
    // maxiimum volume allowed for the player
    maxVolume: 100,
    /**
     * Default source for the music system
     * @type {import("lavalink-client").SearchPlatform}
     */
    defaultSearchPlatform: "yt",
    // Lavalink nodes for the music system
    lavalinkNodes: require("@root/lavalink-nodes.js")
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
    maxBegAmount: 250
  },

  // Settings for the giveaway system
  giveaways: {
    enabled: true,
    // Reaction emoji for giveaways
    reaction: "🎁"
  },

  // Settings for the image system
  fun: {
    enabled: true,
    // Base API URL for image commands
    baseApi: "https://strangeapi.fun/api"
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
      move: "#ffcda2" // Color for move action
    }
  },

  // Settings for the rank system
  level: {
    enabled: true,
    // Cooldown time in seconds for earning XP
    xpCoolDown: 10,
    // Default message for level up
    defaultMessage: "{tag}, You just advanced to **Level {level}**"
  },

  // Settings for the suggestion system
  suggestion: {
    enabled: true,
    downVote: "⬇️",
    upVote: "⬆️"
  },

  // Settings for the ticket system
  ticket: {
    enabled: true
  },

  anime: {
    enabled: true,
    baseApi: "https://api.trace.moe"
  },

  image: {
    enabled: true,
    baseApi: "https://api.trace.moe"
  },

  automod: {
    enabled: true
  },

  social: {
    enabled: true
  },

  // For embeds colors. Can be used anywhere
  colors: require("./colors.json"),

  // Emojis to use with messages. Can be used everywhere.
  emojis: require("./emojis.js"),

  // Resources to use for various perposes
  resources: require("./resources.js"),

  // Images to use everywhere
  images: {
    glitch:
      "https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_960_720.png"
  },

  // Icons for using everywhere
  icons: {
    youtube: "https://i.imgur.com/xzVHhFY.png",
    spotify: "https://i.imgur.com/qvdqtsc.png",
    soundcloud: "https://i.imgur.com/MVnJ7mj.png",
    applemusic: "https://i.imgur.com/Wi0oyYm.png",
    deezer: "https://i.imgur.com/xyZ43FG.png",
    jiosaavn: "https://i.imgur.com/N9Nt80h.png"
  },

  // Links to use everywhere
  links: {
    botWebsite: process.env.BOT_WEBSITE,
    supportServer: process.env.SUPPORT_SERVER,
    githubRepo: "https://github.com/theassassin0128/Node#readme"
  }
};
