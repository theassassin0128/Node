const chalk = require("chalk");
const { EmbedBuilder, WebhookClient } = require("discord.js");

class Utils {
	/**
	 * Typing the client for use in util functions
	 * @param {import("@lib/DiscordClient.js").DiscordClient} client
	 */
	constructor(client) {
		this.client = client;
	}

	/**
	 * A function to get table border in provided color
	 * @type {import("@types/functions.d.ts").GetTableBorder}
	 * @example client.functions.getTableBorder(color);
	 */
	getTableBorder(color) {
		const border = {};
		Object.keys(this.client.config.table.border).forEach((key) => {
			border[key] = chalk[color](this.client.config.table.border[key]);
		});
		return border;
	}

	/**
	 * Checks if a string contains a URL
	 * @type {import("@types/functions").ContainsLink}
	 * @example client.functions.containsLink(text);
	 */
	containsLink(text) {
		return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
			text,
		);
	}

	/**
	 * Checks if a string is a valid discord invite
	 * @type {import("@types/functions").ContainsDiscordInvite}
	 * @example client.functions.containsDiscordInvite(text);
	 */
	containsDiscordInvite(text) {
		return /(https?:\/\/)?(www.)?(discord.(gg|io|me|li|link|plus)|discorda?p?p?.com\/invite|invite.gg|dsc.gg|urlcord.cf)\/[^\s/]+?(?=\b)/.test(
			text,
		);
	}

	/**
	 * Returns a random number below a max
	 * @type {import("@types/functions").GetRandomInt}
	 * @example client.functions.getRandomInt(max);
	 */
	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	/**
	 * Return a random color from colors.json
	 * @type {import("@types/functions").GetRandomColor}
	 * @example client.functions.getRandomColor();
	 */
	getRandomColor() {
		const colorsArray = Object.values(this.client.config.colors);
		return colorsArray[Math.floor(Math.random() * colorsArray.length)];
	}

	/**
	 * Checks if a string is a valid Hex color
	 * @type {import("@types/functions").IsHex}
	 * @example client.functions.isHex(text);
	 */
	isHex(text) {
		return /^#[0-9A-F]{6}$/i.test(text);
	}

	/**
	 * Checks if a string is a valid color
	 * @type {import("@types/functions").IsValidColor}
	 * @example client.functions.isValidColor(text);
	 */
	isValidColor(text) {
		return this.client.config.colors.includes(text);
	}

	/**
	 * Returns hour difference between two dates
	 * @type {import("@types/functions").DiffHours}
	 * @example client.functions.diffHours(Date2, Date1);
	 */
	diffHours(dt2, dt1) {
		const diff = (dt2.getTime() - dt1.getTime()) / 1000 / 60 / 60;
		return Math.abs(Math.round(diff));
	}

	/**
	 * Returns remaining time in days, hours, minutes and seconds
	 * @type {import("@types/functions").Timeformat}
	 * @example client.functions.timeFormat(timeInMillis);
	 */
	timeFormat(timeInMillis) {
		const days = Math.floor(timeInMillis / 86400000);
		const hours = Math.floor(timeInMillis / 3600000) % 24;
		const minutes = Math.floor(timeInMillis / 60000) % 60;
		const seconds = Math.floor(timeInMillis / 1000) % 60;
		return (
			(days > 0 ? `${days} days, ` : "") +
			(hours > 0 ? `${hours} hours, ` : "") +
			(minutes > 0 ? `${minutes} minutes, ` : "") +
			(seconds > 0 ? `${seconds} seconds` : "")
		);
	}

	/**
	 * Converts duration to milliseconds
	 * @type {import("@types/functions").DurationToMillis}
	 * @example client.functions.durationToMillis(duration);
	 */
	durationToMillis(duration) {
		return (
			duration
				.split(":")
				.map(Number)
				.reduce((acc, curr) => curr + acc * 60) * 1000
		);
	}

	/**
	 * Returns time remaining until provided date
	 * @type {import("@types/functions").GetRemainingTime}
	 * @example client.functions.getRemainingTime(timeUntil);
	 */
	getRemainingTime(timeUntil) {
		const seconds = Math.abs((timeUntil - new Date()) / 1000);
		return this.timeFormat(seconds * 1000);
	}

	/**
	 * Takes a single or array of permissions and returns a formatted string
	 * @type {import("@types/functions").ParsePermissions}
	 * @example client.functions.parsePermissions(permissions);
	 */
	parsePermissions(p) {
		const word = ` permission${p.length > 1 ? "s" : ""}`;
		return `${p.map((perm) => `__**${perm}**__`).join(", ")}${word}`;
	}

	/**
	 * A function to transform a requester into a standardized requester object
	 * @param {any} requester The requester to transform.
	 * Can be a string, a user, or an object with the keys `id`, `username`, and `avatarURL`.
	 * @returns {import("@types/index").Requester} The transformed requester object.
	 */
	requesterTransformer(requester) {
		if (
			typeof requester === "object" &&
			"avatar" in requester &&
			Object.keys(requester).length === 3
		) {
			return requester;
		}

		if (typeof requester === "object" && "displayAvatarURL" in requester) {
			return {
				id: requester.id,
				username: requester.username,
				avatarURL: requester.displayAvatarURL({ extension: "png" }),
				discriminator: requester.discriminator,
			};
		}

		return { id: requester.toString(), username: "unknown" };
	}

	/**
	 * A function to get a users badge emojis
	 * @param {string[]} badges - user or member badge names
	 * This return an array of emojis for the provided badge names
	 * @returns {string[]}
	 */
	getBadges(badges) {
		if (!badges.length) return ["x"];
		return badges.map((badge) => this.client.config.emojis.custom[badge] || badge);
	}
}

module.exports = { Utils };

class Test {
	/** A function to send error to a discord channel
	 * @type {import("@types/functions").SendError}
	 * @example client.functions.sendError(error, type, data);
	 */
	async sendError(error, type, data) {
		if (!error) return;
		if (!this.client.database) return;

		const errStack = error?.stack ? error.stack : error;
		const webhookClient = process.env.ERROR_WEBHOOK_URL
			? new WebhookClient({
					url: process.env.ERROR_WEBHOOK_URL,
			  })
			: undefined;

		const embed = new EmbedBuilder()
			.setColor(this.client.config.colors.Wrong)
			.setTitle(`**An Error Occurred**`)
			.setDescription(
				`\`\`\`\n${
					errStack.length > 4000 ? errStack.substring(0, 4000) + "..." : errStack
				}\n\`\`\``,
			)
			.setFooter({
				text: `Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
					2,
				)} MB CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`,
			})
			.setTimestamp();

		return webhookClient
			.send({
				username: this.client.user?.tag || undefined,
				avatarURL: this.client.user?.avatarURL() || undefined,
				embeds: [embed],
			})
			.catch((error) => {
				console.log(
					chalk.yellow("[AntiCrash] | [Send_Error_Logs] | [Start] : ==============="),
				);
				console.log(chalk.red(error));
				console.log(
					chalk.yellow("[AntiCrash] | [Send_Error_Logs] | [End] : ==============="),
				);
			});
	}
}
