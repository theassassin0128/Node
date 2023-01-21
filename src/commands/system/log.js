const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	EmbedBuilder,
	ChannelType,
	ChatInputCommandInteraction,
	Client,
} = require("discord.js");
const database = require("../../database/schemas/logs/member.js");
const { colour } = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("log-setup")
		.setDescription("Configure the logging systems for your guild.")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.setDMPermission(false)
		.addSubcommand((option) =>
			option
				.setName("member")
				.setDescription("Setup a logging system for new members.")
				.addChannelOption((options) =>
					options
						.setName("channel")
						.setDescription("Select the channel for this system.")
						.addChannelTypes(ChannelType.GuildText)
						.setRequired(true)
				)
		)
		.addSubcommand((option) =>
			option
				.setName("moderation")
				.setDescription("Setup a channel to log moderation commands.")
				.addChannelOption((options) =>
					options
						.setName("channel")
						.setDescription("Select the channel for this system.")
						.addChannelTypes(ChannelType.GuildText)
						.setRequired(true)
				)
		)
		.addSubcommand((option) =>
			option
				.setName("welcome")
				.setDescription("Setup a channel to welcome new members.")
				.addChannelOption((options) =>
					options
						.setName("channel")
						.setDescription("Select the channel for this system.")
						.addChannelTypes(ChannelType.GuildText)
						.setRequired(true)
				)
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 * @returns
	 */
	execute: async (interaction, client) => {
		const { channel, guild, options } = interaction;
		const subCommand = options.getSubcommand();

		switch (subCommand) {
			case "member":
				{
					const logChannel = options.getChannel("channel").id;

					await database.findOneAndUpdate(
						{ Guild: guild.id },
						{
							logChannel: logChannel,
						},
						{ new: true, upsert: true }
					);

					client.guildConfig.set(guild.id, {
						logChannel: logChannel,
					});

					const embed = new EmbedBuilder()
						.setTitle("Member Logger Setup")
						.setColor(colour.main)
						.setDescription(
							[`- Logging Channel : <#${logChannel}>`].join("\n")
						);

					await interaction.reply({ embeds: [embed] });
				}
				break;

			case "moderation":
				{
				}
				break;
			case "welcome":
				{
				}
				break;

			default:
				break;
		}
	},
};
