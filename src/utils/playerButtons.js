const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

/**
 * typings for the parameters
 * @param {import("lavalink-client").Player} player
 * @returns {ActionRowBuilder[]}
 */
function createPlayerButtons(player) {
	const { music } = require("@src/config");

	const volumeDown = new ButtonBuilder()
		.setCustomId("volumedown")
		.setLabel("Down")
		.setEmoji(music.emojis.volumeDown)
		.setStyle(ButtonStyle.Secondary)
		.setDisabled(player.volume === music.minVolume);

	const back = new ButtonBuilder()
		.setCustomId("back")
		.setLabel("previous")
		.setEmoji(music.emojis.previous)
		.setStyle(ButtonStyle.Secondary);

	const resume = new ButtonBuilder()
		.setCustomId("resume")
		.setLabel(player.paused ? "Resume" : "Pause")
		.setEmoji(player.paused ? music.emojis.resume : music.emojis.pause)
		.setStyle(player.paused ? ButtonStyle.Success : ButtonStyle.Secondary);

	const next = new ButtonBuilder()
		.setCustomId("next")
		.setLabel("Next")
		.setEmoji(music.emojis.next)
		.setStyle(ButtonStyle.Secondary);

	const volumeUp = new ButtonBuilder()
		.setCustomId("volumeup")
		.setLabel("Up")
		.setEmoji(music.emojis.volumeUp)
		.setStyle(ButtonStyle.Secondary)
		.setDisabled(player.volume === music.maxVolume);

	const shuffle = new ButtonBuilder()
		.setCustomId("shuffle")
		.setLabel("Shuffle")
		.setEmoji(music.emojis.shuffle)
		.setStyle(ButtonStyle.Secondary);

	const loop = new ButtonBuilder()
		.setCustomId("loop")
		.setLabel("Loop")
		.setEmoji(player.repeatMode === "track" ? music.emojis.loop2 : music.emojis.loop)
		.setStyle(player.repeatMode !== "off" ? ButtonStyle.Success : ButtonStyle.Secondary);

	const stop = new ButtonBuilder()
		.setCustomId("stop")
		.setLabel("Stop")
		.setEmoji(music.emojis.stop)
		.setStyle(ButtonStyle.Secondary);

	const autoplay = new ButtonBuilder()
		.setCustomId("autoplay")
		.setLabel("Autoplay")
		.setEmoji(music.emojis.autoPlay)
		.setStyle(ButtonStyle.Secondary);

	const queue = new ButtonBuilder()
		.setCustomId("queue")
		.setLabel("Queue")
		.setEmoji(music.emojis.queue)
		.setStyle(ButtonStyle.Secondary);

	return [
		new ActionRowBuilder().addComponents(volumeDown, back, resume, next, volumeUp),
		new ActionRowBuilder().addComponents(shuffle, loop, stop, autoplay, queue),
	];
}

module.exports = createPlayerButtons;
