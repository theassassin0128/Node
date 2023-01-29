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
		.addSubcommand((option) =>
			option
				.setName("give")
				.setDescription("Gives a role to a user.")
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
				.setDescription("Removes a role from a user.")
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
		)
		.addSubcommand((option) =>
			option
				.setName("multiple")
				.setDescription("Give/Remove | role action for multiple users")
				.addStringOption((option) =>
					option
						.setName("give_or_remove")
						.setDescription("Pick a type.")
						.setRequired(true)
						.addChoices(
							{ name: "Give", value: "g" },
							{ name: "Remove", value: "r" }
						)
				)
				.addRoleOption((option) =>
					option
						.setName("role")
						.setDescription("The role to give/remove")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("type")
						.setDescription(
							"Choose a type for the role multiple action."
						)
						.addChoices(
							{ name: "Bots", value: "bots" },
							{ name: "Humans", value: "humans" },
							{ name: "All Members", value: "all" }
						)
				)
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const sub = interaction.options.getSubcommand();
		switch (sub) {
			case "give":
				{
					const role = (await interaction.guild.roles.fetch()).get(
						interaction.options.getRole("role").id
					);
					const user = (await interaction.guild.members.fetch()).get(
						interaction.options.getUser("user").id
					);
					const bot = await interaction.guild.members.fetchMe();
					const interactionUser = (
						await interaction.guild.members.fetch()
					).get(interaction.user.id);

					if (role.position >= bot.roles.highest.position)
						return interaction.reply({
							content: `The role's [${role}] position is higher than mine. So, I am unable to manage this role.`,
							ephemeral: true,
						});

					if (interaction.user.id == interaction.guild.ownerId) {
						await user.roles.add(role);
						interaction.reply({
							content: `Added role [${role}] to ${user}`,
							ephemeral: true,
						});
					} else {
						if (
							role.position >=
							interactionUser.roles.highest.position
						)
							return interaction.reply({
								content: `The role's [${role}] position is higher than your highest role's position. So, you are unable manage this role`,
								ephemeral: true,
							});
						else {
							await user.roles.add(role);
							interaction.reply({
								content: `Added role [${role}] to ${user}`,
								ephemeral: true,
							});
						}
					}
				}
				break;
			case "remove":
				{
					const role = (await interaction.guild.roles.fetch()).get(
						interaction.options.getRole("role").id
					);
					const user = (await interaction.guild.members.fetch()).get(
						interaction.options.getUser("user").id
					);
					const bot = await interaction.guild.members.fetchMe();
					const interactionUser = (
						await interaction.guild.members.fetch()
					).get(interaction.user.id);

					if (role.position >= bot.roles.highest.position)
						return interaction.reply({
							content: `The role's [${role}] position is higher than mine. So, I am unable to manage this role.`,
							ephemeral: true,
						});
					if (interaction.user.id == interaction.guild.ownerId) {
						await user.roles.remove(role);
						interaction.reply({
							content: `Removed role [${role}] from ${user}`,
							ephemeral: true,
						});
					} else {
						if (
							role.position >=
							interactionUser.roles.highest.position
						)
							return interaction.reply({
								content: `The role's [${role}] position is higher than your highest role's position. So, you are unable manage this role`,
								ephemeral: true,
							});
						else {
							await user.roles.add(role);
							interaction.reply({
								content: `Remove role [${role}] from ${user}`,
								ephemeral: true,
							});
						}
					}
				}
				break;
			case "multiple":
				{
				}
				break;

			default:
				break;
		}
	},
};
