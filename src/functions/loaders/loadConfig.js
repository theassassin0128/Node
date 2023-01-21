const configDatabase = require("../../database/schemas/logs/member.js");

async function loadConfig(client) {
	(await configDatabase.find()).forEach((doc) => {
		client.guildConfig.set(doc.Guild, {
			memberLogChannel: doc.memberLogChannel,
			welcomeChannel: doc.welcommeChannel,
			moderationLogChanne: doc.moderationLogChannel,
		});
	});
	return;
}

module.exports = { loadConfig };
