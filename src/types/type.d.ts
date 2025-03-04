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
  | "player";

// Command Types
export interface OldCommand {
  data: ApplicationCommand;
  global: boolean;
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
