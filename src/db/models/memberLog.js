const { Schema, model } = require("mongoose");

const memberLogSchema = new Schema({
  Guild: String,
  Channel: String,
  Toggle: String,
  MemberRole: String,
  BotRole: String,
});

module.exports = model("memberLog", memberLogSchema);
