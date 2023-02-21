const { Schema, model } = require("mongoose");

const memberLogSchema = new Schema({
	Guild: String,
	Channel: String,
	Toggle: String,
	memberRole: String,
	botRole: String,
});

module.exports = model("memberLog", memberLogSchema);
