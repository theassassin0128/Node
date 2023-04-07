const { loadFiles } = require("../loaders/loadFiles.js");

async function loadEvents(client) {
  console.time("Events load time");

  client.events = new Map();
  const events = new Array();

  const files = await loadFiles("src/events");

  for (const file of files) {
    try {
      const event = require(file);
      const execute = (...args) => event.execute(...args, client);
      const target = event.rest ? client.rest : client;

      target[event.once ? "once" : "on"](event.name, execute);
      client.events.set(event.name, execute);

      events.push({
        Event: file.split("/").pop().slice(0, -3) + ".js",
        Status: "✅️",
      });
    } catch (error) {
      events.push({
        Event: file.split("/").pop().slice(0, -3),
        Status: "❌️",
      });
    }
  }

  console.table(events, ["Event", "Status"]);
  console.info("\x1b[36m%s\x1b[0m", "Loaded Events.");
  console.timeEnd("Events load time");
}

module.exports = { loadEvents };
