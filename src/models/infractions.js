const { Schema, model } = require("mongoose");

const infractionsSchema = new Schema({
  Guild: String,
  User: String,
  Infractions: Array,
});

module.exports = model("Infractions", infractionsSchema);
