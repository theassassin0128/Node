const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Client,
	GuildMember,
} = require("discord.js");
const moment = require("moment");
const { colour } = require("../../config.json");
const wait = require("timers/promises").setTimeout;
const { welcomer } = require("../../database/schemas.js");

module.exports = {
	name: "guildMemberAdd",
	/**
	 *
	 * @param {GuildMember} member
	 * @param {Client} client
	 * @returns
	 */
	execute: async (member, client) => {
		const gConfig = client.guildConfig.get(member.guild.id);
		if (!gConfig) return;

		const gRoles = member.guild.roles.cache;
		let assingRole = member.user.bot
			? gRoles.get(gConfig.botRole)
			: gRoles.get(gConfig.memberRole);

		if (!assingRole) assingRole = "Not Configured";
		else
			await member.roles.add(assingRole).catch(() => {
				assingRole = "Failed due to role hierarchy.";
			});

		const logChannel = (await member.guild.channels.fetch()).get(
			gConfig.logChannel
		);
		if (!logChannel) return;

		let color = colour.main;
		let risk = "Fairly Safe";

		const accountCreation = parseInt(member.user.createdTimestamp / 1000);
		const joiningTime = parseInt(member.joinedAt / 1000);

		const monthsAgo = moment().subtract(2, "months").unix();
		const weeksAgo = moment().subtract(2, "weeks").unix();
		const daysAgo = moment().subtract(2, "days").unix();

		if (accountCreation >= monthsAgo) {
			color = "#ffff00";
			risk = "Medium";
		}
		if (accountCreation >= weeksAgo) {
			color = "#ff8c00";
			risk = "High";
		}
		if (accountCreation >= daysAgo) {
			color = "#ff0000";
			risk = "Extreme";
		}

		const Embed = new EmbedBuilder()
			.setAuthor({
				name: member.user.tag,
				iconURL: member.displayAvatarURL({ dynamic: true }),
			})
			.setColor(color)
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
			.setDescription(
				[
					`• User : ${member.user}`,
					`• Account Type : ${member.user.bot ? "bot" : "user"}`,
					`• Role Assigned : ${assingRole}`,
					`• Risk Level : ${risk}\n`,
					`• Account Created :\n<t:${accountCreation}:D> | <t:${accountCreation}:R>`,
					`• Account Joined :\n<t:${joiningTime}:D> | <t:${joiningTime}:R>`,
				].join("\n")
			)
			.setFooter({ text: "Joined" })
			.setTimestamp();

		if (risk == "High" || risk == "Extreme") {
			const Buttons = new ActionRowBuilder().addComponents(
				new ButtonBuilder()
					.setCustomId(`Kick-${member.id}`)
					.setLabel("Kick")
					.setStyle(ButtonStyle.Danger),
				new ButtonBuilder()
					.setCustomId(`Ban-${member.id}`)
					.setLabel("Ban")
					.setStyle(ButtonStyle.Danger)
			);
			const log = await logChannel.send({
				embeds: [Embed],
				components: [Buttons],
			});
			await wait(12 * 60 * 60 * 1000);
			const message = (await logChannel.messages.fetch()).get(log.id);
			if (!message) return;
			message.edit({
				embeds: [Embed],
				components: [],
			});
		} else {
			logChannel.send({ embeds: [Embed] });
		}
	},
};
