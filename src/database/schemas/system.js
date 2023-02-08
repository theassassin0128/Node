const { model, Schema } = require("mongoose");

const memberlog = model(
	"memberlogger",
	new Schema({
		Guild: String,
		Channel: String,
	})
);
const welcomer = model(
	"welcomer",
	new Schema({
		Guild: String,
		Channel: String,
		MessageContent: String,
		Embed: Object,
	})
);
const autorole = model(
	"autorole",
	new Schema({
		Guild: String,
		memberRole: String,
		botRole: String,
	})
);

module.exports = { memberlog, welcomer, autorole };
