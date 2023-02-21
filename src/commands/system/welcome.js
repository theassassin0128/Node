const {
	SlashCommandBuilder,
	EmbedBuilder,
	ChatInputCommandInteraction,
	Client,
	PermissionFlagsBits,
	ChannelType,
} = require("discord.js");
const welcome = require("../../models/welcome.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("welcome")
		.setDescription("GuildMember welcome messages")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.addSubcommand((option) =>
			option
				.setName("create")
				.setDescription("Create a new welcome message")
		)
		.addSubcommand((option) =>
			option.setName("delete").setDescription("Delete a welcome message")
		)
		.addSubcommand((option) =>
			option
				.setName("info")
				.setDescription("Shows info about message styling")
		)
		.addSubcommand((option) =>
			option
				.setName("preview")
				.setDescription("Send a preview welcome message.")
		)
		.addSubcommand((option) =>
			option
				.setName("toggle")
				.setDescription("Toggle the welcome message")
		)
		.addSubcommand((option) =>
			option
				.setName("change")
				.setDescription("Change the welcome channel to another channel")
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("Select a channel")
						.setRequired(true)
						.addChannelTypes(ChannelType.GuildText)
				)
		)
		.addSubcommand((option) =>
			option
				.setName("text")
				.setDescription("Change or manage the welcome message.")
		)
		.addSubcommand((option) =>
			option
				.setName("format")
				.setDescription("Change the time format in the message.")
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const { member, user, guild, options, channelId } = interaction;

		switch (options.getSubcommand()) {
			case "create":
				{
					welcome.findOne({ Guild: guild.id }, async (err, data) => {
						if (!data) {
							let newMessageObject = {
								author: {
									name: null,
									iconURL: null,
								},
								title: "Tag",
								description:
									"Just joined {userName}/nThere are now {memberCount} members",
								color: "90B63E",
								thumbnail:
									"member.displayAvatarURL({ size : 2048})",
								image: null,
								footer: {
									name: "Joined",
									iconURL: null,
								},
								timestamps: "true",
							};
							await welcome.create({
								Guild: guild.id,
								Channel: channelId,
								Toggle: "ON",
								Message: newMessageObject,
							});
							interaction.reply({
								content:
									"Successfully created welcome message.",
							});
						} else {
							interaction.reply({
								content:
									"This server already has a welcome message",
							});
						}
					});
				}
				break;

			case "delete":
				{
					welcome.findOne({ Guild: guild.id }, async (err, data) => {
						if (!data) {
							interaction.reply({
								content:
									"This server doesn't have a welcome message",
							});
						} else {
							await welcome.deleteOne({ Guild: guild.id });
							interaction.reply({
								content:
									"Successfully deleted welcome message.",
							});
						}
					});
				}
				break;
			case "toggle":
				{
					welcome.findOne({ Guild: guild.id }, async (err, data) => {
						if (!data)
							return interaction.reply({
								content:
									"This server doesn't have a welcome message",
							});
						if (data.Toggle == "ON") {
							await welcome.updateOne({ Toggle: "OFF" });
							interaction.reply({
								content: "Turned off the welcome message.",
							});
						}
						if (data.Toggle == "OFF") {
							await welcome.updateOne({ Toggle: "ON" });
							interaction.reply({
								content: "Turned on the welcome message.",
							});
						}
					});
				}
				break;
			case "preview":
				{
					welcome.findOne({ Guild: guild.id }, async (err, data) => {
						if (!data) {
							return interaction.reply({
								content:
									"This server doesn't have a welcome message",
							});
						} else {
							client.emit("guildMemberAdd", member);
							interaction.reply({
								content: `Sent the preview welcome message on <#${data.Channel}>`,
								ephemeral: true,
							});
						}
					});
				}
				break;
			case "change":
				{
					let channel = options.getChannel("channel");
					welcome.findOne({ Guild: guild.id }, async (err, data) => {
						if (!data) {
							return interaction.reply({
								content:
									"This server doesn't have a welcome message",
							});
						} else {
							await welcome.updateOne({
								Channel: channel.id,
							});
							interaction.reply({
								content: `Changed the welcome message channel to ${channel}`,
							});
						}
					});
				}
				break;
		}
	},
};
