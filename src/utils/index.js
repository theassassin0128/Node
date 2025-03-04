const {
  getRandomInt,
  getRandomColor,
  getRemainingTime,
  getBadges,
  containsLink,
  containsDiscordInvite,
  isHex,
  isValidColor,
  diffHours,
  durationToMillis,
  timeFormat,
  parsePermissions
} = require("./functions.js");

module.exports = {
  getRandomInt,
  getRandomColor,
  getRemainingTime,
  getBadges,
  diffHours,
  timeFormat,
  parsePermissions,
  durationToMillis,
  containsLink,
  containsDiscordInvite,
  isHex,
  isValidColor,
  sendError: require("./sendError.js"),
  getCooldown: require("./getCooldown.js"),
  generateInvite: require("./generateInvite.js"),
  validateSystem: require("./validateSystem.js"),
  createPlayerButtons: require("./createPlayerButtons.js")
};
