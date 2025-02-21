const chalk = require("chalk");
const mongoose = require("mongoose");
const config = require("@src/config.js");

const GuildSchema = new mongoose.Schema({
	_id: { type: String, required: true },
	data: {
		name: String,
		ownerId: { type: String, ref: "users" },
		joinedAt: Date,
		leftAt: Date,
	},
	locale: { type: String, default: config.defaultLocale },
	rank: {
		enabled: { type: Boolean, default: false },
		rank_message: { type: String, default: config.rank.defaultLevelUpMessage },
		channel_id: String,
	},
	ticket: {
		enabled: { type: Boolean, default: false },
		channel_id: String,
		limit: { type: Number, default: 10 },
		categories: [
			{
				_id: false,
				name: String,
				staff_roles: [String],
			},
		],
	},
	automod: {
		enabled: { type: Boolean, default: false },
		debug: Boolean,
		strikes: { type: Number, default: 10 },
		action: { type: String, default: "TIMEOUT" },
		wh_channels: [String],
		anti_attachments: Boolean,
		anti_invites: Boolean,
		anti_links: Boolean,
		anti_spam: Boolean,
		anti_ghostping: Boolean,
		anti_massmention: Number,
		max_lines: Number,
	},
	invite: {
		tracking: { type: Boolean, default: false },
		ranks: [
			{
				_id: { type: String, require: true },
				invite: { type: Number, require: true },
			},
		],
	},
	moderation: {
		channel_id: String,
		max_warn: {
			action: {
				type: String,
				enum: ["TIMEOUT", "KICK", "BAN"],
				default: "KICK",
			},
			limit: { type: Number, default: 5 },
		},
	},
	counters: [
		{
			_id: false,
			counter_type: String,
			name: String,
			channel_id: String,
		},
	],
	welcome: {
		enabled: { type: Boolean, default: false },
		channel_id: String,
		content: String,
		embed: {
			author: { name: String, icon_url: String },
			title: String,
			description: String,
			color: String,
			thumbnail: String,
			image: String,
			footer: { text: String, icon_url: String },
		},
	},
	farewell: {
		enabled: { type: Boolean, default: false },
		channel_id: String,
		content: String,
		embed: {
			author: { name: String, icon_url: String },
			description: String,
			color: String,
			thumbnail: String,
			image: String,
			footer: { text: String, icon_url: String },
		},
	},
	autorole: {
		bot: [String],
		member: [String],
	},
	suggestions: {
		enabled: { type: Boolean, default: false },
		channel_id: String,
		approved_channel: String,
		rejected_channel: String,
		staff_roles: [String],
	},
});

const model = mongoose.model("guild", GuildSchema);

/**
 * A function to get stored guild data friom database
 * @param {import('discord.js').Guild} guild
 */
async function getGuild(guild) {
	if (!guild) throw new Error(`${chalk.yellow("guild")} parameter is missing`);
	if (!guild.id) throw new Error(`${chalk.yellow("guild.id")} property is missing`);

	var guildData = await model.findById(guild.id);

	if (!guildData) {
		guildData = new model({
			_id: guild.id,
			data: {
				name: guild.name,
				ownerId: guild.ownerId,
				joinedAt: guild.joinedAt,
			},
		});

		await guildData.save();
	}

	if (guildData.data.name !== guild.name) {
		guildData.data.name = guild.name;
		await guildData.save();
	}

	if (guildData.data.ownerId !== guild.ownerId) {
		guildData.data.ownerId = guild.ownerId;
		await guildData.save();
	}

	return guildData;
}

module.exports = { model, getGuild };
