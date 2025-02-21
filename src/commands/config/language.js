const {
	SlashCommandBuilder,
	PermissionFlagsBits,
	MessageFlags,
	ApplicationIntegrationType,
	InteractionContextType,
} = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/index").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("language")
		.setDescription("🌐 Change your language for the bot.")
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
		.setContexts(InteractionContextType.Guild)
		.setIntegrationTypes(ApplicationIntegrationType.GuildInstall)
		.addStringOption((option) =>
			option
				.setName("language")
				.setDescription("Select a language.")
				.setRequired(true)
				.setAutocomplete(true),
		),
	usage: "[language]: <language>",
	category: "config",
	cooldown: 120_000,
	global: true,
	premium: false,
	devOnly: true,
	disabled: false,
	voiceChannelOnly: false,
	botPermissions: [],
	userPermissions: ["ManageGuild"],
	async execute(client, interaction, lng) {
		await interaction.deferReply({ flags: MessageFlags.Ephemeral });

		const { guild, options } = interaction;
		const { availableLocales, Languages } = client.config.language;
		const locale = options.getString("language", true);
		const guildConfig = await client.db.guilds.getGuild(guild);

		if (!availableLocales.includes(locale)) {
			return interaction.followUp({
				content: t("commands:language.available", { lng }),
			});
		}

		const language = Languages.find((lng) => lng.locale === locale);
		guildConfig.$set("locale", locale);
		await guildConfig.save();

		return interaction.followUp({
			content: t("commands:language.reply", {
				lng,
				language: `${language.name} | ${language.native}`,
			}),
		});
	},
	async autocomplete(client, interaction) {
		const { availableLocales, Languages } = client.config.language;
		const focused = interaction.options.getFocused().toLowerCase();
		/** @type {import("discord.js").ApplicationCommandChoicesData[]} */
		const languageData = [];

		// If no imput was provoded
		if (!focused) {
			Languages.filter((lng) => availableLocales.some((l) => l === lng.locale))
				.slice(0, 25)
				.forEach((language) => {
					languageData.push({
						name: `${language.name} | ${language.native}`,
						value: language.locale,
					});
				});
		}

		// If some type of input was provided
		else {
			Languages.filter((lng) => {
				return (
					lng.name.toLowerCase().match(focused) ||
					lng.locale.toLowerCase().match(focused) ||
					lng.native.toLowerCase().match(focused)
				);
			})
				.slice(0, 25)
				.forEach((language) => {
					languageData.push({
						name: `${language.name} | ${language.native}`,
						value: language.locale,
					});
				});
		}

		await interaction.respond(languageData);
	},
};
