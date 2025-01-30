import { ApplicationCommand } from "discord.js";

type FileExtensions =
	| ".js"
	| ".jsx"
	| ".ts"
	| ".tsx"
	| ".cjs"
	| ".cts"
	| ".mjs"
	| ".mts"
	| ".json"
	| ".jpg"
	| ".jpeg"
	| ".png"
	| ".gif"
	| ".mpeg"
	| ".mp4"
	| ".mp3"
	| ".mkv"
	| ".ogg"
	| ".webp";

export type LoadFiles = (
	path: string,
	ext?: FileExtensions[] | string[],
) => Promise<string[]> | Promise<[]>;

// Command Types
export type OldCommand = {
	data: ApplicationCommand;
	global: Boolean;
};
