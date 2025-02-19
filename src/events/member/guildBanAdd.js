const { GuildBan, EmbedBuilder } = require("discord.js");

/** @type {import("@types/index").EventStructure} */
module.exports = {
	name: "guildBanAdd",
	/**
	 * typings for the parameters
	 * @param {GuildBan} ban
	 */
	async execute(client, ban) {
		if (ban.user.bot) return;

		const banEmbed = new EmbedBuilder()
			.setTitle("BAN NOTICE")
			.setDescription(
				`${ban.user}, you have been banned from *${ban.guild.name}*.\n **Reason**: ${
					ban.reason ?? "None was given"
				}.`,
			)
			.setColor(client.config.colors.Wrong)
			.setThumbnail("https://i.imgur.com/ENBKVhH.png")
			.setFooter({
				text: ban.guild.name,
				iconURL: ban.guild.iconURL(),
			})
			.setTimestamp();

		return ban.user.send({ embeds: [banEmbed] }).catch();
	},
};
