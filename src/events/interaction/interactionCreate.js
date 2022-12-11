const { EmbedBuilder, Client, Interaction } = require("discord.js");
const { image, colour } = require("../../config.json");

module.exports = {
	name: "interactionCreate",
	/**
	 * @param {Interaction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const errorEmbed = new EmbedBuilder()
			.setAuthor({
				name: "ERROR",
				iconURL: `${image.error}`,
			})
			.setColor(colour.error)
			.setDescription(
				"There was an error while executing the interaction."
			);

		const commandError = new EmbedBuilder()
			.setTitle("ERROR")
			.setDescription(
				`**Sorry**, This [${interaction.commandName}] command doesn't exist.`
			)
			.setColor(colour.error)
			.setThumbnail(client.user.displayAvatarURL({ size: 4096 }))
			.setFooter({
				text: client.user.username,
				icomURL: client.user.displayAvatarURL({ size: 4096 }),
			})
			.setTimestamp();

		const buttonError = new EmbedBuilder()
			.setTitle("ERROR")
			.setDescription(`**Sorry**, This Button doesn't exist or removed.`)
			.setColor(colour.error)
			.setThumbnail(client.user.displayAvatarURL({ size: 4096 }))
			.setFooter({
				text: client.user.username,
				icomURL: client.user.displayAvatarURL({ size: 4096 }),
			})
			.setTimestamp();
		const selectMenuError = new EmbedBuilder()
			.setTitle("ERROR")
			.setDescription(
				`**Sorry**, This SelectMenu doesn't exist or removed.`
			)
			.setColor(colour.error)
			.setThumbnail(client.user.displayAvatarURL({ size: 4096 }))
			.setFooter({
				text: client.user.username,
				icomURL: client.user.displayAvatarURL({ size: 4096 }),
			})
			.setTimestamp();

		if (interaction.isChatInputCommand()) {
			try {
				const command = await client.commands.get(
					interaction.commandName
				);

				if (!command) {
					interaction.reply({
						embeds: [commandError],
					}) && client.interactions.delete(interaction.command);
					return;
				}

				command.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					embeds: [errorEmbed],
				});
				console.error(error);
			}
		} else if (interaction.isButton()) {
			try {
				const { customId } = interaction;
				const button = await client.buttons.get(customId);

				if (!button)
					return interaction.reply({
						embeds: [buttonError],
					});

				button.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					embeds: [errorEmbed],
				});
				console.error(error);
			}
		} else if (interaction.isStringSelectMenu()) {
			try {
				const { customId } = interaction;
				const selectMenu = await client.selectMenus.get(customId);

				if (!selectMenu) {
					interaction.reply({
						embeds: [selectMenuError],
					});
				}

				selectMenu.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					embeds: [errorEmbed],
				});
				console.error(error);
			}
		}
	},
};
