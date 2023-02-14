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

module.exports = {
	name: "guildMemberAdd",
	/**
	 * @param {GuildMember} member
	 * @param {Client} client
	 * @returns
	 */
	execute: async (member, client) => {
		const { user, guild } = member;

		const channel = (await member.guild.channels.fetch()).get("");
		if (!channel) return;

		let color = colour.main;
		let risk = "Fairly Safe";
		let assingRole = "Not Configured.";

		const accountCreation = parseInt(user.createdTimestamp / 1000);
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
				name: user.tag,
				iconURL: member.displayAvatarURL({ size: 1024 }),
			})
			.setColor(color)
			.setThumbnail(member.user.displayAvatarURL({ size: 2048 }))
			.setDescription(
				[
					`• User : ${user}`,
					`• Account Type : ${user.bot ? "bot" : "user"}`,
					`• Role Assigned : ${assingRole}`,
					`• Risk Level : ${risk}\n`,
					`• Account Created :\n<t:${accountCreation}:D> | <t:${accountCreation}:R>`,
					`• Account Joined :\n<t:${joiningTime}:D> | <t:${joiningTime}:R>`,
				].join("\n")
			)
			.setFooter({ text: "Joined" })
			.setTimestamp();

		if (risk == "High" || risk == "Extreme") {
			const kickButton = new ButtonBuilder()
				.setCustomId(`Kick-${member.id}`)
				.setLabel("Kick")
				.setStyle(ButtonStyle.Danger);
			const banButton = new ButtonBuilder()
				.setCustomId(`Ban-${member.id}`)
				.setLabel("Ban")
				.setStyle(ButtonStyle.Danger);

			const Buttons = new ActionRowBuilder().addComponents(
				kickButton,
				banButton
			);
			const log = await channel.send({
				embeds: [Embed],
				components: [Buttons],
			});
			await wait(12 * 60 * 60 * 1000);
			const message = (await channel.messages.fetch()).get(log.id);
			if (!message) return;
			message.edit({
				embeds: [Embed],
				components: [
					new ActionRowBuilder().addComponents(
						kickButton.setDisabled(true),
						banButton.setDisabled(true)
					),
				],
			});
		} else {
			channel.send({ embeds: [Embed] });
		}
	},
};
