// typings for commands
import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	ContextMenuCommandBuilder,
	PermissionResolvable,
	SlashCommandBuilder,
	ContextMenuCommandInteraction,
} from "discord.js";

import { DiscordClient } from "@lib/DiscordClient.js";

// CommandCategories to use in CommandStructure and ContextMenuStructure
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
	data: SlashCommandBuilder;
	usage?: string;
	category?: CommandCategory;
	cooldown?: number;
	premium?: boolean;
	guildOnly?: boolean;
	testOnly?: boolean;
	devOnly?: boolean;
	disabled?: boolean;
	voiceChannelOnly?: boolean;
	botPermissions?: PermissionResolvable[];
	userPermissions?: PermissionResolvable[];
	execute: (
		client: DiscordClient,
		interaction: ChatInputCommandInteraction,
	) => Promise<void>;
	autocomplete?: (
		client: DiscordClient,
		interaction: AutocompleteInteraction,
	) => promise<void>;
}

// ContextMenuStructure to use in context menu creation
export interface ContextMenuStructure {
	data: ContextMenuCommandBuilder;
	category?: CommandCategory;
	cooldown?: number;
	premium?: boolean;
	guildOnly?: boolean;
	testOnly?: boolean;
	devOnly?: boolean;
	disabled?: boolean;
	botPermissions?: PermissionResolvable[];
	userPermissions?: PermissionResolvable[];
	execute: (
		client: DiscordClient,
		interaction: ContextMenuCommandInteraction,
	) => promise<void>;
}
