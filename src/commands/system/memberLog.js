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
const moment = require("moment");

module.exports = {
	dev: true,
	data: new SlashCommandBuilder()
		.setName("member-log")
		.setDescription("Member Logging System.")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.setDMPermission(false)
		.addSubcommand((option) =>
			option
				.setName("setup")
				.setDescription("setup the member logging system.")
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
				.setDescription("Delete the member logging system.")
		)
		.addSubcommand((option) =>
			option
				.setName("toggle")
				.setDescription("Toggle the member logging system.")
		)
		.addSubcommand((option) =>
			option
				.setName("edit-role")
				.setDescription("Edit the member logging system.")
				.addStringOption((option) =>
					option
						.setName("role_type")
						.setDescription("Choose a role type to edit")
						.setRequired(true)
						.addChoices(
							{ name: "MemberRole", value: "memberRole" },
							{ name: "BotRole", value: "botRole" }
						)
				)
				.addRoleOption((option) =>
					option
						.setName("role")
						.setDescription("Provide the role to change")
						.setRequired(true)
				)
		)
		.addSubcommand((option) =>
			option
				.setName("edit-channel")
				.setDescription(
					"Edit the log channel of the member logging system."
				)
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("Provide the channel to change")
						.setRequired(true)
						.addChannelTypes(ChannelType.GuildText)
				)
		)
		.addSubcommand((option) =>
			option.setName("preview").setDescription("Sends a preview.")
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {client} client
	 * @returns
	 */
	execute: async (interaction, client) => {
		const { options, guild, guildId, user } = interaction;

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
					const doc = await memberLog.findOne({ Guild: guildId });

					if (!doc) {
						memberLog.create({
							Guild: guildId,
							Channel: logChannel,
							Toggle: "ON",
							MemberRole: memberRole,
							BotRole: botRole,
						});

						interaction.reply({
							content:
								"**Finished setting up the member logging system.**",
							embeds: [embed],
						});
					} else {
						interaction.reply({
							content:
								"**This Server already has a member logging system**.",
							ephemeral: true,
						});
					}
				}
				break;
			case "delete":
				{
					const doc = await memberLog.findOne({ Guild: guildId });
					if (!doc) {
						interaction.reply({
							content:
								"**This server doesn't have a member-log system**",
							ephemeral: true,
						});
					} else {
						await memberLog.deleteOne({ Guild: guildId });
						interaction.reply({
							content:
								"**Successfully deleted member-log system.**",
							ephemeral: true,
						});
					}
				}
				break;
			case "toggle":
				{
					const doc = await memberLog.findOne({ Guild: guildId });
					if (!doc) {
						interaction.reply({
							content:
								"This server does not have a member logging system.",
							ephemeral: true,
						});
					} else {
						const toggle = doc.get("Toggle");

						if (toggle == "ON") {
							doc.$set("Toggle", "OFF");
							doc.save();
							interaction.reply({
								content:
									"Turned **OFF** the member logging system.",
								ephemeral: true,
							});
						} else {
							doc.$set("Toggle", "ON");
							doc.save();
							interaction.reply({
								content:
									"Turned **ON** the member logging system.",
								ephemeral: true,
							});
						}
					}
				}
				break;
			case "edit-channel":
				{
					const channel = options.getChannel("channel").id;

					const doc = await memberLog.findOne({ Guild: guildId });
					if (!doc) {
						interaction.reply({
							content:
								"This server does not have a member logging system.",
							ephemeral: true,
						});
					} else {
						doc.$set("Channel", channel);
						doc.save();
						interaction.reply({
							content: `Changed the log channel to <#${channel}>`,
							ephemeral: true,
						});
					}
				}
				break;
			case "edit-role":
				{
					const roleType = options.getString("role_type");
					const role = options.getRole("role").id;

					const doc = await memberLog.findOne({ Guild: guildId });
					if (!doc) {
						interaction.reply({
							content:
								"This server does not have a member logging system.",
							ephemeral: true,
						});
					} else {
						if (roleType == "memberRole") {
							doc.$set("MemberRole", role);
							doc.save();
							interaction.reply({
								content: `**Changed MemberRole to <@&${role}>**`,
								ephemeral: true,
							});
						} else {
							doc.$set("BotRole", role);
							doc.save();
							interaction.reply({
								content: `**Changed BotRole to <@&${role}>**`,
								ephemeral: true,
							});
						}
					}
				}
				break;
			case "preview":
				{
					interaction.reply({
						content: "Successfully sent the preview.",
						ephemeral: true,
					});
					const member = (await guild.members.fetch()).get(user.id);
					const roles = guild.roles.cache;
					const doc = await memberLog.findOne({ Guild: guild.id });

					let channel = (await guild.channels.fetch()).get(
						doc.get("Channel")
					);
					if (!channel) return;

					let assingRole = user.bot
						? roles.get(doc.get("BotRole"))
						: roles.get(doc.get("MemberRole"));
					if (!assingRole) assingRole = "Not Configured";
					else
						await member.roles.add(assingRole).catch(() => {
							assingRole = "Failed due to role hierarchy.";
						});

					let color = colour.main;
					let risk = "Fairly Safe";

					const accountCreation = parseInt(
						user.createdTimestamp / 1000
					);
					const joiningTime = parseInt(member.joinedAt / 1000);

					const monthsAgo = moment().subtract(2, "months").unix();
					const weeksAgo = moment().subtract(2, "weeks").unix();
					const daysAgo = moment().subtract(2, "days").unix();

					if (accountCreation >= monthsAgo) {
						color = "#ffff00";
						risk = "Medium";
					}
					if (accountCreation >= weeksAgo) {
						color = "#ff8c00";
						risk = "High";
					}
					if (accountCreation >= daysAgo) {
						color = "#ff0000";
						risk = "Extreme";
					}

					const Embed = new EmbedBuilder()
						.setAuthor({
							name: user.tag,
							iconURL: member.displayAvatarURL({ size: 1024 }),
						})
						.setColor(color)
						.setThumbnail(
							member.user.displayAvatarURL({ size: 2048 })
						)
						.setDescription(
							[
								`• User : ${user}`,
								`• Account Type : ${
									user.bot ? "**Bot**" : "**User**"
								}`,
								`• Role Assigned : ${assingRole}`,
								`• Risk Level : ${risk}\n`,
								`• Account Created :\n<t:${accountCreation}:D> | <t:${accountCreation}:R>`,
								`• Account Joined :\n<t:${joiningTime}:D> | <t:${joiningTime}:R>`,
							].join("\n")
						)
						.setFooter({ text: "Joined" })
						.setTimestamp();

					if (risk == "High" || risk == "Extreme") {
						const kickButton = new ButtonBuilder()
							.setCustomId(`Kick-${member.id}`)
							.setLabel("Kick")
							.setStyle(ButtonStyle.Danger);
						const banButton = new ButtonBuilder()
							.setCustomId(`Ban-${member.id}`)
							.setLabel("Ban")
							.setStyle(ButtonStyle.Danger);

						const Buttons = new ActionRowBuilder().addComponents(
							kickButton,
							banButton
						);
						const log = await channel.send({
							embeds: [Embed],
							components: [Buttons],
						});
						await wait(12 * 60 * 60 * 1000);
						const message = (await channel.messages.fetch()).get(
							log.id
						);
						if (!message) return;
						message.edit({
							embeds: [Embed],
							components: [
								new ActionRowBuilder().addComponents(
									kickButton.setDisabled(true),
									banButton.setDisabled(true)
								),
							],
						});
					} else {
						channel.send({ embeds: [Embed] });
					}
				}
				break;
		}
	},
};
