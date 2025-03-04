const config = require("@src/config");

/**
 * Checks if a string contains a URL
 * @param {string} text - the text to check
 * @returns {boolean}
 * @example client.utils.containsLink(text);
 */
function containsLink(text) {
  return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
    text
  );
}

/**
 * Checks if a string is a valid discord invite
 * @param {string} text - the text to check
 * @returns {boolean}
 * @example client.utils.containsDiscordInvite(text);
 */
function containsDiscordInvite(text) {
  return /(https?:\/\/)?(www.)?(discord.(gg|io|me|li|link|plus)|discorda?p?p?.com\/invite|invite.gg|dsc.gg|urlcord.cf)\/[^\s/]+?(?=\b)/.test(
    text
  );
}

/**
 * Checks if a string is a valid Hex color
 * @param {string} text
 * @returns {boolean}
 * @example client.utils.isHex(text);
 */
function isHex(text) {
  return /^#[0-9A-F]{6}$/i.test(text);
}

/**
 * Checks if a string is a valid color
 * @param {string} text
 * @return {boolean}
 * @example client.utils.isValidColor(text);
 */
function isValidColor(text) {
  return config.colors.includes(text);
}

/**
 * Converts duration to milliseconds
 * @param {string} duration
 * @returns {number}
 * @example client.utils.durationToMillis(duration);
 */
function durationToMillis(duration) {
  return (
    duration
      .split(":")
      .map(Number)
      .reduce((acc, curr) => curr + acc * 60) * 1000
  );
}

/**
 * Returns time in days, hours, minutes, seconds
 * @param {number} timeInMillis
 * @returns {string}
 * @example client.utils.timeFormat(timeInMillis);
 */
function timeFormat(timeInMillis) {
  const d = Math.floor(timeInMillis / 86400000);
  const h = Math.floor(timeInMillis / 3600000) % 24;
  const m = Math.floor(timeInMillis / 60000) % 60;
  const s = Math.floor(timeInMillis / 1000) % 60;
  const string = [
    d > 0 ? `${d}d,` : "",
    h > 0 ? `${h}h,` : "",
    m > 0 ? `${m}m,` : "",
    `${s}s`
  ].join(" ");
  return string;
}

/**
 * Takes a single or array of permissions and returns a formatted string
 * @param {import("discord.js").PermissionResolvable[]} p
 * @returns {string}
 * @example client.utils.parsePermissions(permissions);
 */
function parsePermissions(p) {
  const word = ` permission${p.length > 1 ? "s" : ""}`;
  return `${p.map((perm) => `\`${perm}\``).join(", ")}${word}`;
}

/**
 * Returns a random number below a max
 * @param {number} max
 * @returns {string}
 * @example client.utils.getRandomInt(max);
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

/**
 * Return a random color from colors.json
 * @return {string}
 * @example client.utils.getRandomColor();
 */
function getRandomColor() {
  const colorsArray = Object.values(config.colors);
  return colorsArray[Math.floor(Math.random() * colorsArray.length)];
}

/**
 * Returns remaining time in millisecons until provided date
 * @param {Date} timeUntil
 * @returns {string}
 * @example client.utils.getRemainingTime(timeUntil);
 */
function getRemainingTime(timeUntil) {
  const seconds = Math.abs((timeUntil - new Date()) / 1000);
  return this.timeFormat(seconds * 1000);
}

/**
 * A function to get a users badge emojis
 * @deprecated requires manual work. You have to manually set emojis for each badge
 * @param {string[]} badges - user or member badge names
 * @returns {string[]} an array of emojis for the provided badge names
 * @example client.utils.getBadges(client.user.falgs.toArray())
 */
function getBadges(badges) {
  if (!badges.length) return ["x"];
  return badges.map((badge) => config.emojis.custom[badge] || badge);
}

/**
 * Returns hour difference between two dates
 * @param {Date} date1
 * @param {Date} date2
 * @example client.utils.diffHours(Date1, Date2);
 */
function diffHours(date1, date2) {
  const diff = (date1.getTime() - date2.getTime()) / 1000 / 60 / 60;
  return Math.abs(Math.round(diff));
}

module.exports = {
  diffHours,
  containsLink,
  containsDiscordInvite,
  isHex,
  isValidColor,
  timeFormat,
  parsePermissions,
  durationToMillis,
  getRandomInt,
  getRandomColor,
  getRemainingTime,
  getBadges
};
