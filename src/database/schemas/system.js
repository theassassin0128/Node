const { model, Schema } = require("mongoose");

const memberlog = model(
	"memberlog",
	new Schema({
		Guild: String,
		Channel: String,
	})
);
const welcomer = model(
	"welcomer",
	new Schema({
		Guild: String,
		Option: String,
		Data: Object,
	})
);
const autorole = model(
	"autorole",
	new Schema({
		Guild: String,
		memberRole: Array,
		botRole: String,
	})
);

module.exports = { memberlog, welcomer, autorole };
