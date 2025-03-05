/**
 * A function to set, get and delete command cooldowns
 * @param {import("@lib/Bot").Bot} client
 * @param {import("@types/index").CommandStructure} command - the command object
 * @param {string} userId - the userId
 * @returns {number} expiration timestamp (in seconds)
 */
function getCooldown(client, command, userId) {
  const timestamps = client.cooldowns.get(command.data.name);
  if (!timestamps) return 0;

  const now = Date.now();
  const { defaultCooldown } = client.config.bot;
  const cooldownAmount = (command.cooldown ?? defaultCooldown) * 1000;

  if (!timestamps.has(userId)) {
    timestamps.set(userId, now);
    setTimeout(() => timestamps.delete(userId), cooldownAmount);
    return 0;
  }

  const expirationTime = timestamps.get(userId) + cooldownAmount;
  if (now < expirationTime) return Math.floor(expirationTime / 1000);

  timestamps.set(userId, now);
  return 0;
}

module.exports = { getCooldown };
