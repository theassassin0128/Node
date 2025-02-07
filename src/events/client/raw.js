/** @type {import("@types/event").EventStructure} */
module.exports = {
	name: "raw",
	once: false,
	execute: async (client, data) => {
		if (client.config.plugins.music.enabled) {
			// sending raw voice data to the music player;
			client.lavalink.sendRawData(data);
		}
	},
};
