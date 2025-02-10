const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

/** @type {import("@types/command").CommandStructure} */
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
						value: "m1",
					},
					{
						name: "guildMemberRemove",
						value: "m2",
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
			case "m1":
				{
					client.emit("guildMemberAdd", member);
					interaction.reply({
						content: "Emitted Guild Member Add event successfully.",
						flags: MessageFlags.Ephemeral,
					});
				}
				break;
			case "m2":
				{
					client.emit("guildMemberRemove", member);
					interaction.reply({
						content: "Emitted Guild Member Remove event successfully.",
						flags: MessageFlags.Ephemeral,
					});
				}
				break;
		}
	},
};
