/** @type {import("@typings/index").EventStructure} */
module.exports = {
	name: "raw",
	once: false,
	execute: async (client, data) => {
		// sending raw voice data to the music player;
		if (client.lavalink) client.lavalink.sendRawData(data);
	},
};
