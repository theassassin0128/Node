const { Collection, LimitedCollection } = require("discord.js");

/**
 * @typedef {Function} CacheFactory
 * @param {Function} managerType The base manager class the cache is being requested from.
 * @param {Function} holds The class that the cache will hold.
 * @param {Function} manager The fully extended manager class the cache is being requested from.
 * @returns {Collection} A Collection used to store the cache of the manager.
 */

/**
 * Options for defining the behavior of a LimitedCollection
 * @typedef {Object} LimitedCollectionOptions
 * @property {?number} [maxSize=Infinity] The maximum size of the Collection
 * @property {?Function} [keepOverLimit=null] A function, which is passed the value and key of an entry, ran to decide
 * to keep an entry past the maximum size
 */

/**
 * Create a cache factory using predefined settings to sweep or limit.
 * @param {Object<string, LimitedCollectionOptions|number>} [settings={}] Settings passed to the relevant constructor.
 * If no setting is provided for a manager, it uses Collection.
 * If a number is provided for a manager, it uses that number as the max size for a LimitedCollection.
 * If LimitedCollectionOptions are provided for a manager, it uses those settings to form a LimitedCollection.
 * @returns {CacheFactory}
 */
function cacheWithLimits(settings = {}) {
  return (managerType, _, manager) => {
    const setting = settings[manager.name] ?? settings[managerType.name];
    if (setting == null) {
      return new Collection();
    }
    if (typeof setting === "number") {
      if (setting === Infinity) {
        return new Collection();
      }
      return new LimitedCollection({ maxSize: setting });
    }
    const noLimit = setting.maxSize == null || setting.maxSize === Infinity;
    if (noLimit) {
      return new Collection();
    }
    return new LimitedCollection(setting);
  };
}

module.exports = { cacheWithLimits };
