const {
	EmbedBuilder,
	SlashCommandBuilder,
	Client,
	ChatInputCommandInteraction,
	AttachmentBuilder,
} = require("discord.js");
const { profileImage } = require("discord-arts");

/** @type {import("@root/src/types/command").CommandStructure} */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("memberinfo")
		.setDescription("View your or any member's information.")
		.setDMPermission(false)
		.addUserOption((options) =>
			options
				.setName("member")
				.setDescription("View a member's information. Leave empty to view your own."),
		),
	cooldown: 60,
	global: true,
	execute: async (client, interaction) => {
		await interaction.deferReply();

		const member = interaction.options.getMember("member") || interaction.member;

		if (member.user.bot)
			return interaction.editReply({
				content: "At this moment, bots are not supported for this command",
			});

		try {
			const fetchedMembers = await interaction.guild.members.fetch();

			const profileBuffer = await profileImage(member.id);
			const imageAttachment = new AttachmentBuilder(profileBuffer, {
				name: "profile.png",
			});

			const joinedPosition =
				Array.from(
					fetchedMembers.sort((a, b) => a.joinedTimestamp - b.joinedTimestamp).keys(),
				).indexOf(member.id) + 1;

			const topRoles = member.roles.cache
				.sort((a, b) => b.position - a.position)
				.map((role) => role)
				.slice(0, 3);

			const userBadges = member.user.flags.toArray();
			const joinTime = parseInt(member.joinedTimestamp / 1000);
			const creationTime = parseInt(member.user.createdTimestamp / 1000);
			const Booster = member.premiumSince
				? "<:discordboost7:1086251073926344777>"
				: ":x:";

			const Embed = new EmbedBuilder()
				.setAuthor({
					name: `${member.user.tag} | General Information`,
					iconURL: member.displayAvatarURL(),
				})
				.setColor(member.displayHexColor || client.utils.getRandomColor())
				.setDescription(
					`On <t:${joinTime}:D> ${member.user.username} joind as the **${addSuffix(
						joinedPosition,
					)}** member of this server.`,
				)
				.setImage("attachment://profile.png")
				.addFields([
					{
						name: "Badges",
						value: `${addBadges(userBadges).join("")}`,
						inline: true,
					},
					{ name: "Booster", value: `${Booster}`, inline: true },
					{
						name: "Top Roles",
						value: `${topRoles.join("")}`,
						inline: false,
					},
					{
						name: "Created",
						value: `<t:${creationTime}:R>`,
						inline: true,
					},
					{
						name: "Joined",
						value: `<t:${joinTime}:R>`,
						inline: true,
					},
					{
						name: "Identifier",
						value: `${member.user.id}`,
						inline: false,
					},
					{
						name: "Avatar",
						value: `[Link](${member.displayAvatarURL()})`,
						inline: true,
					},
					{
						name: "Banner",
						value: `[Link](${(await member.user.fetch()).bannerURL()})`,
						inline: true,
					},
				]);

			interaction.editReply({
				embeds: [Embed],
				files: [imageAttachment],
			});
		} catch (error) {
			interaction.editReply({
				content: "An error occcured while executing the command.",
			});
			throw error;
		}
	},
};

function addSuffix(number) {
	if (number % 100 >= 11 && number % 100 <= 13) return number + "th";
	switch (number % 10) {
		case 1:
			return number + "st";
		case 2:
			return number + "nd";
		case 3:
			return number + "rd";
	}
	return number + "th";
}

function addBadges(badgeNames) {
	if (!badgeNames.length) return [":x:"];
	const badgeMap = {
		ActiveDeveloper: "<:activedeveloper:1086251077873184778>",
		BugHunterLevel1: "<:discordbughunter1:1086251067685208075>",
		BugHunterLevel2: "<:discordbughunter2:1086251061729296465>",
		PremiumEarlySupporter: "<:discordearlysupporter:1086251057170087956>",
		Partner: "<:discordpartner:1086251046264901652>",
		Staff: "<:discordstaff:1086251041785380886>",
		HypeSquadOnlineHouse1: "<:hypesquadbravery:1086251034109820988>", // bravery
		HypeSquadOnlineHouse2: "<:hypesquadbrilliance:1086251031991701504>", // brilliance
		HypeSquadOnlineHouse3: "<:hypesquadbalance:1086251037817585705>", // balance
		Hypesquad: "<:hypesquadevents:1086251028334268489>",
		CertifiedModerator: "<:discordmod:1086251054804504666>",
		VerifiedDeveloper: "<:discordbotdev:1086251071665606686>",
	};

	return badgeNames.map((badgeName) => badgeMap[badgeName] || "❔");
}
