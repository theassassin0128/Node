const mongoose = require("mongoose");
const { t } = require("i18next");
const config = require("@src/config.js");
const chalk = require("chalk");

const UserSchema = new mongoose.Schema(
	{
		_id: String,
		username: String,
		discriminator: String,
		coins: { type: Number, default: 0 },
		bank: { type: Number, default: 0 },
		reputation: {
			received: { type: Number, default: 0 },
			given: { type: Number, default: 0 },
			timestamp: Date,
		},
		daily: {
			streak: { type: Number, default: 0 },
			timestamp: Date,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	},
);

const model = mongoose.model("user", UserSchema);

/**
 * @param {import('discord.js').User} user
 * @returns {Promise<import("@types/database.js").UserSchema>}
 */
async function getUser(user) {
	if (!user) {
		throw new Error(t("errors:missing.param", { param: chalk.yellow("user") }));
	}

	if (!user.id) {
		throw new Error(t("errors:missing.property", { property: chalk.yellow("user.id") }));
	}

	let changes = false;
	let userData = await model.findById(user.id);

	if (!userData) {
		userData = new model({
			_id: user.id,
			username: user.username,
			discriminator: user.discriminator,
		});

		await userData.save();
	}

	if (userData.username !== user.username) {
		userData.username = user.username;
		changes = true;
	}

	if (userData.discriminator !== user.discriminator) {
		userData.discriminator = user.discriminator;
		changes = true;
	}

	if (changes) await userData.save();

	return userData;
}

async function getReputationLevel(limit = 10) {
	return model
		.find({
			"reputation.received": { $gt: 0 },
		})
		.sort({
			"reputation.received": -1,
			"reputation.given": 1,
		})
		.limit(limit)
		.lean();
}

module.exports = { model, getUser, getReputationLevel };
