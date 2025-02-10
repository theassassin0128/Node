const chalk = require("chalk");
const { EmbedBuilder, Collection } = require("discord.js");

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
	 * @param {import("@types/index").ChalkColors} color
	 * @returns {object}
	 * @example client.utils.getTableBorder(color);
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
	 * @param {string} text - the text to check
	 * @returns {boolean}
	 * @example client.utils.containsLink(text);
	 */
	containsLink(text) {
		return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
			text,
		);
	}

	/**
	 * Checks if a string is a valid discord invite
	 * @param {string} text - the text to check
	 * @returns {boolean}
	 * @example client.utils.containsDiscordInvite(text);
	 */
	containsDiscordInvite(text) {
		return /(https?:\/\/)?(www.)?(discord.(gg|io|me|li|link|plus)|discorda?p?p?.com\/invite|invite.gg|dsc.gg|urlcord.cf)\/[^\s/]+?(?=\b)/.test(
			text,
		);
	}

	/**
	 * Returns a random number below a max
	 * @param {number} max
	 * @returns {string}
	 * @example client.utils.getRandomInt(max);
	 */
	getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}

	/**
	 * Return a random color from colors.json
	 * @return {string}
	 * @example client.utils.getRandomColor();
	 */
	getRandomColor() {
		const colorsArray = Object.values(this.client.config.colors);
		return colorsArray[Math.floor(Math.random() * colorsArray.length)];
	}

	/**
	 * Checks if a string is a valid Hex color
	 * @param {string} text
	 * @returns {boolean}
	 * @example client.utils.isHex(text);
	 */
	isHex(text) {
		return /^#[0-9A-F]{6}$/i.test(text);
	}

	/**
	 * Checks if a string is a valid color
	 * @param {string} text
	 * @return {boolean}
	 * @example client.utils.isValidColor(text);
	 */
	isValidColor(text) {
		return this.client.config.colors.includes(text);
	}

	/**
	 * Returns hour difference between two dates
	 * @param {Date} date1
	 * @param {Date} date2
	 * @example client.utils.diffHours(Date1, Date2);
	 */
	diffHours(date1, date2) {
		const diff = (date1.getTime() - date2.getTime()) / 1000 / 60 / 60;
		return Math.abs(Math.round(diff));
	}

	/**
	 * Returns remaining time in days, hours, minutes and seconds
	 * @param {number} timeInMillis
	 * @returns {string}
	 * @example client.utils.timeFormat(timeInMillis);
	 */
	timeFormat(timeInMillis) {
		const days = Math.floor(timeInMillis / 86400000);
		const hours = Math.floor(timeInMillis / 3600000) % 24;
		const minutes = Math.floor(timeInMillis / 60000) % 60;
		const seconds = Math.floor(timeInMillis / 1000) % 60;
		return (
			(days > 0 ? `${days} Days, ` : "") +
			(hours > 0 ? `${hours} Hrs, ` : "") +
			(minutes > 0 ? `${minutes} Mins, ` : "") +
			(seconds > 0 ? `${seconds} Secs` : "")
		);
	}

	/**
	 * Converts duration to milliseconds
	 * @param {string} duration
	 * @returns {number}
	 * @example client.utils.durationToMillis(duration);
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
	 * Returns remaining time in millisecons until provided date
	 * @param {Date} timeUntil
	 * @returns {string}
	 * @example client.utils.getRemainingTime(timeUntil);
	 */
	getRemainingTime(timeUntil) {
		const seconds = Math.abs((timeUntil - new Date()) / 1000);
		return this.timeFormat(seconds * 1000);
	}

	/**
	 * Takes a single or array of permissions and returns a formatted string
	 * @param {import("discord.js").PermissionResolvable[]} p
	 * @returns {string}
	 * @example client.utils.parsePermissions(permissions);
	 */
	parsePermissions(p) {
		const word = ` permission${p.length > 1 ? "s" : ""}`;
		return `${p.map((perm) => `\`${perm}\``).join(", ")}${word}`;
	}

	/**
	 * A function to get a users badge emojis
	 * @deprecated required manual work. You have to manually set emojis for each badge
	 * @param {string[]} badges - user or member badge names
	 * @returns {string[]} an array of emojis for the provided badge names
	 * @example client.utils.getBadges(client.user.falgs.toArray())
	 */
	getBadges(badges) {
		if (!badges.length) return ["x"];
		return badges.map((badge) => this.client.config.emojis.custom[badge] || badge);
	}

	/**
	 * A function to set, get and delete command cooldowns
	 * @param {import("@types/command").CommandStructure} command - the command object
	 * @param {string} userId - the userId
	 * @returns {number} expiration timestamp (in seconds)
	 */
	getCooldown(command, userId) {
		const { config, cooldowns } = this.client;
		const timestamps = cooldowns.get(command.data.name);
		if (!timestamps) return 0;

		const now = Date.now();
		const cooldownAmount = (command.cooldown ?? config.bot.defaultCooldown) * 1000;

		if (!timestamps.has(userId)) {
			timestamps.set(userId, now);
			setTimeout(() => timestamps.delete(userId), cooldownAmount);
			return 0;
		}

		const expirationTime = timestamps.get(userId) + cooldownAmount;
		if (now < expirationTime) return Math.floor(expirationTime / 1000);

		timestamps.set(userId, now);
		return 0;
	}

	/**
	 * A function to send errors to discord
	 * @param {Error} error
	 * @param {*} data
	 * @returns {Promise<void>}
	 */
	async sendErrors(error, data) {
		if (!error) return;
		if (!this.client.database) return;

		const errStack = error?.stack ? error.stack : error;

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

module.exports = { Utils };
