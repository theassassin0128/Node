/** @type {import("@types/index").EventStructure} */
module.exports = {
  name: "raw",
  once: false,
  async execute(client, data) {
    // sending raw voice data to the music player;
    if (client.lavalink) client.lavalink.sendRawData(data);
  }
};
