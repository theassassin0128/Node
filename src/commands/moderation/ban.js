const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionFlagsBits,
} = require("discord.js");
const { colour } = require("../../config");

module.exports = {
	disabled: true,
	data: new SlashCommandBuilder()
		.setName("ban")
		.setDescription("Ban a member from the server.")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("The member to ban from the server.")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName("reason").setDescription("Reason for the ban.").setRequired(false),
		),
	permissionsRequired: ["BanMembers"],
	botPermissions: ["BanMembers"],
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		await interaction.deferReply();

		let errEmbed = new EmbedBuilder().setColor(colour.error).setTitle("ERROR");
		let errArray = [];
		const { options, guild } = interaction;
		const target = options.getUser("target").id;
		const reason = options.getString("reason") || "No reason specified";
		const member = (await guild.members.fetch()).get(target);
		const fetchUser = (await guild.members.fetch()).get(interaction.user.id);
		const fetchBot = (await guild.members.fetch()).get(client.user.id);

		if (!member) {
			errArray.push("Target user is no longer a member of this server.");
		}
		if (!member.moderatable) {
			errArray.push("Target user is not moderatable by me.");
		}
		if (!member.manageable) {
			errArray.push("Target user is not manageable by me.");
		}
		if (fetchUser.roles.highest.position <= member.roles.highest.position) {
			errArray.push("Target user's highest role is higher than your highest role.");
		}
		if (fetchBot.roles.highest.position <= member.roles.highest.position) {
			errArray.push("Target user's highest role is higher than my highest role.");
		}

		if (errArray.length) {
			errEmbed.setDescription(errArray.join("\n"));

			await interaction.editReply({
				embeds: [errEmbed],
			});
			return;
		}

		const bEmbed = new EmbedBuilder()
			.setTitle("__BAN NOTICE__")
			.setDescription(
				`${member},\nThis is to notify you that have been banned from ${interaction.guild.name}.\n **Reason**: ${reason}`,
			)
			.setColor(colour.main)
			.setFooter({
				text: interaction.guild.name,
				iconURL: interaction.guild.iconURL(),
			})
			.setTimestamp();
		if (!member.user.bot) await member.send({ embeds: [bEmbed] });

		const embed = new EmbedBuilder()
			.setTitle("__BAN NOTICE__")
			.setDescription(
				`Sucessfully banned **${member.user.tag}**\n**Executed By**: ${interaction.user}\n**Reason**: ${reason}`,
			)
			.setColor(colour.main);
		try {
			await member.ban({ reason });
			return interaction.editReply({
				embeds: [embed],
			});
		} catch (error) {
			interaction.editReply({
				content: `There was an error while banning the member. Error: ${error}`,
			});
		}
	},
};
