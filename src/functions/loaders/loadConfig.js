const { memberlog, welcomer, autorole } = require("../../database/schemas.js");

async function loadConfig(client) {
	(await memberlog.find()).forEach((doc) => {
		client.guildConfig.set(doc.Guild, {
			logChannel: doc.Channel,
		});
	});
	return;
}

module.exports = { loadConfig };
