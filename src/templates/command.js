const { SlashCommandBuilder } = require("discord.js");

/** @type {import("@types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder(),
	usage: "",
	category: "none",
	cooldown: 0,
	premium: false,
	guildOnly: false,
	testOnly: false,
	devOnly: false,
	disabled: false,
	voiceChannelOnly: false,
	botPermissions: [],
	userPermissions: [],
	execute: async (client, interaction) => {},
	autocomplete: async (client, interaction) => {},
};
