const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	ChatInputCommandInteraction,
	Client,
} = require("discord.js");
const wait = require("timers/promises").setTimeout;

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
				.setDescription("Role command for multiple users.")
				.addStringOption((option) =>
					option
						.setName("action")
						.setDescription("Pick an action")
						.setRequired(true)
						.addChoices(
							{ name: "Give", value: "give" },
							{ name: "Remove", value: "remove" }
						)
				)
				.addRoleOption((option) =>
					option
						.setName("role")
						.setDescription("The role to gives.")
						.setRequired(true)
				)
				.addStringOption((option) =>
					option
						.setName("type")
						.setDescription("Pick a type")
						.setRequired(true)
						.addChoices(
							{ name: "All Members", value: "all" },
							{ name: "Humans", value: "humans" },
							{ name: "Bots", value: "bots" }
						)
				)
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		try {
			const role = (await interaction.guild.roles.fetch()).get(
				interaction.options.getRole("role").id
			);
			const user = interaction.options.getUser("user")
				? (await interaction.guild.members.fetch()).get(
						interaction.options.getUser("user").id
				  )
				: null;
			const bot = await interaction.guild.members.fetchMe();
			const interactionUser = (
				await interaction.guild.members.fetch()
			).get(interaction.user.id);
			const action = interaction.options.getString("action");
			const type = interaction.options.getString("type");
			let memberArray = [];

			if (role.position >= bot.roles.highest.position)
				interaction.reply({
					content: `Due to role hierarchy I am unable to manage this role.`,
					ephemeral: true,
				});
			if (
				interactionUser.id == interaction.guild.ownerId ||
				interactionUser.roles.highest.position > role.position
			) {
				switch (interaction.options.getSubcommand()) {
					case "give":
						{
							await user.roles.add(role);
							interaction.reply({
								content: `${role} | Role given to ${user}.`,
								ephemeral: true,
							});
						}
						break;
					case "remove":
						{
							await user.roles.remove(role);
							interaction.reply({
								content: `${role} | Role removed from ${user}.`,
								ephemeral: true,
							});
						}
						break;
					case "multiple":
						{
							(await interaction.guild.members.fetch()).forEach(
								(member) => {
									switch (type) {
										case "all":
											{
												memberArray.push(member);
											}
											break;
										case "humans":
											{
												if (!member.user.bot)
													memberArray.push(member);
											}
											break;
										case "bots":
											{
												if (member.user.bot)
													memberArray.push(member);
											}
											break;
									}
								}
							);
							switch (action) {
								case "give":
									{
										await interaction.reply({
											content: `Started giving roles..........`,
										});
										memberArray.forEach((member) => {
											member.roles.add(role);
										});
										await wait(3 * 1000);
										interaction.editReply({
											content: `${role} | Given the role to the selected members.`,
										});
									}
									break;
								case "remove":
									{
										await interaction.reply({
											content: `Started removing roles..........`,
										});
										memberArray.forEach((member) => {
											member.roles.remove(role);
										});
										await wait(3 * 1000);
										interaction.editReply({
											content: `${role} | Removed the role from the selected members.`,
										});
									}
									break;
							}
						}
						break;
				}
			} else {
				interaction.reply({
					content: `${role} | You are not allowed to manage this role.`,
					ephemeral: true,
				});
			}
		} catch (error) {
			interaction.reply({
				content: `An error occured while executing the command.\n\n**ERROR: ${error}**`,
			});
		}
	},
};
/*
switch (interaction.options.getSubcommandGroup()) {
			case "multiple":
				{
					const role = (await interaction.guild.roles.fetch()).get(
						interaction.options.getRole("role").id
					);
					const type = interaction.options.getString("type");
					const bot = await interaction.guild.members.fetchMe();
					const interactionUser = (
						await interaction.guild.members.fetch()
					).get(interaction.user.id);
					

					
					if (role.position >= bot.roles.highest.position)
						interaction.reply({
							content: `Due to role hierarchy I am unable to manage this role.`,
							ephemeral: true,
						});
					if (
						interactionUser.id == interaction.guild.ownerId ||
						interactionUser.roles.highest.position > role.position
					) {
						
					} else {
						interaction.reply({
							content: `${role} | You are not allowed to manage this role.`,
							ephemeral: true,
						});
					}
				}
				break;
		}
*/
