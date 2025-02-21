import { ClientEvents } from "discord.js";
import { DiscordClient } from "@root/src/lib/DiscordClient.js";
import { LavalinkManagerEvents, NodeManagerEvents } from "lavalink-client";

// event module structure
export interface EventStructure {
	name: keyof ClientEvents | keyof LavalinkManagerEvents | keyof NodeManagerEvents;
	once?: boolean;
	rest?: boolean;
	ws?: boolean;
	player?: boolean;
	node?: boolean;
	execute: (client: DiscordClient, ...args: any) => Promise<void>;
}
