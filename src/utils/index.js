//Exporting all the functions from single file for better accessibility
module.exports = {
	loadFiles: require("./loadFiles.js"),
	syncCommands: require("./syncCommands.js"),
	fatechCommands: require("./fetchCommands.js"),
	checkForChange: require("./checkForChange.js"),
};
