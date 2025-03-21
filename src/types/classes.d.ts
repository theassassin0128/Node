import { Client, ClientOptions, Collection } from "discord.js";
import { Signale, SignaleOptions } from "signale";
import config from "@src/config.js";
import pkg from "@root/package.json";
import { DatabaseManager } from "@database/Manager.js";
import { MusicManager } from "@lib/Lavalink.js";
import { CommandStructure } from "./command";
import { Utils } from "@src/utils";
import { Handlers } from "@src/handlers";
import { Helpers } from "@src/helpers";

class Logger extends Signale {
  public constructor(options: SignaleOption);
}

export class Bot extends Client<true> {
  public constructor(options: ClientOptions);
  public logger: Logger;
  public config: config;
  public pkg: pkg;
  public db: DatabaseManager;
  public utils: Utils;
  public helpers: Helpers;
  public handlers: Handlers;
  public commands: Collection<string, CommandStructure>;
  public cooldowns: Collection<string, Collection<string, string>>;
  public lavalink: MusicManager;
}
