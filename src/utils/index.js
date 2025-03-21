const { Buttons } = require("./Buttons.js");
const { Invites } = require("./Invites.js");
const { generateInvite } = require("./generateInvite.js");
const { sendError } = require("./sendError.js");
const { getCooldown } = require("./getCooldown.js");
const { validateSystem } = require("./validateSystem.js");
const { getPlayerButtons } = require("./getPlayerButtons.js");

class Utils {
  constructor(client) {
    /**
     * Base Client property for this class
     * @type {import("@lib/Bot.js").Bot}
     */
    this.client = client;

    /**
     * Config property for easier access within this class
     * @type {import("@src/config.js")}
     */
    this.config = client.config;

    /**
     * A class dedicated to button related utility
     * @type {Buttons}
     */
    this.buttons = new Buttons(this);

    /**
     * A class dedicated to invite related utility
     * @type {Invites}
     */
    this.invites = new Invites(this);

    // Function to create player button row
    this.getPlayerButtons = getPlayerButtons;
  }

  /**
   * A function to validate the whole system before starting everything
   * @returns {void}
   */
  async validate() {
    validateSystem(this.client);
  }

  /**
   * A function to send errors to discord
   * @param {Error} error
   * @returns {Promise<void>}
   */
  async sendError(error) {
    await sendError(this.client, error);
  }

  /**
   * A function to set, get and delete command cooldowns
   * @param {import("@types/index").CommandStructure} command - the command object
   * @param {string} userId - the userId
   * @returns {number} expiration timestamp (in seconds)
   */
  getCooldown(command, userId) {
    return getCooldown(this.client, command, userId);
  }

  /**
   * A function to generate invite links fot the client
   * @returns {string}
   */
  getInvite() {
    return generateInvite(this.client);
  }

  /**
   * A function to add a suffix to a number
   * @param {number} number - the number to add suffix with
   * @returns {string}
   * @example client.utils.addSuffix(number)
   * output => "1st" || "2nd" || "3rd" || "20th" || "any number with suffix"
   */
  addSuffix(number) {
    if (number % 100 >= 11 && number % 100 <= 13) return number + "th";
    switch (number % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
    return number + "th";
  }

  /**
   * Checks if a string contains a URL
   * @param {string} text - the text to check
   * @returns {boolean}
   * @example client.utils.containsLink(text);
   * output => true || false
   */
  containsLink(text) {
    return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
      text
    );
  }

  /**
   * Checks if a string is a valid discord invite
   * @param {string} text - the text to check
   * @returns {boolean}
   * @example client.utils.containsDiscordInvite(text);
   * output => true || false
   */
  containsDiscordInvite(text) {
    return /(https?:\/\/)?(www.)?(discord.(gg|io|me|li|link|plus)|discorda?p?p?.com\/invite|invite.gg|dsc.gg|urlcord.cf)\/[^\s/]+?(?=\b)/.test(
      text
    );
  }

  /**
   * Returns hour difference between two dates
   * @param {Date} date1
   * @param {Date} date2
   * @example client.utils.diffHours(Date1, Date2);
   */
  diffHours(date1, date2) {
    const diff = (date1.getTime() - date2.getTime()) / 1000 / 60 / 60;
    return Math.abs(Math.round(diff));
  }

  /**
   * Converts duration to milliseconds
   * @param {string} duration
   * @returns {number}
   * @example client.utils.durationToMillis(duration);
   * output => 5348923654 || "any number"
   */
  durationToMillis(duration) {
    return (
      duration
        .split(":")
        .map(Number)
        .reduce((acc, curr) => curr + acc * 60) * 1000
    );
  }

  /**
   * A function to get a users badge emojis
   * @param {string[]} badges - user or member badge names
   * @returns {string[]}
   * @example client.utils.getBadges(client.user.falgs.toArray())
   * output => "an array of emojis for the provided badge names"
   * @deprecated requires manual work. You have to manually set emojis for each badge
   */
  getBadges(badges) {
    if (!badges.length) return ["x"];
    return badges.map((badge) => this.config.emojis.custom[badge] || badge);
  }

  /**
   * Return a random color from colors.json
   * @return {string}
   * @example client.utils.getRandomColor();
   */
  getRandomColor() {
    const colorsArray = Object.values(this.config.colors);
    return colorsArray[Math.floor(Math.random() * colorsArray.length)];
  }

  /**
   * Returns a random number below a max
   * @param {number} max
   * @returns {string}
   * @example client.utils.getRandomInt(max);
   */
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  /**
   * Returns remaining time in millisecons until provided date
   * @param {Date} timeUntil
   * @returns {string}
   * @example client.utils.getRemainingTime(timeUntil);
   */
  getRemainingTime(timeUntil) {
    const seconds = Math.abs((timeUntil - new Date()) / 1000);
    return this.timeFormat(seconds * 1000);
  }

  /**
   * Checks if a string is a valid Hex color
   * @param {string} text
   * @returns {boolean}
   * @example client.utils.isHex(text);
   * output => true || false
   */
  isHex(text) {
    return /^#[0-9A-F]{6}$/i.test(text);
  }

  /**
   * Checks if a string is a valid color
   * @param {string} text
   * @return {boolean}
   * @example client.utils.isValidColor(text);
   * output => true || false
   */
  isValidColor(text) {
    return this.config.colors.includes(text);
  }

  /**
   * Takes a single or array of permissions and returns a formatted string
   * @param {import("discord.js").PermissionResolvable[]} p
   * @returns {string}
   * @example client.utils.parsePermissions(permissions);
   */
  parsePermissions(p) {
    const word = ` permission${p.length > 1 ? "s" : ""}`;
    return `${p.map((perm) => `\`${perm}\``).join(", ")}${word}`;
  }

  /**
   * Returns time in days, hours, minutes, seconds
   * @param {number} timeInMillis
   * @returns {string}
   * @example client.utils.timeFormat(timeInMillis);
   */
  timeFormat(timeInMillis) {
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
}

module.exports = { Utils };
