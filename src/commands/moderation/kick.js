const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  Client,
  PermissionFlagsBits,
} = require("discord.js");
const { colour } = require("../../config");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("kick")
		.setDescription("Kick a member from the server.")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.addUserOption((option) =>
			option
				.setName("target")
				.setDescription("The member to kick from the server.")
				.setRequired(true),
		)
		.addStringOption((option) =>
			option.setName("reason").setDescription("Reason for the kick.").setRequired(false),
		),
	permissionsRequired: ["KickMembers"],
	botPermissions: ["KickMembers"],
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

		const Embed = new EmbedBuilder()
			.setTitle("__KICK NOTICE__")
			.setDescription(
				`${member},\nThis is to notify you that have been kicked out of ${interaction.guild.name}.\n **Reason**: ${reason}`,
			)
			.setColor(colour.main)
			.setFooter({
				text: interaction.guild.name,
				iconURL: interaction.guild.iconURL(),
			})
			.setTimestamp();
		if (!member.user.bot) await member.send({ embeds: [Embed] });

		const embed = new EmbedBuilder()
			.setTitle("__KICK NOTICE__")
			.setDescription(
				`Sucessfully kicked **${member.user.tag}**\n**Executed By**: ${interaction.user}\n**Reason**: ${reason}`,
			)
			.setColor(colour.main);
		try {
			await member.kick({ reason });
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
