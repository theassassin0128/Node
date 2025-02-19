const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

/** @type {import("@root/src/types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("emit")
		.setDescription("Emit an Event")
		.addStringOption((option) =>
			option
				.setName("event")
				.setDescription("The event to emit")
				.setRequired(true)
				.setChoices(
					{
						name: "guildMemeberAdd",
						value: "gma",
					},
					{
						name: "guildMemberRemove",
						value: "gmr",
					},
					{
						name: "guildBanAdd",
						value: "gba",
					},
					{
						name: "guildBanRemove",
						value: "gbr",
					},
				),
		)
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("Select a user to emit an event.")
				.setRequired(false),
		),
	category: "utility",
	cooldown: 0,
	global: true,
	premium: false,
	devOnly: true,
	voiceChannelOnly: false,
	botPermissions: [],
	userPermissions: [],
	usage: '[event]: "event"',
	disabled: false,
	execute: async (client, interaction) => {
		const user = interaction.options.getUser("user");
		let member = interaction.member;
		if (user) member = interaction.guild.members.cache.get(user.id);
		const string = interaction.options.getString("event");
		switch (string) {
			case "gma": {
				client.emit("guildMemberAdd", member);
				interaction.reply({
					content: "Emitted `Guild Member Add` event successfully.",
					flags: MessageFlags.Ephemeral,
				});
				break;
			}

			case "gmr": {
				client.emit("guildMemberRemove", member);
				interaction.reply({
					content: "Emitted `Guild Member Remove` event successfully.",
					flags: MessageFlags.Ephemeral,
				});
				break;
			}

			case "gba": {
				client.emit("guildBanAdd", member);
				interaction.reply({
					content: "Emitted `Guild Ban Add` event successfully.",
					flags: MessageFlags.Ephemeral,
				});
				break;
			}

			case "gbr": {
				client.emit("guildBanRemove", member);
				interaction.reply({
					content: "Emitted `Guild Ban Remove` event successfully.",
					flags: MessageFlags.Ephemeral,
				});
				break;
			}
		}
	},
};
