const { Schema, model } = require("mongoose");

const welcomeSchema = new Schema({
	Guild: String,
	Channel: String,
	Toggle: String,
	Message: Object,
});

module.exports = model("welcome", welcomeSchema);
