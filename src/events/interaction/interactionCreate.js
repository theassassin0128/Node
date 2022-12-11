const { EmbedBuilder, Client, Interaction } = require("discord.js");
const { image, colour } = require("../../config.json");

module.exports = {
	name: "interactionCreate",
	/**
	 * @param {Interaction} interaction
	 * @param {Client} client
	 */
	async execute(interaction, client) {
		const errEmbed = new EmbedBuilder()
			.setAuthor({
				name: "ERROR",
				iconURL: `${image.error}`,
			})
			.setColor(colour.error);

		const cmdError = new EmbedBuilder()
			.setTitle("ERROR")
			.setDescription(
				`**Sorry**, This [${interaction.commandName}] command doesn't exist. Try using /help to get help with commands.`
			)
			.setColor(colour.error)
			.setThumbnail(
				client.user.avatarURL({
					dynamic: true,
					size: 4096,
				})
			)
			.setFooter({
				text: client.user.username,
				icomURL: client.user.avatarURL({
					dynamic: true,
					size: 4096,
				}),
			})
			.setTimestamp();

		if (interaction.isChatInputCommand()) {
			try {
				//Getting the command
				const command = client.commands.get(interaction.commandName);
				//Returning a message if the command isn't valid
				if (!command) {
					interaction.reply({
						embeds: [cmdError],
					}) && client.interactions.delete(interaction.command);
					return;
				}

				command.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					embeds: [
						errEmbed.setDescription(
							`There was an error while executing the interaction\n**ERROR :**\n${error}`
						),
					],
				});
				console.error(error);
			}
		} else if (interaction.isButton()) {
			const { customId } = interaction;
			const button = client.buttons.get(customId);

			if (!button) {
				interaction.reply({
					embeds: [cmdError],
				});
				return;
			}

			try {
				button.execute(interaction, client);
			} catch (error) {
				interaction.reply({
					embeds: [
						errEmbed.setDescription(
							`There was an error while executing the interaction\n**ERROR :**\n${error}`
						),
					],
				});
				console.error(error);
			}
		}
	},
};
