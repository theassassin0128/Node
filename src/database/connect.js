const { connect } = require("mongoose");

async function connectDB(DataBase) {
	if (!DataBase) return console.log("No URL provided for DataBase.");
	try {
		await connect(DataBase, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("database is connected.");
	} catch (error) {
		console.error(error);
	}
}

module.exports = { connectDB };
