const { User, GuildMember } = require("discord.js");

/**
 * A function to transform a requester into a standardized requester object
 * @param {User|GuildMember|object} requester The requester to transform.
 * Can be a user, a member or an object with the keys
 * `id`, `username`, `avatarURL` and `discriminator`.
 * @returns {import("@types/index").Requester} The transformed requester object.
 */
function requesterTransformer(requester) {
  if (requester instanceof User) {
    return {
      id: requester.id,
      username: requester.username,
      avatarURL: requester.avatarURL({ extension: "png" }),
      discriminator: requester.discriminator
    };
  }

  if (requester instanceof GuildMember) {
    return {
      id: requester.id,
      username: requester.displayName,
      avatarURL: requester.displayAvatarURL({ extension: "png" }),
      discriminator: requester.user.discriminator
    };
  }

  if (typeof requester === "object" && "avatarURL" in requester) {
    return requester;
  }

  return { id: requester.toString(), username: "unknown" };
}

module.exports = requesterTransformer;
