const { Message, EmbedBuilder } = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/index").EventStructure} */
module.exports = {
	name: "messageCreate",
	/**
	 * Typing for execution function
	 * @param {Message} message
	 */
	async execute(client, message) {
		if (message.author.bot) return;

		const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
		if (!message.content.match(prefixMention)) return;

		const lng = (await client.db.guilds.getGuild(message.guild))?.locale;
		const embed = new EmbedBuilder()
			.setTitle(t("embeds:mention.title", { lng }))
			.setDescription(
				t("embeds:mention.description", {
					lng,
					user: `**<@${client.user.id}>**`,
					owner: `**<@${client.config.bot.ownerId}>**`,
				}),
			)
			.setThumbnail(client.user.displayAvatarURL())
			.setColor(client.config.colors.Main)
			.setFooter({
				text: t("embeds:default.footer", {
					lng,
					username: client.user.username,
				}),
			});

		return message.reply({
			embeds: [embed],
		});
	},
};
