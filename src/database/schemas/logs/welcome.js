const { model, Schema } = require("mongoose");

module.exports = model(
	"welcome",
	new Schema({
		Guild: String,
		wChannel: String,
		wMessage: String,
	})
);
