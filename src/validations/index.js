const { EventNames } = require("./events.js");
const { Permissions } = require("./permissions.js");

module.exports = {
	EventNames,
	Permissions,
	validateSystem: require("./validateSystem.js"),
};
