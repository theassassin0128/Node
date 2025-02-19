const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const config = require("@src/config");

/**
 * typings for the parameters
 * @param {import("lavalink-client").Player} player
 * @returns {ActionRowBuilder[]}
 */
function createPlayerButtons(player) {
	const { music } = config.emojis;

	const volumeDown = new ButtonBuilder()
		.setCustomId("volumedown")
		.setLabel("Down")
		.setEmoji(music.volumeDown)
		.setStyle(ButtonStyle.Secondary)
		.setDisabled(player.volume === config.music.minVolume);

	const back = new ButtonBuilder()
		.setCustomId("back")
		.setLabel("Back")
		.setEmoji(music.previous)
		.setStyle(ButtonStyle.Secondary);

	const resume = new ButtonBuilder()
		.setCustomId("resume")
		.setLabel(player.paused ? "Resume" : "Pause")
		.setEmoji(player.paused ? music.resume : music.pause)
		.setStyle(player.paused ? ButtonStyle.Success : ButtonStyle.Secondary);

	const next = new ButtonBuilder()
		.setCustomId("next")
		.setLabel("Next")
		.setEmoji(music.next)
		.setStyle(ButtonStyle.Secondary);

	const volumeUp = new ButtonBuilder()
		.setCustomId("volumeup")
		.setLabel("Up")
		.setEmoji(music.volumeUp)
		.setStyle(ButtonStyle.Secondary)
		.setDisabled(player.volume === config.music.maxVolume);

	const shuffle = new ButtonBuilder()
		.setCustomId("shuffle")
		.setLabel("Shuffle")
		.setEmoji(music.shuffle)
		.setStyle(ButtonStyle.Secondary);

	const loop = new ButtonBuilder()
		.setCustomId("loop")
		.setLabel("Loop")
		.setEmoji(player.repeatMode === "track" ? music.loop2 : music.loop)
		.setStyle(player.repeatMode !== "off" ? ButtonStyle.Success : ButtonStyle.Secondary);

	const stop = new ButtonBuilder()
		.setCustomId("stop")
		.setLabel("Stop")
		.setEmoji(music.stop)
		.setStyle(ButtonStyle.Danger);

	const autoplay = new ButtonBuilder()
		.setCustomId("autoplay")
		.setLabel("Autoplay")
		.setEmoji(music.autoPlay)
		.setStyle(ButtonStyle.Secondary);

	const queue = new ButtonBuilder()
		.setCustomId("queue")
		.setLabel("Queue")
		.setEmoji(music.queue)
		.setStyle(ButtonStyle.Secondary);

	return [
		new ActionRowBuilder().addComponents(volumeDown, back, resume, next, volumeUp),
		new ActionRowBuilder().addComponents(shuffle, loop, stop, autoplay, queue),
	];
}

module.exports = createPlayerButtons;
