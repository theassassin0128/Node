/**
 * Manages the database methods.
 * @abstract
 */
class BaseManager {
  constructor(manager, holds) {
    /**
     * The database manager that instantiated this Manager
     * @type {import("@database/Manager.js").DatabaseManager}
     * @readonly
     */
    this.manager = manager;

    /**
     * The client that instantiated this Manager
     * @type {import("@lib/Bot.js").Bot}
     * @readonly
     */
    this.client = manager.client;

    /**
     * The data structure belonging to this manager.
     * @type {Function}
     * @private
     * @readonly
     */
    this.holds = holds;
  }

  /**
   * Resolves a data entry to a data Object.
   * @param {string|Object} idOrInstance The id or instance of something in this Manager
   * @returns {?Object} An instance from this Manager
   */
  resolve(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance;
    if (typeof idOrInstance === "string")
      return this.cache.get(idOrInstance) ?? null;
    return null;
  }

  /**
   * Resolves a data entry to an instance id.
   * @param {string|Object} idOrInstance The id or instance of something in this Manager
   * @returns {?Snowflake}
   */
  resolveId(idOrInstance) {
    if (idOrInstance instanceof this.holds) return idOrInstance.id;
    if (typeof idOrInstance === "string") return idOrInstance;
    return null;
  }
}

module.exports = { BaseManager };
