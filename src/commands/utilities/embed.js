const {
	SlashCommandBuilder,
	EmbedBuilder,
	ChatInputCommandInteraction,
	Client,
	ChannelType,
} = require("discord.js");
const { colour } = require("../../config.json");
const wait = require("timers/promises").setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName("embed")
		.setDescription("Commands related to embed messages.")
		.setDMPermission(false)
		.addSubcommand((option) =>
			option
				.setName("create")
				.setDescription("create and send an embed message.")

				.addStringOption((option) =>
					option
						.setName("description")
						.setDescription("The Description of the embed.")
						.setRequired(true)
						.setMaxLength(4096)
				)
				.addChannelOption((option) =>
					option
						.setName("channel")
						.setDescription("The channel to send the embed message")
						.addChannelTypes(ChannelType.GuildText)
						.setRequired(false)
				)
				.addStringOption((option) =>
					option
						.setName("color")
						.setDescription("The colour of the embed.")
						.setRequired(false)
						.setMaxLength(6)
				)
		),
	/**
	 *
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {Client} client
	 */
	execute: async (interaction, client) => {
		const { options, guild } = interaction;
		const sub = options.getSubcommand();
		const channel = options.getChannel("channel") || interaction.channel;
		const description = options.getString("description");
		const color = options.getString("color") || colour.main;

		let embed = new EmbedBuilder()
			.setDescription(description.split("/n").join("\n"))
			.setColor(color);

		(await guild.channels.fetch())
			.get(channel.id)
			.send({ embeds: [embed] });

		interaction.reply({
			content: `Successfully sent the embed message in the selected channel | ${channel}`,
			ephemeral: true,
		});
	},
};
