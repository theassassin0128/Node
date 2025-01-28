const { Message, EmbedBuilder } = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "messageCreate",
	/**
	 * Typing for execution function
	 * @param {Message} message
	 */
	execute: async (client, message) => {
		if (message.author.bot) return;

		const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (!message.content.match(prefixMention)) return;

		const embed = new EmbedBuilder()
			.setTitle(t("embeds:prefix_mention.title"))
			.setDescription(
				t("embeds:prefix_mention.description", {
					username: client.user.username,
					owner: `<@${client.config.bot.ownerId}>`,
				}),
			)
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(client.config.colors.Main)
			.setFooter({
				text: t("embeds:default.footer", {
					u: client.user.username,
					y: new Date().getFullYear(),
				}),
			});

		return message.reply({
			embeds: [embed],
		});
	},
};
