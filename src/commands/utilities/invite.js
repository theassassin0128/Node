const {
	SlashCommandBuilder,
	ButtonBuilder,
	ActionRowBuilder,
	ButtonStyle,
	resolvePartialEmoji,
} = require("discord.js");
const { owner, url } = require("../../config.json");
module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription("returns a link button with bots invite url.")
		.setDMPermission(false),
	execute: async (interaction, client) => {
		const button = new ButtonBuilder()
			.setLabel("Invite Link")
			.setStyle(ButtonStyle.Link)
			.setURL(url.invite)
			.setEmoji(resolvePartialEmoji("✉️"));

		const AR = new ActionRowBuilder().addComponents(button);

		if (interaction.user.id === owner.id) {
			interaction.reply({
				content: "Invite me to your server by clicking the button.",
				ephemeral: true,
				components: [AR],
			});
		} else {
			interaction.reply({
				content: "Only the owner is allowed to use this command.",
			});
		}
	},
};
