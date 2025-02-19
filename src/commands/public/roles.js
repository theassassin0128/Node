const {
	SlashCommandBuilder,
	EmbedBuilder,
	Client,
	ChatInputCommandInteraction,
} = require("discord.js");

/** @type {import("@root/src/types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("roles")
		.setDescription("Returns embed(s) with server roles - 2."),
	execute: async (client, interaction) => {
		const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position);
		const allRoles = roles.map((r) => r);
		const size = allRoles.length;

		if (size > 100)
			return interaction.reply({
				content: `Too many roles to display. About [${allRoles.size - 1}] roles.`,
				ephemeral: true,
			});

		const rEmbed = new EmbedBuilder()
			.setTitle("ALL ROLES OF THIS SERVER")
			.setColor(client.utils.getRandomColor())
			.setDescription(`${allRoles.join("\n")}`);

		const emojis = {
			ActiveDeveloper: "<:ActiveDeveloper:1336737306966757517>",
			BugHunterLevel1: "<:BugHunterLevel1:1336737340915449916>",
			BugHunterLevel2: "<:BugHunterLevel2:1336737361131995233>",
			CertifiedModerator: "<:CertifiedModerator:1336737378663923863>",
			discordnitro: "<:discordnitro:1336737399035662448>",
			Partner: "<:Partner:1336737423669071892>",
			Staff: "<:Staff:1336737450244046848>",
			PremiumEarlySupporter: "<:PremiumEarlySupporter:1336737478836490334>",
			VerifiedDeveloper: "<:VerifiedDeveloper:1336737501360029827>",
			HypeSquadOnlineHouse3: "<:HypeSquadOnlineHouse3:1336737528278941797>",
			HypeSquadOnlineHouse1: "<:HypeSquadOnlineHouse1:1336737559535026266>",
			HypeSquadOnlineHouse2: "<:HypeSquadOnlineHouse2:1336737586173050900>",
			Hypesquad: "<:Hypesquad:1336737628854292520>",
			olddiscordmod: "<:olddiscordmod:1336737661406412841>",
			supportscommands: "<:supportscommands:1336737694532767817>",
			verifiedapp1: "<:verifiedapp1:1336737752603168768>",
			verifiedapp2: "<:verifiedapp2:1336737768356708394>",
			verifiedapp3: "<:verifiedapp3:1336737786769838101>",
			verifiedbot1: "<:verifiedbot1:1336737810832425000>",
			verifiedbot2: "<:verifiedbot2:1336737832395472976>",
			boost1month: "<:boost1month:1336759761458302996>",
			boost2months: "<:boost2months:1336759778566995988>",
			boost3months: "<:boost3months:1336759796610895972>",
			boost6months: "<:boost6months:1336759823873736734>",
			boost9months: "<:boost9months:1336759853217218641>",
			boost12months: "<:boost12months:1336759872775258193>",
			boost15months: "<:boost15months:1336759889934155796>",
			boost18months: "<:boost18months:1336759910398038119>",
			boost24months: "<:boost24months:1336759923555565640>",
			hop_get_on_pubg: "<a:hop_get_on_pubg:1340652474050154516>",
			hop_get_off_pubg: "<a:hop_get_off_pubg:1340652492509155422>",
		};

		return interaction.reply({
			content: Object.values(emojis).join(""),
		});
	},
};
