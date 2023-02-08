const { model, Schema } = require("mongoose");

const infractions = model(
	"Infractions",
	new Schema({
		Guild: String,
		User: String,
		Infractions: Array,
	})
);

module.exports = { infractions };
