const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("roles")
		.setDescription("Get the role list of a server."),
	usage: "",
	category: "information",
	cooldown: 25,
	global: true,
	premium: false,
	devOnly: false,
	disabled: false,
	voiceChannelOnly: false,
	botPermissions: ["SendMessages", "ReadMessageHistory"],
	userPermissions: ["SendMessages"],
	async execute(client, interaction, lng) {
		const roles = interaction.guild.roles.cache
			.sort((a, b) => b.position - a.position)
			.map((r) => `<@&${r.id}>`);
		const embed = new EmbedBuilder().setColor(client.utils.getRandomColor());
		const roleEmbeds = [];

		if (roles.slice(0, 50)?.length) {
			embed.setDescription(`${roles.slice(0, 50).join("\n")}`);
			roleEmbeds.push(embed.toJSON());
		}
		if (roles.slice(50, 100).length) {
			embed.setDescription(`${roles.slice(50, 100).join("\n")}`);
			roleEmbeds.push(embed.toJSON());
		}
		if (roles.slice(100, 150).length) {
			embed.setDescription(`${roles.slice(100, 150).join("\n")}`);
			roleEmbeds.push(embed.toJSON());
		}
		if (roles.slice(150, 200).length) {
			embed.setDescription(`${roles.slice(150, 200).join("\n")}`);
			roleEmbeds.push(embed.toJSON());
		}
		if (roles.slice(200, 250).length) {
			embed.setDescription(`${roles.slice(200, 250).join("\n")}`);
			roleEmbeds.push(embed.toJSON());
		}

		await interaction.reply({ embeds: roleEmbeds });
	},
};
