const { ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");

/** @type {import("@types/command").CommandStructure} */
module.exports = {
	data: new ContextMenuCommandBuilder().setType(
		ApplicationCommandType.User || ApplicationCommandType.Message, // either message or user
	),
	category: "none",
	cooldown: 0,
	premium: false,
	guildOnly: false,
	testOnly: false,
	devOnly: false,
	disabled: false,
	botPermissions: [],
	userPermissions: [],
	async execute(client, interaction) {},
};
