const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
	ChannelType,
	ChatInputCommandInteraction,
	Client,
} = require("discord.js");
const memberLog = require("../../models/memberLog.js");
const { colour } = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("member-log")
		.setDescription("Member Logging System.")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.setDMPermission(false)
		.addSubcommand((option) =>
			option
				.setName("setup")
				.setDescription("setup the member-log system.")
				.addChannelOption((options) =>
					options
						.setName("channel")
						.setDescription("Select a channel.")
						.addChannelTypes(ChannelType.GuildText)
						.setRequired(true)
				)
				.addRoleOption((option) =>
					option
						.setName("member_role")
						.setDescription("Set a role to give to new members")
				)
				.addRoleOption((option) =>
					option
						.setName("bot_role")
						.setDescription("Set a role to give to new bots")
				)
		)
		.addSubcommand((option) =>
			option
				.setName("delete")
				.setDescription("Delete the member-log system.")
		)
		.addSubcommand((option) =>
			option
				.setName("toggle")
				.setDescription("Toggle the member-log system.")
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 * @returns
	 */
	execute: async (interaction, client) => {
		const { options, guildId } = interaction;
		switch (options.getSubcommand()) {
			case "setup":
				{
					const logChannel = options.getChannel("channel").id;
					let memberRole = options.getRole("member_role")
						? options.getRole("member_role").id
						: null;
					let botRole = options.getRole("bot_role")
						? options.getRole("bot_role").id
						: null;

					await memberLog.findOneAndUpdate(
						{ Guild: guildId },
						{
							Channel: logChannel,
							Toggle: "ON",
							memberRole: memberRole,
							botRole: botRole,
						},
						{ new: true, upsert: true }
					);

					const embed = new EmbedBuilder()
						.setTitle("Member Logging System")
						.setColor(colour.main)
						.setDescription(
							[
								`- Logging Channel : <#${logChannel}>`,
								`- Memebr Auto Role : ${
									memberRole
										? `<@&${memberRole}>`
										: `None Specified`
								}`,
								`- Bot Auto Role : ${
									botRole
										? `<@&${botRole}>`
										: `None Specified`
								}`,
							].join("\n")
						);

					interaction.reply({
						embeds: [embed],
					});
				}
				break;
			case "delete":
				{
					memberLog.findOne({ Guild: guildId }, async (err, data) => {
						if (!data) {
							interaction.reply({
								content:
									"**This server doesn't have a member-log system**",
							});
						} else {
							await memberLog.deleteOne({ Guild: guildId });
							interaction.reply({
								content:
									"**Successfully deleted member-log system.**",
							});
						}
					});
				}
				break;
			case "toggle":
				{
					memberLog.findOne({ Guild: guildId }, async (err, data) => {
						if (!data)
							return interaction.reply({
								content:
									"**This server doesn't have a member-log system.**",
							});
						if (data.Toggle == "ON") {
							await memberLog.updateOne({ Toggle: "OFF" });
							interaction.reply({
								content:
									":x: **Turned off the member-log system.**",
							});
						}
						if (data.Toggle == "OFF") {
							await memberLog.updateOne({ Toggle: "ON" });
							interaction.reply({
								content:
									":white_check_mark: **Turned on the member-log system.**",
							});
						}
					});
				}
				break;
		}
	},
};
