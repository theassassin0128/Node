const { BaseManager } = require("./BaseManager.js");
const MakeCacheOverrideSymbol = Symbol("db.makeCacheOverride");

/**
 * Manages the API methods of a data model with a mutable cache of instances.
 * @extends {BaseManager}
 * @abstract
 */
class CachedManager extends BaseManager {
  constructor(manager, holds, iterable) {
    super(manager, holds);

    /**
     * The private cache of items for this manager.
     * @type {Collection}
     * @private
     * @readonly
     * @name CachedManager#_cache
     */
    this._cache = this.manager.makeCache(
      this.constructor[MakeCacheOverrideSymbol] ?? this.constructor,
      holds,
      this.constructor
    );

    if (iterable) {
      for (const item of iterable) {
        this._add(item);
      }
    }
  }

  /**
   * The cache of items for this manager.
   * @type {Collection}
   * @abstract
   */
  get cache() {
    return this._cache;
  }

  _add(data, cache = true, { id, extras = [] } = {}) {
    const existing = this.cache.get(id ?? data.id);
    if (existing) {
      if (cache) {
        existing._patch(data);
        return existing;
      }
      const clone = existing._clone();
      clone._patch(data);
      return clone;
    }

    const entry = this.holds
      ? new this.holds(this.manager, data, ...extras)
      : data;
    if (cache) this.cache.set(id ?? entry.id, entry);
    return entry;
  }
}

module.exports = { CachedManager };
