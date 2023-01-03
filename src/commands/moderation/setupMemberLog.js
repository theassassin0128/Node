const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChatInputCommandInteraction,
	EmbedBuilder,
	ChannelType,
	Client,
} = require("discord.js");
const database = require("../../database/schemas/memberLog.js");
const { colour } = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("setup_member-log")
		.setDescription("Configure the member logging system for your guild.")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.setDMPermission(false)
		.addChannelOption((options) =>
			options
				.setName("log_channel")
				.setDescription("Select the logging channel for this system.")
				.addChannelTypes(ChannelType.GuildText)
				.setRequired(true)
		)
		.addRoleOption((option) =>
			option
				.setName("member_role")
				.setDescription(
					"Set the role to be automatically added to new members."
				)
		)
		.addRoleOption((option) =>
			option
				.setName("bot_role")
				.setDescription(
					"Set the role to be automatically added to new bots."
				)
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const logChannel = interaction.options.getChannel("log_channel").id;
		let memberRole = interaction.options.getRole("member_role")
			? interaction.options.getRole("member_role").id
			: null;
		let botRole = interaction.options.getRole("bot_role")
			? interaction.options.getRole("bot_role").id
			: null;

		await database.findOneAndUpdate(
			{ Guild: interaction.guild.id },
			{
				logChannel: logChannel,
				memberRole: memberRole,
				botRole: botRole,
			},
			{ new: true, upsert: true }
		);

		client.guildConfig.set(interaction.guild.id, {
			logChannel: logChannel,
			memberRole: memberRole,
			botRole: botRole,
		});

		const embed = new EmbedBuilder()
			.setColor(colour.main)
			.setDescription(
				[
					`- Logging Channel Updated : <#${logChannel}>`,
					`- Memebr Auto Role Updated : ${
						memberRole ? `<@&${memberRole}>` : `None Specified`
					}`,
					`- Bot Auto Role Updated : ${
						botRole ? `<@&${botRole}>` : `None Specified`
					}`,
				].join("\n")
			);

		return interaction.reply({ embeds: [embed] });
	},
};
