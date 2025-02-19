import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	ContextMenuCommandBuilder,
	PermissionResolvable,
	SlashCommandBuilder,
	ContextMenuCommandInteraction,
} from "discord.js";
import { DiscordClient } from "@lib/DiscordClient.js";

// CommandCategories to use in CommandStructure
export type CommandCategory =
	| "admin"
	| "anime"
	| "automod"
	| "config"
	| "development"
	| "economy"
	| "fun"
	| "image"
	| "information"
	| "moderation"
	| "music"
	| "rank"
	| "none"
	| "social"
	| "suggestion"
	| "ticket"
	| "utility";

// CommandStructure to use in command creation
export interface CommandStructure {
	data: SlashCommandBuilder | ContextMenuCommandBuilder;
	usage?: string;
	category?: CommandCategory;
	cooldown?: number;
	global?: boolean;
	premium?: boolean;
	devOnly?: boolean;
	disabled?: boolean;
	voiceChannelOnly?: boolean;
	botPermissions?: PermissionResolvable[];
	userPermissions?: PermissionResolvable[];
	execute: (
		client: DiscordClient,
		interaction: ChatInputCommandInteraction | ContextMenuCommandInteraction,
		lng: string,
	) => Promise<void>;
	autocomplete?: (
		client: DiscordClient,
		interaction: AutocompleteInteraction,
	) => promise<void>;
}
