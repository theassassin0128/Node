const { model, Schema } = require("mongoose");

module.exports = model(
	"member",
	new Schema({
		Guild: String,
		memberLogChannel: String,
	})
);
