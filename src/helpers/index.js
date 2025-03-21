const { AntiCrash } = require("./antiCrash.js");
const { loadFiles } = require("./loadFiles.js");
const { loadEvents } = require("./loadEvents.js");
const { loadWelcome } = require("./loadWelcome.js");
const { syncCommands } = require("./syncCommands.js");
const { loadCommands } = require("./loadCommands.js");
const { loadLanguages } = require("./loadLanguages.js");
const { fetchCommands } = require("./fetchCommands.js");
const { checkForChange } = require("./checkForChange.js");

class Helpers {
  /**
   * Base client to use in this class
   * @param {import("@lib/Bot").Bot} client
   */
  constructor(client) {
    // Base Clinet
    this.client = client;
  }

  /**
   * A function to load event files from the specified directory
   * @param {string} dir - the directory to load events from
   * @returns {Promise<void>}
   */
  async loadEvents(dir) {
    await loadEvents(this.client, dir);
  }

  /**
   * A function to load event files from the specified directory
   * @param {string} dir - the directory to load events from
   * @returns {Promise<void>}
   */
  async loadCommands(dir) {
    await loadCommands(this.client, dir);
  }

  /**
   * Returns an array of files from given path filtered by provided extensions.
   * @param {string} path - path from projects root dir
   * @param {import("@types/index").FileExtensions[]|string[]} ext - extensions to filter files
   * @returns {Promise<string[]>}
   * @example const jsFiles = await loadFiles("src", [".js"]);
   * @example const commandFiles = await loadFiles("src/commands", [".js"]);
   * @example const tsFiles = await loadFiles("src/types", [".ts"]);
   * @example const assets = await loadFiles("public", [".mp4", ".mkv", ".jpeg"]);
   */
  async loadFiles(path, ext) {
    return await loadFiles(path, ext);
  }

  /**
   * A function to log Welcome Message
   * @returns {void}
   */
  loadWelcome() {
    loadWelcome();
  }

  /**
   * A function to handle crashes
   * @returns {void}
   */
  antiCrash() {
    AntiCrash(this.client);
  }

  /**
   * A function to synchronize Application Commands
   * @returns {Promise<void>}
   */
  async syncCommands() {
    await syncCommands(this.client);
  }

  /**
   * A function to handle crashes
   * @returns {Promise<void>}
   */
  async loadLanguages() {
    await loadLanguages(this.client);
  }

  /**
   * A function to fetch Application Commands
   * @returns {Promise<import("@types/index").OldCommand[]>}
   */
  async fetchCommands() {
    return await fetchCommands(this.client);
  }

  /**
   * A function to check for changes in Application Command Data
   * @param {import("@types/index").OldCommand} OldCommand
   * @param {import("@types/index").CommandStructure} NewCommand
   * @returns {boolean}
   */
  checkForChange(OldCommand, NewCommand) {
    return checkForChange(OldCommand, NewCommand);
  }
}

module.exports = { Helpers };
