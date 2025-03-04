module.exports = {
  // Event Names for validation
  Events: [
    // Discord Events from "discord.js" package
    "applicationCommandPermissionsUpdate",
    "autoModerationActionExecution",
    "autoModerationRuleCreate",
    "autoModerationRuleDelete",
    "autoModerationRuleUpdate",
    "cacheSweep",
    "channelCreate",
    "channelDelete",
    "channelPinsUpdate",
    "channelUpdate",
    "debug",
    "entitlementCreate",
    "entitlementDelete",
    "entitlementUpdate",
    "emojiCreate",
    "emojiDelete",
    "emojiUpdate",
    "error",
    "guildAuditLogEntryCreate",
    "guildAvailable",
    "guildBanAdd",
    "guildBanRemove",
    "guildCreate",
    "guildDelete",
    "guildIntegrationsUpdate",
    "guildMemberAdd",
    "guildMemberAvailable",
    "guildMemberRemove",
    "guildMembersChunk",
    "guildMemberUpdate",
    "guildScheduledEventCreate",
    "guildScheduledEventDelete",
    "guildScheduledEventUpdate",
    "guildScheduledEventUserAdd",
    "guildScheduledEventUserRemove",
    "guildUnavailable",
    "guildUpdate",
    "interactionCreate",
    "invalidated",
    "inviteCreate",
    "inviteDelete",
    "messageCreate",
    "messageDelete",
    "messageDeleteBulk",
    "messageReactionAdd",
    "messageReactionRemove",
    "messageReactionRemoveAll",
    "messageReactionRemoveEmoji",
    "messageUpdate",
    "presenceUpdate",
    "raw",
    "ready",
    "roleCreate",
    "roleDelete",
    "roleUpdate",
    "shardDisconnect",
    "shardError",
    "shardReady",
    "shardReconnecting",
    "shardResume",
    "stageInstanceCreate",
    "stageInstanceDelete",
    "stageInstanceUpdate",
    "stickerCreate",
    "stickerDelete",
    "stickerUpdate",
    "threadCreate",
    "threadDelete",
    "threadListSync",
    "threadMembersUpdate",
    "threadMemberUpdate",
    "threadUpdate",
    "typingStart",
    "userUpdate",
    "voiceServerUpdate",
    "voiceStateUpdate",
    "warn",
    "webhooksUpdate",
    "webhookUpdate",

    // Music Events from "lavalink-client" package
    "trackStart",
    "trackEnd",
    "trackStuck",
    "trackError",
    "queueEnd",
    "playerCreate",
    "playerMove",
    "playerDisconnect",
    "playerSocketClosed",
    "playerDestroy",
    "playerUpdate",
    "playerMuteChange",
    "playerDeafChange",
    "playerSuppressChange",
    "playerQueueEmptyStart",
    "playerQueueEmptyEnd",
    "playerQueueEmptyCancel",
    "playerVoiceJoin",
    "playerVoiceLeave",
    "SegmentsLoaded",
    "SegmentSkipped",
    "ChapterStarted",
    "ChaptersLoaded",
    "debug",
    "LyricsLine",
    "LyricsFound",
    "LyricsNotFound",
    "create",
    "destroy",
    "connect",
    "reconnecting",
    "reconnectinprogress",
    "disconnect",
    "error",
    "raw",
    "resumed"
  ],

  Permissions: [
    // General Guild Permissions
    "ViewChannel",
    "ManageChannels",
    "ManageRoles",
    "CreateGuildExpressions",
    "ManageGuildExpressions",
    "ViewAuditLog",
    "ViewGuildInsights",
    "ManageWebhooks",
    "ManageGuild",

    // Member Permissions
    "CreateInstantInvite",
    "ChangeNickname",
    "ManageNicknames",
    "KickMembers",
    "BanMembers",
    "ModerateMembers",

    // Text Channel Permissions
    "SendMessages",
    "SendMessagesInThreads",
    "CreatePublicThreads",
    "CreatePrivateThreads",
    "EmbedLinks",
    "AttachFiles",
    "AddReactions",
    "UseExternalEmojis",
    "UseExternalStickers",
    "MentionEveryone",
    "ManageMessages",
    "ManageThreads",
    "ReadMessageHistory",
    "SendTTSMessages",
    "SendVoiceMessages",
    "SendPolls",

    // Voice Channel Permissions
    "Connect",
    "Speak",
    "Stream",
    "UseSoundboard",
    "UseExternalSounds",
    "UseVAD",
    "PrioritySpeaker",
    "MuteMembers",
    "DeafenMembers",
    "MoveMembers",
    "SetVoiceChannelStatus",

    // App Permissions
    "UseApplicationCommands",
    "UseEmbeddedActivities",
    "UseExternalApps",

    // Stage Channel Permissions
    "RequestToSpeak",

    // Guild Event Permissions
    "CreateEvents",
    "ManageEvents",

    // Monitization Permissions
    "ViewCreatorMonetizationAnalytics",

    // Advance Permissions
    "Administrator"
  ],

  // List of languages discord supports with some extra
  Languages: [
    {
      locale: "en",
      name: "English",
      native: "English"
    },
    {
      locale: "bn",
      name: "Bengali",
      native: "বাংলা"
    },
    {
      locale: "id",
      name: "Indonesian",
      native: "Bahasa Indonesia"
    },
    { locale: "da", name: "Danish", native: "Dansk" },
    {
      locale: "de",
      name: "German",
      native: "Deutsch"
    },
    {
      locale: "en-GB",
      name: "English UK",
      native: "English UK"
    },
    {
      locale: "en-US",
      name: "English US",
      native: "English US"
    },
    {
      locale: "es-ES",
      name: "Spanish",
      native: "Español"
    },
    {
      locale: "es-419",
      name: "Spanish LATAM",
      native: "Español LATAM"
    },
    {
      locale: "fr",
      name: "French",
      native: "Français"
    },
    {
      locale: "hr",
      name: "Croatian",
      native: "Hrvatski"
    },
    {
      locale: "it",
      name: "Italian",
      native: "Italiano"
    },
    {
      locale: "lt",
      name: "Lithuanian",
      native: "Lietuviškai"
    },
    {
      locale: "hu",
      name: "Hungarian",
      native: "Magyar"
    },
    {
      locale: "nl",
      name: "Dutch",
      native: "Nederlands"
    },
    {
      locale: "no",
      name: "Norwegian",
      native: "Norsk"
    },
    {
      locale: "pl",
      name: "Polish",
      native: "Polski"
    },
    {
      locale: "pt-BR",
      name: "Portuguese Brazilian",
      native: "Português do Brasil"
    },
    {
      locale: "ro",
      name: "Romanian Romania",
      native: "Română"
    },
    {
      locale: "fi",
      name: "Finnish",
      native: "Suomi"
    },
    {
      locale: "sv-SE",
      name: "Swedish",
      native: "Svenska"
    },
    {
      locale: "vi",
      name: "Vietnamese",
      native: "Tiếng Việt"
    },
    {
      locale: "tr",
      name: "Turkish",
      native: "Türkçe"
    },
    {
      locale: "cs",
      name: "Czech",
      native: "Čeština"
    },
    {
      locale: "el",
      name: "Greek",
      native: "Ελληνικά"
    },
    {
      locale: "bg",
      name: "Bulgarian",
      native: "български"
    },
    {
      locale: "ru",
      name: "Russian",
      native: "Pусский"
    },
    {
      locale: "uk",
      name: "Ukrainian",
      native: "Українська"
    },
    {
      locale: "hi",
      name: "Hindi",
      native: "हिन्दी"
    },
    {
      locale: "th",
      name: "Thai",
      native: "ไทย"
    },
    {
      locale: "zh-CN",
      name: "Chinese, China",
      native: "中文"
    },
    {
      locale: "ja",
      name: "Japanese",
      native: "日本語"
    },
    {
      locale: "zh-TW",
      name: "Chinese, Taiwan",
      native: "繁體中文"
    },
    {
      locale: "ko",
      name: "Korean",
      native: "한국어"
    }
  ],

  // Music resources to use with the music system
  Music: {
    // List of sources
    sources: [
      "applemusic",
      "bandcamp",
      "deezer",
      "flowery-tts",
      "jiosaavn",
      "soundcloud",
      "spotify",
      "twitch",
      "yandexmusic",
      "youtube",
      "youtubemusic"
    ],
    // List of Search Platforms
    /**
     * * Available sources for use
     * ? These are based on the lavalink/example.application.yml file
     * ! Don't try to change this unless you know what you are doing.
     * @type {import("lavalink-client").SearchPlatform[]}
     */
    search: [
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
      "uri"
    ],
    /**
     * @type {import("lavalink-client").SearchPlatform[]}
     */
    searchPlatforms: [
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
      "uri"
    ]
  }
};
