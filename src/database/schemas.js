const { model, Schema } = require("mongoose");

const memberlog = model(
	"memberlog",
	new Schema({
		Guild: String,
		Channel: String,
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
const infractions = model(
	"Infractions",
	new Schema({
		Guild: String,
		User: String,
		Infractions: Array,
	})
);

module.exports = { memberlog, welcomer, autorole, infractions };
