const { EmbedBuilder, GuildMember, Message, MessageFlags } = require("discord.js");
const { t } = require("i18next");

/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "trackStart",
	player: true,
	/**
	 * @param {import("lavalink-client").Player} player
	 * @param {import("lavalink-client").Track} track
	 */
	execute: async (client, player, track) => {
		const guild = client.guilds.cache.get(player.guildId);
		if (!guild) return;

		if (!player.textChannelId) return;
		if (!track) return;

		/** @type {import("discord.js").GuildTextBasedChannel} */
		const channel = client.channels.cache.get(player.textChannelId);
		if (!channel) return;

		const embed = new EmbedBuilder()
			.setAuthor({
				name: "Now Playing",
				iconURL:
					client.config.media.icons[track.info.sourceName] ??
					client.user?.displayAvatarURL({ extension: "png" }),
			})
			.setColor(client.config.colors.Main)
			.setDescription(`**[${track.info.title}](${track.info.uri})**`)
			.setFooter({
				text: `Requested by ${track.requester.username}`,
				iconURL: track.requester?.avatarURL,
			})
			.setThumbnail(track.info.artworkUrl)
			.addFields(
				{
					name: "Duration",
					value: track.info.isStream
						? "LIVE"
						: client.lavalink.formatTime(track.info.duration),
					inline: true,
				},
				{
					name: "Author",
					value: track.info.author,
					inline: true,
				},
			)
			.setTimestamp();

		const message = await channel.send({
			embeds: [embed],
			components: [client.lavalink.createButtonRow(player)],
		});

		createCollector(client, message, player, track, embed);

		player.set("messageId", message.id);

		// this.client.utils.updateStatus(this.client, guild.id);

		// const locale = await this.client.db.getLanguage(guild.id);

		// const setup = await this.client.db.getSetup(guild.id);
		//
		// if (setup?.textId) {
		// 	const textChannel = guild.channels.cache.get(setup.textId)
		// 	if (textChannel) {
		// 		await trackStart(setup.messageId, textChannel, player, track, this.client, locale);
		// 	}
		// } else {
		//	const message = await channel.send({
		//		embeds: [embed],
		//		components: [createButtonRow(player)],
		//	});
		//
		//}
	},
};

/**
 * A function to create a message componnent collector for music buttons
 * @param {import("@lib/DiscordClient").DiscordClient} client
 * @param {Message} message
 * @param {import("lavalink-client").Player} player
 * @param {import("lavalink-client").Track} track
 * @param {EmbedBuilder} embed
 * @returns {void}
 */
function createCollector(client, message, player, track, embed) {
	const collector = message.createMessageComponentCollector({
		filter: async (b) => {
			if (b.member instanceof GuildMember) {
				const isSameVoiceChannel =
					b.guild?.members.me?.voice.channelId === b.member.voice.channelId;
				if (isSameVoiceChannel) return true;
			}
			await b.reply({
				content: `You are not connected to <#${
					b.guild?.members.me?.voice.channelId ?? "None"
				}> to use these buttons.`,
				flags: MessageFlags.Ephemeral,
			});
			return false;
		},
	});

	collector.on("collect", async (interaction) => {
		//if (!(await checkDj(client, interaction))) {
		//  await interaction.reply({
		//    content: T(locale, "player.trackStart.need_dj_role"),
		//    flags: MessageFlags.Ephemeral
		//  });
		//  return;
		//}

		const editMessage = async (text) => {
			if (message) {
				await message.edit({
					embeds: [
						embed.setFooter({
							text,
							iconURL: interaction.user.avatarURL({}),
						}),
					],
					components: [client.lavalink.createButtonRow(player)],
				});
			}
		};

		switch (interaction.customId) {
			case "previous":
				{
					if (player.previous) {
						await interaction.deferUpdate();
						player.play({
							track: player.queue.previous,
						});
						await editMessage(`Previous by ${interaction.user.tag}`);
					} else {
						await interaction.reply({
							content: "There is no previous song.",
							flags: MessageFlags.Ephemeral,
						});
					}
				}
				break;
			case "resume":
				{
					if (player.paused) {
						player.resume();
						await interaction.deferUpdate();
						await editMessage(`Resumed by ${interaction.user.tag}`);
					} else {
						player.pause();
						await interaction.deferUpdate();
						await editMessage(`Paused by ${interaction.user.tag}`);
					}
				}
				break;
			case "stop": {
				player.stopPlaying(true, false);
				await interaction.deferUpdate();
				break;
			}
			case "skip":
				{
					if (player.queue.tracks.length > 0) {
						await interaction.deferUpdate();
						player.skip();
						await editMessage(`Skipped by ${interaction.user.tag}`);
					} else {
						await interaction.reply({
							content: "There is no more song in the queue.",
							flags: MessageFlags.Ephemeral,
						});
					}
				}
				break;
			case "loop": {
				await interaction.deferUpdate();
				switch (player.repeatMode) {
					case "off": {
						player.setRepeatMode("track");
						await editMessage(`Looping by ${interaction.user.tag}`);
						break;
					}
					case "track": {
						player.setRepeatMode("queue");
						await editMessage(`Looping Queue by ${interaction.user.tag}`);
						break;
					}
					case "queue": {
						player.setRepeatMode("off");
						await editMessage(`Looping Off by ${interaction.user.tag}`);
						break;
					}
				}
				break;
			}
		}
	});
}

/*

//import { trackStart } from '../../utils/SetupSystem';

/*
		"requested_by": "Requested by {user}",
		"duration": "Duration",
		"author": "Author",
		"need_dj_role": "You need to have the DJ role to use this command.",
		*/

/*
export async function checkDj(
	client: Lavamusic,
	interaction:
		| ButtonInteraction<'cached'>
		| StringSelectMenuInteraction<'cached'>
		| UserSelectMenuInteraction<'cached'>
		| RoleSelectMenuInteraction<'cached'>
		| MentionableSelectMenuInteraction<'cached'>
		| ChannelSelectMenuInteraction<'cached'>,
): Promise<boolean> {
	const dj = await client.db.getDj(interaction.guildId);
	if (dj?.mode) {
		const djRole = await client.db.getRoles(interaction.guildId);
		if (!djRole) return false;
		const hasDjRole = interaction.member.roles.cache.some(role => djRole.map(r => r.roleId).includes(role.id));
		if (!(hasDjRole || interaction.member.permissions.has(PermissionFlagsBits.ManageGuild))) {
			return false;
		}
	}
	return true;
}

*/
