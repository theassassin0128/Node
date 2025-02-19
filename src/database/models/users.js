const mongoose = require("mongoose");
const { t } = require("i18next");
const chalk = require("chalk");

const UserSchema = new mongoose.Schema(
	{
		_id: String,
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
 * @param {string} userId
 * @returns {Promise<import("@typings/index").UserSchema>}
 */
async function getUser(userId) {
	if (!userId) throw new Error(`${chalk.yellow("userId")} parameter is missing`);
	var userData = await model.findById(userId);

	if (!userData) {
		userData = new model({
			_id: user.id,
		});

		await userData.save();
	}

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
