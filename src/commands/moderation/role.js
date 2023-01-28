const {
	SlashCommandBuilder,
	EmbedBuilder,
	PermissionFlagsBits,
	ChatInputCommandInteraction,
	Client,
} = require("discord.js");
const { colour } = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("role")
		.setDescription("Give | Remove role(s) from server members")
		.setDMPermission(false)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
		.addSubcommandGroup((option) =>
			option
				.setName("multiple")
				.setDescription("Give | Remove role(s) for multiple users")
				.addSubcommand((option) =>
					option
						.setName("give")
						.setDescription("Give role(s) to multiple users.")
						.addRoleOption((option) =>
							option
								.setName("role")
								.setDescription("The role to give.")
								.setRequired(true)
						)
						.addStringOption((option) =>
							option
								.setName("choice")
								.setDescription(
									"Make choice for the multiple action."
								)
								.addChoices(
									{ name: "Bots", value: "bots" },
									{ name: "Humans", value: "humans" },
									{ name: "All Members", value: "all" }
								)
						)
				)
				.addSubcommand((option) =>
					option
						.setName("remove")
						.setDescription("remove role(s) from multiple users.")
						.addRoleOption((option) =>
							option
								.setName("role")
								.setDescription("The role to give.")
								.setRequired(true)
						)
						.addStringOption((option) =>
							option
								.setName("choice")
								.setDescription(
									"Make choice for the multiple action."
								)
								.addChoices(
									{ name: "Bots", value: "bots" },
									{ name: "Humans", value: "humans" },
									{ name: "All Members", value: "all" }
								)
						)
				)
		)
		.addSubcommand((option) =>
			option
				.setName("give")
				.setDescription("Give a role to a user.")
				.addRoleOption((option) =>
					option
						.setName("role")
						.setDescription("The role to give.")
						.setRequired(true)
				)
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to give the role.")
						.setRequired(true)
				)
		)
		.addSubcommand((option) =>
			option
				.setName("remove")
				.setDescription("Remove a role from a user.")
				.addRoleOption((option) =>
					option
						.setName("role")
						.setDescription("The role to remove.")
						.setRequired(true)
				)
				.addUserOption((option) =>
					option
						.setName("user")
						.setDescription("The user to remove the role.")
						.setRequired(true)
				)
		),
	execute: async (interaction, client) => {},
};
