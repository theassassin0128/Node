const {
	ButtonBuilder,
	ButtonStyle,
	ActionRowBuilder,
	ActionRow,
	User,
} = require("discord.js");
const { LavalinkManager } = require("lavalink-client");

class LavalinkPlayer extends LavalinkManager {
	/**
	 * Base client to manage lavalink nodes and players
	 * @param {import("@lib/DiscordClient").DiscordClient} client
	 */
	constructor(client) {
		super({
			nodes: client.config.plugins.music.lavalinkNodes,
			sendToShard: (guildId, payload) =>
				client.guilds.cache.get(guildId)?.shard?.send(payload),
			autoSkip: true,
			emitNewSongsOnly: true,
			playerOptions: {
				maxErrorsPerTime: {
					threshold: 10_000,
					maxAmount: 3,
				},
				minAutoPlayMs: 10_000,
				applyVolumeAsFilter: false,
				clientBasedPositionUpdateInterval: 50,
				defaultSearchPlatform: client.config.plugins.music.defaultSource,
				requesterTransformer: client.utils.requesterTransformer,
				onDisconnect: {
					autoReconnect: true,
					destroyPlayer: false,
				},
				onEmptyQueue: {
					destroyAfterMs: 30_000,
					autoPlayFunction: autoPlayFunction,
				},
				useUnresolvedData: true,
			},
			queueOptions: {
				maxPreviousTracks: 25,
			},
			linksAllowed: true,
		});

		this.client = client;
	}

	/**
	 * Searches for a song and returns the tracks.
	 * @param {string} query The query to search for.
	 * @param {User} user The user who requested the search.
	 * @param  {import("lavalink-client").SearchPlatform} [source] The source to search in. Defaults to youtube.
	 * @returns {Promise<import("lavalink-client").SearchResult>} An array of tracks that match the query.
	 */
	async search(query, user, source) {
		const nodes = this.nodeManager.leastUsedNodes();
		const node = nodes[Math.floor(Math.random() * nodes.length)];
		const result = await node.search({ query, source }, user, false);
		return result;
	}

	/**
	 * A function to return duration of a song in a formated way
	 * @param {number} number in milliseconds
	 * @returns {string} formatted time string
	 */
	formatTime(number) {
		const h = Math.floor(number / 3600000) % 24;
		const m = Math.floor(number / 60000) % 60;
		const s = Math.floor(number / 1000) % 60;
		const string = `${h ? `${h}:` : ""}${m ? `${m}:` : ""}${s} `;

		return string;
	}

	/**
	 * A funtion to create buttons for the player
	 * @param {import("lavalink-client").Player} player
	 * @returns {ActionRow}
	 */
	createButtonRow(player) {
		const previousButton = new ButtonBuilder()
			.setCustomId("previous")
			.setEmoji(this.client.config.emojis.music.previous)
			.setStyle(ButtonStyle.Secondary)
			.setDisabled(!player.queue.previous);

		const resumeButton = new ButtonBuilder()
			.setCustomId("resume")
			.setEmoji(
				player.paused
					? this.client.config.emojis.music.resume
					: this.client.config.emojis.music.pause,
			)
			.setStyle(player.paused ? ButtonStyle.Success : ButtonStyle.Secondary);

		const stopButton = new ButtonBuilder()
			.setCustomId("stop")
			.setEmoji(this.client.config.emojis.music.stop)
			.setStyle(ButtonStyle.Danger);

		const skipButton = new ButtonBuilder()
			.setCustomId("skip")
			.setEmoji(this.client.config.emojis.music.next)
			.setStyle(ButtonStyle.Secondary);

		const loopButton = new ButtonBuilder()
			.setCustomId("loop")
			.setEmoji(
				player.repeatMode === "track"
					? this.client.config.emojis.music.loop2
					: this.client.config.emojis.music.loop,
			)
			.setStyle(
				player.repeatMode !== "off" ? ButtonStyle.Success : ButtonStyle.Secondary,
			);

		return new ActionRowBuilder().addComponents(
			resumeButton,
			previousButton,
			stopButton,
			skipButton,
			loopButton,
		);
	}
}

/**
 * A function to add new songs to an empty queue if autoplay feature is enabled
 * @param {import("lavalink-client").Player} player The player instance.
 * @param {import("lavalink-client").Track} lastTrack The last played track.
 * @returns {Promise<void>} A promise that resolves when the function is done.
 */
async function autoPlayFunction(player, lastTrack) {
	if (!player.get("autoplay")) return;
	if (!lastTrack) return;

	if (lastTrack.info.sourceName === "spotify") {
		const filtered = player.queue.previous
			.filter((v) => v.info.sourceName === "spotify")
			.slice(0, 5);
		const ids = filtered.map(
			(v) =>
				v.info.identifier ||
				v.info.uri.split("/")?.reverse()?.[0] ||
				v.info.uri.split("/")?.reverse()?.[1],
		);

		if (ids.length >= 2) {
			const res = await player
				.search(
					{
						query: `seed_tracks=${ids.join(",")}`,
						source: "sprec",
					},
					lastTrack.requester,
				)
				.then((response) => {
					response.tracks = response.tracks.filter(
						(v) => v.info.identifier !== lastTrack.info.identifier,
					);

					return response;
				})
				.catch(console.warn);

			if (res && res.tracks.length > 0)
				await player.queue.add(
					res.tracks.slice(0, 5).map((track) => {
						track.pluginInfo.clientData = {
							...(track.pluginInfo.clientData || {}),
							fromAutoplay: true,
						};
						return track;
					}),
				);
		}

		return;
	}

	if (
		lastTrack.info.sourceName === "youtube" ||
		lastTrack.info.sourceName === "youtubemusic"
	) {
		const res = await player
			.search(
				{
					query: `https://www.youtube.com/watch?v=${lastTrack.info.identifier}&list=RD${lastTrack.info.identifier}`,
					source: "youtube",
				},
				lastTrack.requester,
			)
			.then((response) => {
				response.tracks = response.tracks.filter(
					(v) => v.info.identifier !== lastTrack.info.identifier,
				);

				return response;
			})
			.catch(console.warn);

		if (res && res.tracks.length > 0)
			await player.queue.add(
				res.tracks.slice(0, 5).map((track) => {
					track.pluginInfo.clientData = {
						...(track.pluginInfo.clientData || {}),
						fromAutoplay: true,
					};

					return track;
				}),
			);

		return;
	}

	if (lastTrack.info.sourceName === "jiosaavn") {
		const res = await player.search(
			{ query: `jsrec:${lastTrack.info.identifier}`, source: "jsrec" },
			lastTrack.requester,
		);

		if (res.tracks.length > 0) {
			const track = res.tracks.filter(
				(v) => v.info.identifier !== lastTrack.info.identifier,
			)[0];
			await player.queue.add(track);
		}
	}

	return;
}

module.exports = { LavalinkPlayer };
