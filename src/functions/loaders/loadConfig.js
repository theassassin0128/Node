const {
	memberlog,
	welcomer,
	autorole,
} = require("../../database/schemas/system.js");

async function loadConfig(client) {
	(await memberlog.find()).forEach((doc) => {
		client.guildConfig.set(doc.Guild, {
			logChannel: doc.Channel,
		});
	});
	(await welcomer.find()).forEach((doc) => {
		client.guildConfig.set(doc.Guild, {
			welcomeChannel: doc.Channel,
		});
	});
	(await autorole.find()).forEach((doc) => {
		client.guildConfig.set(doc.Guild, {
			memberRole: doc.memberRole,
			botRole: doc.botRole,
		});
	});
	return;
}

module.exports = { loadConfig };
