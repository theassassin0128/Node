import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  PermissionResolvable,
  SlashCommandBuilder,
  ContextMenuCommandInteraction
} from "discord.js";
import { Bot } from "@lib/Bot.js";

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
  | "level"
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
  global?: boolean;
  premium?: boolean;
  devOnly?: boolean;
  disabled?: boolean;
  ephemeral?: boolean;
  voiceChannelOnly?: boolean;
  botPermissions?: PermissionResolvable[];
  userPermissions?: PermissionResolvable[];
  execute: (
    client: Bot,
    interaction: ChatInputCommandInteraction,
    lng: string
  ) => Promise<void>;
  autocomplete?: (
    client: Bot,
    interaction: AutocompleteInteraction
  ) => promise<void>;
}

// CommandStructure to use in command creation
export interface ContextStructure {
  data: ContextMenuCommandBuilder;
  category?: CommandCategory;
  cooldown?: number;
  global?: boolean;
  premium?: boolean;
  devOnly?: boolean;
  disabled?: boolean;
  ephemeral?: boolean;
  voiceChannelOnly?: boolean;
  botPermissions?: PermissionResolvable[];
  userPermissions?: PermissionResolvable[];
  execute: (
    client: Bot,
    interaction: ContextMenuCommandInteraction,
    lng: string
  ) => Promise<void>;
}
