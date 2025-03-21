const mongoose = require("mongoose");
const TempGuildSchema = new mongoose.Schema(
  {
    ticket: {
      enabled: { type: Boolean, default: false },
      channel: String,
      limit: { type: Number, default: 10 },
      categories: [
        {
          _id: false,
          name: String,
          staffRoles: [String]
        }
      ]
    },
    automod: {
      enabled: { type: Boolean, default: false },
      debug: Boolean,
      strikes: { type: Number, default: 10 },
      action: { type: String, default: "TIMEOUT" },
      wh_channels: [String],
      anti_attachments: Boolean,
      anti_invites: Boolean,
      anti_links: Boolean,
      anti_spam: Boolean,
      anti_ghostping: Boolean,
      anti_massmention: Number,
      max_lines: Number
    },
    invite: {
      tracking: { type: Boolean, default: false },
      ranks: [
        {
          _id: { type: String, require: true },
          invite: { type: Number, require: true }
        }
      ]
    },
    moderation: {
      channel_id: String,
      max_warn: {
        action: {
          type: String,
          enum: ["TIMEOUT", "KICK", "BAN"],
          default: "KICK"
        },
        limit: { type: Number, default: 5 }
      }
    },
    counters: [
      {
        _id: false,
        counter_type: String,
        name: String,
        channel_id: String
      }
    ],
    welcome: {
      enabled: { type: Boolean, default: false },
      channel_id: String,
      content: String,
      embed: {
        author: { name: String, icon_url: String },
        title: String,
        description: String,
        color: String,
        thumbnail: String,
        image: String,
        footer: { text: String, icon_url: String }
      }
    },
    farewell: {
      enabled: { type: Boolean, default: false },
      channel_id: String,
      content: String,
      embed: {
        author: { name: String, icon_url: String },
        description: String,
        color: String,
        thumbnail: String,
        image: String,
        footer: { text: String, icon_url: String }
      }
    },
    autorole: {
      bot: [String],
      member: [String]
    },
    suggestions: {
      enabled: { type: Boolean, default: false },
      channel_id: String,
      approved_channel: String,
      rejected_channel: String,
      staff_roles: [String]
    }
  },
  {
    timestamps: {}
  }
);

// the schema for this model
this.schema = GuildSchema;
// the model
this.model = mongoose.model("guild", GuildSchema);

const GuildSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    locale: { type: String, default: config.defaultLanguage },
    name: String,
    ownerId: { type: String, ref: "users" },
    joinedAt: Date,
    leftAt: Date,
    level: {
      enabled: { type: Boolean, default: false },
      message: { type: String, default: config.level.defaultMessage },
      channelId: String,
      rewards: [
        {
          level: Number,
          role: String
        }
      ]
    },
    ticket: {
      enabled: { type: Boolean, default: false },
      channel: String,
      limit: { type: Number, default: 10 },
      categories: [
        {
          _id: false,
          name: String,
          staffRoles: [String]
        }
      ]
    },
    automod: {
      enabled: { type: Boolean, default: false },
      debug: Boolean,
      strikes: { type: Number, default: 10 },
      action: { type: String, default: "TIMEOUT" },
      wh_channels: [String],
      anti_attachments: Boolean,
      anti_invites: Boolean,
      anti_links: Boolean,
      anti_spam: Boolean,
      anti_ghostping: Boolean,
      anti_massmention: Number,
      max_lines: Number
    },
    invite: {
      tracking: { type: Boolean, default: false },
      ranks: [
        {
          _id: { type: String, require: true },
          invite: { type: Number, require: true }
        }
      ]
    },
    moderation: {
      channel_id: String,
      max_warn: {
        action: {
          type: String,
          enum: ["TIMEOUT", "KICK", "BAN"],
          default: "KICK"
        },
        limit: { type: Number, default: 5 }
      }
    },
    counters: [
      {
        _id: false,
        counter_type: String,
        name: String,
        channel_id: String
      }
    ],
    welcome: {
      enabled: { type: Boolean, default: false },
      channel_id: String,
      content: String,
      embed: {
        author: { name: String, icon_url: String },
        title: String,
        description: String,
        color: String,
        thumbnail: String,
        image: String,
        footer: { text: String, icon_url: String }
      }
    },
    farewell: {
      enabled: { type: Boolean, default: false },
      channel_id: String,
      content: String,
      embed: {
        author: { name: String, icon_url: String },
        description: String,
        color: String,
        thumbnail: String,
        image: String,
        footer: { text: String, icon_url: String }
      }
    },
    autorole: {
      bot: [String],
      member: [String]
    },
    suggestions: {
      enabled: { type: Boolean, default: false },
      channel_id: String,
      approved_channel: String,
      rejected_channel: String,
      staff_roles: [String]
    }
  },
  {
    timestamps: {}
  }
);
