const { EmbedBuilder, Client, GuildMember } = require("discord.js");
const moment = require("moment");
const { colour } = require("../../config.json");

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

		const Embed = new EmbedBuilder()
			.setAuthor({
				name: user.tag,
				iconURL: member.displayAvatarURL({ size: 1024 }),
			})
			.setColor(color)
			.setDescription(
				[
					`**<a:hi:1059777629332439060> Hey, ${user.username} we are happy to have you with us. We hope you will enjoy our server. If you have any doubts don't forget to let us know.`,
					`\n<a:pins:1059778507393212426> ${user} you are the ${guild.memberCount} member`,
					`\n<a:arrow_right_glow:1059777879644307548> <#1055079143752081448> Read and follow the rules.`,
					`<a:arrow_right_glow:1059777879644307548> <#1055079573680828456> Take some self roles.`,
					`<a:arrow_right_glow:1059777879644307548> <#1055079322030968832> For more information.`,
					`<a:arrow_right_glow:1059777879644307548> <#1055079798667481128> Start chatting.**`,
				].join("\n")
			)
			.setFooter({ text: "Joined" })
			.setTimestamp();

		channel.send({ content: `${user}`, embeds: [Embed] });
	},
};
