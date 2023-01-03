const configDatabase = require("../../database/schemas/memberLog.js");

async function loadConfig(client) {
	(await configDatabase.find()).forEach((doc) => {
		client.guildConfig.set(doc.Guild, {
			logChannel: doc.logChannel,
			memberRole: doc.memberRole,
			botRole: doc.BotRole,
		});
	});
	return;
}

module.exports = { loadConfig };
