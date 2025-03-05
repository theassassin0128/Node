const { OAuth2Scopes } = require("discord.js");

/**
 * A function to generate invite links fot the client
 * @param {import("@lib/Bot").Bot} client
 * @returns {string}
 */
function generateInvite(client) {
  return client.generateInvite({
    permissions: [
      "Administrator",
      "ViewAuditLog",
      "ManageGuild",
      "ManageRoles",
      "ManageChannels",
      "KickMembers",
      "BanMembers",
      "CreateInstantInvite",
      "ChangeNickname",
      "ManageNicknames",
      "ManageGuildExpressions",
      "CreateGuildExpressions",
      "ManageWebhooks",
      "ViewChannel",
      "ManageEvents",
      "CreateEvents",
      "ModerateMembers",
      "ViewGuildInsights",
      "ViewCreatorMonetizationAnalytics",
      "SendMessages",
      "CreatePublicThreads",
      "CreatePrivateThreads",
      "SendMessagesInThreads",
      "SendTTSMessages",
      "ManageMessages",
      "ManageThreads",
      "EmbedLinks",
      "AttachFiles",
      "ReadMessageHistory",
      "MentionEveryone",
      "UseExternalEmojis",
      "UseExternalStickers",
      "AddReactions",
      "UseApplicationCommands",
      "UseEmbeddedActivities",
      "UseExternalApps",
      "SendPolls",
      "Connect",
      "Speak",
      "Stream",
      "MuteMembers",
      "DeafenMembers",
      "MoveMembers",
      "UseVAD",
      "PrioritySpeaker",
      "RequestToSpeak",
      "UseSoundboard",
      "UseExternalSounds",
      "SendVoiceMessages"
    ],
    scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands]
  });
}

module.exports = { generateInvite };
