const {
	ChatInputCommandInteraction,
	Client,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");
const { url } = require("../../config.json");

module.exports = {
	name: "test",
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const invite = new ButtonBuilder()
			.setLabel("Click Me!")
			.setStyle(ButtonStyle.Link);
		interaction.reply({
			content: `[Click Me!](${url.invite})`,
		});
	},
};
