const {
	ChatInputCommandInteraction,
	Client,
	SlashCommandBuilder,
	EmbedBuilder,
	version,
} = require("discord.js");
const { colour } = require("../../config.json");
const { connection } = require("mongoose");
const pkg = require("../../../package.json");
require("../../events/client/ready.js");

function rState(val) {
	var status = " ";
	switch (val) {
		case 0:
			status = `\`🔴\` Disconnected`;
			break;
		case 1:
			status = `\`🟢\` Connected`;
			break;
		case 2:
			status = `\`🟡\` Connecting`;
			break;
		case 3:
			status = `\`🟣\` Disconnecting`;
			break;
	}
	return status;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("stats")
		.setDescription("Replies with current stats of the bot."),
	/**
	 *
	 * @param { ChatInputCommandInteraction } interaction
	 * @param { Client } client
	 */
	execute: async (interaction, client) => {
		let days = Math.floor(client.uptime / 86400000);
		let hours = Math.floor(client.uptime / 3600000) % 24;
		let minutes = Math.floor(client.uptime / 60000) % 60;
		let seconds = Math.floor(client.uptime / 1000) % 60;

		const stats = new EmbedBuilder()
			.setColor(colour.main)
			.setTitle("GENERAL INFO")
			.setDescription(
				[
					`**🪧 Name :** ${client.user.username} | ${client.user}`,
					`**🏷️ Tag :** ${client.user.tag}`,
					`\**⚙️ Version :** ${pkg.version}`,
					`**👑 Owner :** THE ASSASSIN#0128`,
					`**🌐 Website :** Coming soon.`,
				].join("\n")
			)
			.setThumbnail(client.user.avatarURL({ size: 4096 }))
			.addFields(
				{
					name: "BOT INFO",
					value: [
						`**❕ Status** :  \`🟢\` Online`,
						`**🏓 Ping** : ${client.ws.ping}ms`,
						`**⏱️ Uptime** :\n\`\`\`\n${days}Days, ${hours}Hours, ${minutes}Minutes, ${seconds}Seconds\n\`\`\``,
					].join("\n"),
				},
				{
					name: "DataBase INFO",
					value: [
						`**🪧 Name :** MongoDB`,
						`**❕ Status :** ${rState(connection.readyState)}`,
					].join("\n"),
				},
				{
					name: "Language & LIBRARY INFO",
					value: [
						`**🪧 Name :** [nodejs](https://nodejs.org/en/)`,
						`📚 **Library :** [discord.js](https://discord.js.org/#/) | V•${version}`,
					].join("\n"),
				}
			);

		interaction.reply({
			embeds: [stats],
		});
	},
};
