import { ClientEvents } from "discord.js";
import { Bot } from "@lib/Bot.js";
import { LavalinkManagerEvents, NodeManagerEvents } from "lavalink-client";

// event module structure
export interface EventStructure {
  name:
    | keyof ClientEvents
    | keyof LavalinkManagerEvents
    | keyof NodeManagerEvents;
  once?: boolean;
  rest?: boolean;
  ws?: boolean;
  player?: boolean;
  node?: boolean;
  execute: (client: Bot, ...args: any) => Promise<void>;
}
