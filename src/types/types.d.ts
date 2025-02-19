import { ApplicationCommand } from "discord.js";

export type FileExtensions =
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
	| ".webp"
	| ".mpeg"
	| ".mp3"
	| ".mp4"
	| ".mkv"
	| ".ogg";

// Error Types
export type ErrorTypes =
	| "error"
	| "event"
	| "command"
	| "internal"
	| "external"
	| "player"
	| "fetch";

// Command Types
export interface OldCommand {
	data: ApplicationCommand;
	global: Boolean;
}

// For LavalinkPlayer to transform requester object
export interface Requester {
	id: string;
	username: string;
	discriminator?: string;
	avatarURL?: string;
}

export type ChalkColors =
	| "black"
	| "red"
	| "green"
	| "yellow"
	| "blue"
	| "magenta"
	| "cyan"
	| "white"
	| "gray"
	| "grey"
	| "blackBright"
	| "redBright"
	| "greenBright"
	| "yellowBright"
	| "blueBright"
	| "magentaBright"
	| "cyanBright"
	| "whiteBright"
	| "bgBlack"
	| "bgRed"
	| "bgGreen"
	| "bgYellow"
	| "bgBlue"
	| "bgMagenta"
	| "bgCyan"
	| "bgWhite"
	| "bgGray"
	| "bgGrey"
	| "bgBlackBright"
	| "bgRedBright"
	| "bgGreenBright"
	| "bgYellowBright"
	| "bgBlueBright"
	| "bgMagentaBright"
	| "bgCyanBright"
	| "bgWhiteBright";

export declare enum Language {
	BanglaBD = "bn-BD",
	// Bulgarian = "Bulgarian",
	// ChineseCN = "ChineseCN",
	// ChineseTW = "ChineseTW",
	// Croatian = "Croatian",
	// Czech = "Czech",
	// Danish = "Danish",
	// Dutch = "Dutch",
	// EnglishGB = "en-GB",
	EnglishUS = "en-US",
	// Finnish = "Finnish",
	// French = "French",
	// German = "German",
	// Greek = "Greek",
	// Hindi = "Hi",
	// Hungarian = "Hungarian",
	// Indonesian = "Indonesian",
	// Italian = "Italian",
	// Japanese = "Japanese",
	// Korean = "Korean",
	// Lithuanian = "Lithuanian",
	// Norwegian = "Norwegian",
	// Polish = "Polish",
	PortugueseBR = "pt-BR",
	// Romanian = "Romanian",
	// Russian = "Russian",
	// SpanishES = "SpanishES",
	// Swedish = "Swedish",
	// Thai = "Thai",
	// Turkish = "Turkish",
	// Ukrainian = "Ukrainian",
	// Vietnamese = "Vietnamese",
}
