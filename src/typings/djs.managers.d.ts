export abstract class BaseManager {
  protected constructor(client: Client);
  public readonly client: Client;
}

export abstract class DataManager<Key, Holds, Resolvable> extends BaseManager {
  protected constructor(client: Client<true>, holds: Constructable<Holds>);
  public readonly holds: Constructable<Holds>;
  public get cache(): Collection<Key, Holds>;
  public resolve(resolvable: Holds): Holds;
  public resolve(resolvable: Resolvable): Holds | null;
  public resolveId(resolvable: Key | Holds): Key;
  public resolveId(resolvable: Resolvable): Key | null;
  public valueOf(): Collection<Key, Holds>;
}

export abstract class CachedManager<Key, Holds, Resolvable> extends DataManager<
  Key,
  Holds,
  Resolvable
> {
  protected constructor(
    client: Client<true>,
    holds: Constructable<Holds>,
    iterable?: Iterable<Holds>
  );
  private readonly _cache: Collection<Key, Holds>;
  private _add(
    data: unknown,
    cache?: boolean,
    { id, extras }?: { id: Key; extras: unknown[] }
  ): Holds;
}

export type ApplicationCommandDataResolvable =
  | ApplicationCommandData
  | RESTPostAPIApplicationCommandsJSONBody
  | JSONEncodable<RESTPostAPIApplicationCommandsJSONBody>;

export class ApplicationCommandManager<
  ApplicationCommandScope = ApplicationCommand<{ guild: GuildResolvable }>,
  PermissionsOptionsExtras = { guild: GuildResolvable },
  PermissionsGuildType = null
> extends CachedManager<
  Snowflake,
  ApplicationCommandScope,
  ApplicationCommandResolvable
> {
  protected constructor(client: Client<true>, iterable?: Iterable<unknown>);
  public permissions: ApplicationCommandPermissionsManager<
    { command?: ApplicationCommandResolvable } & PermissionsOptionsExtras,
    { command: ApplicationCommandResolvable } & PermissionsOptionsExtras,
    PermissionsGuildType,
    null
  >;
  private commandPath({
    id,
    guildId
  }: {
    id?: Snowflake;
    guildId?: Snowflake;
  }): string;
  public create(
    command: ApplicationCommandDataResolvable,
    guildId?: Snowflake
  ): Promise<ApplicationCommandScope>;
  public delete(
    command: ApplicationCommandResolvable,
    guildId?: Snowflake
  ): Promise<ApplicationCommandScope | null>;
  public edit(
    command: ApplicationCommandResolvable,
    data: Partial<ApplicationCommandDataResolvable>
  ): Promise<ApplicationCommandScope>;
  public edit(
    command: ApplicationCommandResolvable,
    data: Partial<ApplicationCommandDataResolvable>,
    guildId: Snowflake
  ): Promise<ApplicationCommand>;
  public fetch(
    id: Snowflake,
    options: FetchApplicationCommandOptions & { guildId: Snowflake }
  ): Promise<ApplicationCommand>;
  public fetch(
    options: FetchApplicationCommandOptions
  ): Promise<Collection<Snowflake, ApplicationCommandScope>>;
  public fetch(
    id: Snowflake,
    options?: FetchApplicationCommandOptions
  ): Promise<ApplicationCommandScope>;
  public fetch(
    id?: Snowflake,
    options?: FetchApplicationCommandOptions
  ): Promise<Collection<Snowflake, ApplicationCommandScope>>;
  public set(
    commands: readonly ApplicationCommandDataResolvable[]
  ): Promise<Collection<Snowflake, ApplicationCommandScope>>;
  public set(
    commands: readonly ApplicationCommandDataResolvable[],
    guildId: Snowflake
  ): Promise<Collection<Snowflake, ApplicationCommand>>;
  private static transformCommand(
    command: ApplicationCommandDataResolvable
  ): RESTPostAPIApplicationCommandsJSONBody;
}

export class ApplicationCommandPermissionsManager<
  BaseOptions,
  FetchSingleOptions,
  GuildType,
  CommandIdType
> extends BaseManager {
  private constructor(
    manager:
      | ApplicationCommandManager
      | GuildApplicationCommandManager
      | ApplicationCommand
  );
  private manager:
    | ApplicationCommandManager
    | GuildApplicationCommandManager
    | ApplicationCommand;

  public commandId: CommandIdType;
  public guild: GuildType;
  public guildId: Snowflake | null;
  public add(
    options: FetchSingleOptions & EditApplicationCommandPermissionsMixin
  ): Promise<ApplicationCommandPermissions[]>;
  public has(
    options: FetchSingleOptions & {
      permissionId: ApplicationCommandPermissionIdResolvable;
      permissionType?: ApplicationCommandPermissionType;
    }
  ): Promise<boolean>;
  public fetch(
    options: FetchSingleOptions
  ): Promise<ApplicationCommandPermissions[]>;
  public fetch(
    options: BaseOptions
  ): Promise<Collection<Snowflake, ApplicationCommandPermissions[]>>;
  public remove(
    options:
      | (FetchSingleOptions & {
          token: string;
          channels?: readonly (
            | GuildChannelResolvable
            | ChannelPermissionConstant
          )[];
          roles?: readonly (RoleResolvable | RolePermissionConstant)[];
          users: readonly UserResolvable[];
        })
      | (FetchSingleOptions & {
          token: string;
          channels?: readonly (
            | GuildChannelResolvable
            | ChannelPermissionConstant
          )[];
          roles: readonly (RoleResolvable | RolePermissionConstant)[];
          users?: readonly UserResolvable[];
        })
      | (FetchSingleOptions & {
          token: string;
          channels: readonly (
            | GuildChannelResolvable
            | ChannelPermissionConstant
          )[];
          roles?: readonly (RoleResolvable | RolePermissionConstant)[];
          users?: readonly UserResolvable[];
        })
  ): Promise<ApplicationCommandPermissions[]>;
  public set(
    options: FetchSingleOptions & EditApplicationCommandPermissionsMixin
  ): Promise<ApplicationCommandPermissions[]>;
  private permissionsPath(guildId: Snowflake, commandId?: Snowflake): string;
}

export class AutoModerationRuleManager extends CachedManager<
  Snowflake,
  AutoModerationRule,
  AutoModerationRuleResolvable
> {
  private constructor(guild: Guild, iterable: unknown);
  public guild: Guild;
  public create(
    options: AutoModerationRuleCreateOptions
  ): Promise<AutoModerationRule>;
  public edit(
    autoModerationRule: AutoModerationRuleResolvable,
    options: AutoModerationRuleEditOptions
  ): Promise<AutoModerationRule>;
  public fetch(
    options: AutoModerationRuleResolvable | FetchAutoModerationRuleOptions
  ): Promise<AutoModerationRule>;
  public fetch(
    options?: FetchAutoModerationRulesOptions
  ): Promise<Collection<Snowflake, AutoModerationRule>>;
  public delete(
    autoModerationRule: AutoModerationRuleResolvable,
    reason?: string
  ): Promise<void>;
}

export class BaseGuildEmojiManager extends CachedManager<
  Snowflake,
  GuildEmoji,
  EmojiResolvable
> {
  protected constructor(
    client: Client<true>,
    iterable?: Iterable<RawGuildEmojiData>
  );
  public resolveIdentifier(emoji: EmojiIdentifierResolvable): string | null;
}

export class CategoryChannelChildManager extends DataManager<
  Snowflake,
  CategoryChildChannel,
  GuildChannelResolvable
> {
  private constructor(channel: CategoryChannel);

  public channel: CategoryChannel;
  public get guild(): Guild;
  public create<Type extends CategoryChannelType>(
    options: CategoryCreateChannelOptions & { type: Type }
  ): Promise<MappedChannelCategoryTypes[Type]>;
  public create(options: CategoryCreateChannelOptions): Promise<TextChannel>;
}

export class ChannelManager extends CachedManager<
  Snowflake,
  Channel,
  ChannelResolvable
> {
  private constructor(client: Client<true>, iterable: Iterable<RawChannelData>);
  public fetch(
    id: Snowflake,
    options?: FetchChannelOptions
  ): Promise<Channel | null>;
}

export type EntitlementResolvable = Snowflake | Entitlement;
export type SKUResolvable = Snowflake | SKU;
export type SubscriptionResolvable = Snowflake | Subscription;

export interface GuildEntitlementCreateOptions {
  sku: SKUResolvable;
  guild: GuildResolvable;
}

export interface UserEntitlementCreateOptions {
  sku: SKUResolvable;
  user: UserResolvable;
}

export interface FetchEntitlementOptions extends BaseFetchOptions {
  entitlement: EntitlementResolvable;
}

export interface FetchEntitlementsOptions {
  limit?: number;
  guild?: GuildResolvable;
  user?: UserResolvable;
  skus?: readonly SKUResolvable[];
  excludeEnded?: boolean;
  excludeDeleted?: boolean;
  cache?: boolean;
  before?: Snowflake;
  after?: Snowflake;
}

export class EntitlementManager extends CachedManager<
  Snowflake,
  Entitlement,
  EntitlementResolvable
> {
  private constructor(client: Client<true>, iterable: Iterable<APIEntitlement>);
  public fetch(
    options: EntitlementResolvable | FetchEntitlementOptions
  ): Promise<Entitlement>;
  public fetch(
    options?: FetchEntitlementsOptions
  ): Promise<Collection<Snowflake, Entitlement>>;
  public createTest(
    options: GuildEntitlementCreateOptions | UserEntitlementCreateOptions
  ): Promise<Entitlement>;
  public deleteTest(entitlement: EntitlementResolvable): Promise<void>;
  public consume(entitlementId: Snowflake): Promise<void>;
}

export interface FetchSubscriptionOptions extends BaseFetchOptions {
  sku: SKUResolvable;
  subscriptionId: Snowflake;
}

export interface FetchSubscriptionsOptions {
  after?: Snowflake;
  before?: Snowflake;
  limit?: number;
  sku: SKUResolvable;
  user: UserResolvable;
}

export class SubscriptionManager extends CachedManager<
  Snowflake,
  Subscription,
  SubscriptionResolvable
> {
  private constructor(
    client: Client<true>,
    iterable?: Iterable<APISubscription>
  );
  public fetch(options: FetchSubscriptionOptions): Promise<Subscription>;
  public fetch(
    options: FetchSubscriptionsOptions
  ): Promise<Collection<Snowflake, Subscription>>;
}

export interface FetchGuildApplicationCommandFetchOptions
  extends Omit<FetchApplicationCommandOptions, "guildId"> {}

export class GuildApplicationCommandManager extends ApplicationCommandManager<
  ApplicationCommand,
  {},
  Guild
> {
  private constructor(
    guild: Guild,
    iterable?: Iterable<RawApplicationCommandData>
  );
  public guild: Guild;
  public create(
    command: ApplicationCommandDataResolvable
  ): Promise<ApplicationCommand>;
  public delete(
    command: ApplicationCommandResolvable
  ): Promise<ApplicationCommand | null>;
  public edit(
    command: ApplicationCommandResolvable,
    data: Partial<ApplicationCommandDataResolvable>
  ): Promise<ApplicationCommand>;
  public fetch(
    id: Snowflake,
    options?: FetchGuildApplicationCommandFetchOptions
  ): Promise<ApplicationCommand>;
  public fetch(
    options: FetchGuildApplicationCommandFetchOptions
  ): Promise<Collection<Snowflake, ApplicationCommand>>;
  public fetch(
    id?: undefined,
    options?: FetchGuildApplicationCommandFetchOptions
  ): Promise<Collection<Snowflake, ApplicationCommand>>;
  public set(
    commands: readonly ApplicationCommandDataResolvable[]
  ): Promise<Collection<Snowflake, ApplicationCommand>>;
}

export type MappedGuildChannelTypes = {
  [ChannelType.GuildCategory]: CategoryChannel;
} & MappedChannelCategoryTypes;

export type GuildChannelTypes = CategoryChannelType | ChannelType.GuildCategory;

export class GuildChannelManager extends CachedManager<
  Snowflake,
  GuildBasedChannel,
  GuildChannelResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildChannelData>);
  public get channelCountWithoutThreads(): number;
  public guild: Guild;

  public addFollower(
    channel: NewsChannelResolvable,
    targetChannel: TextChannelResolvable,
    reason?: string
  ): Promise<Snowflake>;
  public create<Type extends GuildChannelTypes>(
    options: GuildChannelCreateOptions & { type: Type }
  ): Promise<MappedGuildChannelTypes[Type]>;
  public create(options: GuildChannelCreateOptions): Promise<TextChannel>;
  public createWebhook(
    options: WebhookCreateOptions
  ): Promise<Webhook<WebhookType.Incoming>>;
  public edit(
    channel: GuildChannelResolvable,
    data: GuildChannelEditOptions
  ): Promise<GuildChannel>;
  public fetch(
    id: Snowflake,
    options?: BaseFetchOptions
  ): Promise<GuildBasedChannel | null>;
  public fetch(
    id?: undefined,
    options?: BaseFetchOptions
  ): Promise<Collection<Snowflake, NonThreadGuildBasedChannel | null>>;
  public fetchWebhooks(
    channel: GuildChannelResolvable
  ): Promise<
    Collection<
      Snowflake,
      Webhook<WebhookType.ChannelFollower | WebhookType.Incoming>
    >
  >;
  public setPosition(
    channel: GuildChannelResolvable,
    position: number,
    options?: SetChannelPositionOptions
  ): Promise<GuildChannel>;
  public setPositions(
    channelPositions: readonly ChannelPosition[]
  ): Promise<Guild>;
  public fetchActiveThreads(cache?: boolean): Promise<FetchedThreads>;
  private rawFetchGuildActiveThreads(): Promise<RESTGetAPIGuildThreadsResult>;
  public delete(
    channel: GuildChannelResolvable,
    reason?: string
  ): Promise<void>;
}

export class GuildEmojiManager extends BaseGuildEmojiManager {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildEmojiData>);
  public guild: Guild;
  public create(options: GuildEmojiCreateOptions): Promise<GuildEmoji>;
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<GuildEmoji>;
  public fetch(
    id?: undefined,
    options?: BaseFetchOptions
  ): Promise<Collection<Snowflake, GuildEmoji>>;
  public fetchAuthor(emoji: EmojiResolvable): Promise<User>;
  public delete(emoji: EmojiResolvable, reason?: string): Promise<void>;
  public edit(
    emoji: EmojiResolvable,
    options: GuildEmojiEditOptions
  ): Promise<GuildEmoji>;
}

export class GuildEmojiRoleManager extends DataManager<
  Snowflake,
  Role,
  RoleResolvable
> {
  private constructor(emoji: GuildEmoji);
  public emoji: GuildEmoji;
  public guild: Guild;
  public add(
    roleOrRoles:
      | RoleResolvable
      | readonly RoleResolvable[]
      | ReadonlyCollection<Snowflake, Role>
  ): Promise<GuildEmoji>;
  public set(
    roles: readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>
  ): Promise<GuildEmoji>;
  public remove(
    roleOrRoles:
      | RoleResolvable
      | readonly RoleResolvable[]
      | ReadonlyCollection<Snowflake, Role>
  ): Promise<GuildEmoji>;
}

export class GuildManager extends CachedManager<
  Snowflake,
  Guild,
  GuildResolvable
> {
  private constructor(client: Client<true>, iterable?: Iterable<RawGuildData>);
  public create(options: GuildCreateOptions): Promise<Guild>;
  public fetch(options: Snowflake | FetchGuildOptions): Promise<Guild>;
  public fetch(
    options?: FetchGuildsOptions
  ): Promise<Collection<Snowflake, OAuth2Guild>>;
  public setIncidentActions(
    guild: GuildResolvable,
    incidentActions: IncidentActionsEditOptions
  ): Promise<IncidentActions>;
  public widgetImageURL(
    guild: GuildResolvable,
    style?: GuildWidgetStyle
  ): string;
}

export interface AddOrRemoveGuildMemberRoleOptions {
  user: GuildMemberResolvable;
  role: RoleResolvable;
  reason?: string;
}

export class GuildMemberManager extends CachedManager<
  Snowflake,
  GuildMember,
  GuildMemberResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildMemberData>);
  public guild: Guild;
  public get me(): GuildMember | null;
  public add(
    user: UserResolvable,
    options: AddGuildMemberOptions & { fetchWhenExisting: false }
  ): Promise<GuildMember | null>;
  public add(
    user: UserResolvable,
    options: AddGuildMemberOptions
  ): Promise<GuildMember>;
  public ban(
    user: UserResolvable,
    options?: BanOptions
  ): Promise<GuildMember | User | Snowflake>;
  public bulkBan(
    users:
      | ReadonlyCollection<Snowflake, UserResolvable>
      | readonly UserResolvable[],
    options?: BulkBanOptions
  ): Promise<BulkBanResult>;
  public edit(
    user: UserResolvable,
    options: GuildMemberEditOptions
  ): Promise<GuildMember>;
  public fetch(
    options:
      | UserResolvable
      | FetchMemberOptions
      | (FetchMembersOptions & { user: UserResolvable })
  ): Promise<GuildMember>;
  public fetch(
    options?: FetchMembersOptions
  ): Promise<Collection<Snowflake, GuildMember>>;
  public fetchMe(options?: BaseFetchOptions): Promise<GuildMember>;
  public kick(
    user: UserResolvable,
    reason?: string
  ): Promise<GuildMember | User | Snowflake>;
  public list(
    options?: GuildListMembersOptions
  ): Promise<Collection<Snowflake, GuildMember>>;
  public prune(
    options: GuildPruneMembersOptions & { dry?: false; count: false }
  ): Promise<null>;
  public prune(options?: GuildPruneMembersOptions): Promise<number>;
  public search(
    options: GuildSearchMembersOptions
  ): Promise<Collection<Snowflake, GuildMember>>;
  public unban(user: UserResolvable, reason?: string): Promise<User | null>;
  public addRole(
    options: AddOrRemoveGuildMemberRoleOptions
  ): Promise<GuildMember | User | Snowflake>;
  public removeRole(
    options: AddOrRemoveGuildMemberRoleOptions
  ): Promise<GuildMember | User | Snowflake>;
}

export class GuildBanManager extends CachedManager<
  Snowflake,
  GuildBan,
  GuildBanResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildBanData>);
  public guild: Guild;
  public create(
    user: UserResolvable,
    options?: BanOptions
  ): Promise<GuildMember | User | Snowflake>;
  public fetch(options: UserResolvable | FetchBanOptions): Promise<GuildBan>;
  public fetch(
    options?: FetchBansOptions
  ): Promise<Collection<Snowflake, GuildBan>>;
  public remove(user: UserResolvable, reason?: string): Promise<User | null>;
  public bulkCreate(
    users:
      | ReadonlyCollection<Snowflake, UserResolvable>
      | readonly UserResolvable[],
    options?: BulkBanOptions
  ): Promise<BulkBanResult>;
}

export class GuildInviteManager extends DataManager<
  string,
  Invite,
  InviteResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawInviteData>);
  public guild: Guild;
  public create(
    channel: GuildInvitableChannelResolvable,
    options?: InviteCreateOptions
  ): Promise<Invite>;
  public fetch(options: InviteResolvable | FetchInviteOptions): Promise<Invite>;
  public fetch(
    options?: FetchInvitesOptions
  ): Promise<Collection<string, Invite>>;
  public delete(invite: InviteResolvable, reason?: string): Promise<Invite>;
}

export class GuildScheduledEventManager extends CachedManager<
  Snowflake,
  GuildScheduledEvent,
  GuildScheduledEventResolvable
> {
  private constructor(
    guild: Guild,
    iterable?: Iterable<RawGuildScheduledEventData>
  );
  public guild: Guild;
  public create(
    options: GuildScheduledEventCreateOptions
  ): Promise<GuildScheduledEvent>;
  public fetch(): Promise<Collection<Snowflake, GuildScheduledEvent>>;
  public fetch<
    Options extends
      | GuildScheduledEventResolvable
      | FetchGuildScheduledEventOptions
      | FetchGuildScheduledEventsOptions
  >(options?: Options): Promise<GuildScheduledEventManagerFetchResult<Options>>;
  public edit<
    Status extends GuildScheduledEventStatus,
    AcceptableStatus extends GuildScheduledEventSetStatusArg<Status>
  >(
    guildScheduledEvent: GuildScheduledEventResolvable,
    options: GuildScheduledEventEditOptions<Status, AcceptableStatus>
  ): Promise<GuildScheduledEvent<AcceptableStatus>>;
  public delete(
    guildScheduledEvent: GuildScheduledEventResolvable
  ): Promise<void>;
  public fetchSubscribers<
    Options extends FetchGuildScheduledEventSubscribersOptions
  >(
    guildScheduledEvent: GuildScheduledEventResolvable,
    options?: Options
  ): Promise<GuildScheduledEventManagerFetchSubscribersResult<Options>>;
}

export class GuildStickerManager extends CachedManager<
  Snowflake,
  Sticker,
  StickerResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawStickerData>);
  public guild: Guild;
  public create(options: GuildStickerCreateOptions): Promise<Sticker>;
  public edit(
    sticker: StickerResolvable,
    data?: GuildStickerEditOptions
  ): Promise<Sticker>;
  public delete(sticker: StickerResolvable, reason?: string): Promise<void>;
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<Sticker>;
  public fetch(
    id?: Snowflake,
    options?: BaseFetchOptions
  ): Promise<Collection<Snowflake, Sticker>>;
  public fetchUser(sticker: StickerResolvable): Promise<User | null>;
}

export class GuildMemberRoleManager extends DataManager<
  Snowflake,
  Role,
  RoleResolvable
> {
  private constructor(member: GuildMember);
  public get hoist(): Role | null;
  public get icon(): Role | null;
  public get color(): Role | null;
  public get highest(): Role;
  public get premiumSubscriberRole(): Role | null;
  public get botRole(): Role | null;
  public member: GuildMember;
  public guild: Guild;

  public add(
    roleOrRoles:
      | RoleResolvable
      | readonly RoleResolvable[]
      | ReadonlyCollection<Snowflake, Role>,
    reason?: string
  ): Promise<GuildMember>;
  public set(
    roles: readonly RoleResolvable[] | ReadonlyCollection<Snowflake, Role>,
    reason?: string
  ): Promise<GuildMember>;
  public remove(
    roleOrRoles:
      | RoleResolvable
      | readonly RoleResolvable[]
      | ReadonlyCollection<Snowflake, Role>,
    reason?: string
  ): Promise<GuildMember>;
}

export interface FetchPollAnswerVotersOptions
  extends BaseFetchPollAnswerVotersOptions {
  messageId: Snowflake;
  answerId: number;
}

export abstract class MessageManager<
  InGuild extends boolean = boolean
> extends CachedManager<Snowflake, Message<InGuild>, MessageResolvable> {
  protected constructor(
    channel: TextBasedChannel,
    iterable?: Iterable<RawMessageData>
  );
  public channel: TextBasedChannel;
  public delete(message: MessageResolvable): Promise<void>;
  public edit(
    message: MessageResolvable,
    options: string | MessagePayload | MessageEditOptions
  ): Promise<Message<InGuild>>;
  public fetch(
    options: MessageResolvable | FetchMessageOptions
  ): Promise<Message<InGuild>>;
  public fetch(
    options?: FetchMessagesOptions
  ): Promise<Collection<Snowflake, Message<InGuild>>>;
  public fetchPinned(
    cache?: boolean
  ): Promise<Collection<Snowflake, Message<InGuild>>>;
  public react(
    message: MessageResolvable,
    emoji: EmojiIdentifierResolvable
  ): Promise<void>;
  public pin(message: MessageResolvable, reason?: string): Promise<void>;
  public unpin(message: MessageResolvable, reason?: string): Promise<void>;
  public endPoll(messageId: Snowflake): Promise<Message>;
  public fetchPollAnswerVoters(
    options: FetchPollAnswerVotersOptions
  ): Promise<Collection<Snowflake, User>>;
}

export class DMMessageManager extends MessageManager {
  public channel: DMChannel;
}

export class PartialGroupDMMessageManager extends MessageManager {
  public channel: PartialGroupDMChannel;
}

export class GuildMessageManager extends MessageManager<true> {
  public channel: GuildTextBasedChannel;
  public crosspost(message: MessageResolvable): Promise<Message<true>>;
}

export class PermissionOverwriteManager extends CachedManager<
  Snowflake,
  PermissionOverwrites,
  PermissionOverwriteResolvable
> {
  private constructor(
    client: Client<true>,
    iterable?: Iterable<RawPermissionOverwriteData>
  );
  public set(
    overwrites:
      | readonly OverwriteResolvable[]
      | ReadonlyCollection<Snowflake, OverwriteResolvable>,
    reason?: string
  ): Promise<NonThreadGuildBasedChannel>;
  private upsert(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions,
    existing?: PermissionOverwrites
  ): Promise<NonThreadGuildBasedChannel>;
  public create(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions
  ): Promise<NonThreadGuildBasedChannel>;
  public edit(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions
  ): Promise<NonThreadGuildBasedChannel>;
  public delete(
    userOrRole: RoleResolvable | UserResolvable,
    reason?: string
  ): Promise<NonThreadGuildBasedChannel>;
}

export class PresenceManager extends CachedManager<
  Snowflake,
  Presence,
  PresenceResolvable
> {
  private constructor(
    client: Client<true>,
    iterable?: Iterable<RawPresenceData>
  );
}

export class ReactionManager extends CachedManager<
  Snowflake | string,
  MessageReaction,
  MessageReactionResolvable
> {
  private constructor(
    message: Message,
    iterable?: Iterable<RawMessageReactionData>
  );
  public message: Message;
  public removeAll(): Promise<Message>;
}

export class ReactionUserManager extends CachedManager<
  Snowflake,
  User,
  UserResolvable
> {
  private constructor(
    reaction: MessageReaction,
    iterable?: Iterable<RawUserData>
  );
  public reaction: MessageReaction;
  public fetch(
    options?: FetchReactionUsersOptions
  ): Promise<Collection<Snowflake, User>>;
  public remove(user?: UserResolvable): Promise<MessageReaction>;
}

export class RoleManager extends CachedManager<
  Snowflake,
  Role,
  RoleResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawRoleData>);
  public get everyone(): Role;
  public get highest(): Role;
  public guild: Guild;
  public get premiumSubscriberRole(): Role | null;
  public botRoleFor(user: UserResolvable): Role | null;
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<Role | null>;
  public fetch(
    id?: undefined,
    options?: BaseFetchOptions
  ): Promise<Collection<Snowflake, Role>>;
  public create(options?: RoleCreateOptions): Promise<Role>;
  public edit(role: RoleResolvable, options: RoleEditOptions): Promise<Role>;
  public delete(role: RoleResolvable, reason?: string): Promise<void>;
  public setPosition(
    role: RoleResolvable,
    position: number,
    options?: SetRolePositionOptions
  ): Promise<Role>;
  public setPositions(rolePositions: readonly RolePosition[]): Promise<Guild>;
  public comparePositions(role1: RoleResolvable, role2: RoleResolvable): number;
}

export class StageInstanceManager extends CachedManager<
  Snowflake,
  StageInstance,
  StageInstanceResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawStageInstanceData>);
  public guild: Guild;
  public create(
    channel: StageChannelResolvable,
    options: StageInstanceCreateOptions
  ): Promise<StageInstance>;
  public fetch(
    channel: StageChannelResolvable,
    options?: BaseFetchOptions
  ): Promise<StageInstance>;
  public edit(
    channel: StageChannelResolvable,
    options: StageInstanceEditOptions
  ): Promise<StageInstance>;
  public delete(channel: StageChannelResolvable): Promise<void>;
}

export class ThreadManager<
  ThreadOnly extends boolean = boolean
> extends CachedManager<
  Snowflake,
  If<ThreadOnly, ForumThreadChannel, TextThreadChannel>,
  ThreadChannelResolvable
> {
  protected constructor(
    channel: TextChannel | NewsChannel | ForumChannel | MediaChannel,
    iterable?: Iterable<RawThreadChannelData>
  );
  public channel: If<
    ThreadOnly,
    ForumChannel | MediaChannel,
    TextChannel | NewsChannel
  >;
  public fetch(
    options: ThreadChannelResolvable,
    cacheOptions?: BaseFetchOptions
  ): Promise<If<ThreadOnly, ForumThreadChannel, TextThreadChannel> | null>;
  public fetch(
    options: FetchThreadsOptions & { archived: FetchArchivedThreadOptions },
    cacheOptions?: { cache?: boolean }
  ): Promise<FetchedThreadsMore>;
  public fetch(
    options?: FetchThreadsOptions,
    cacheOptions?: { cache?: boolean }
  ): Promise<FetchedThreads>;
  public fetchArchived(
    options?: FetchArchivedThreadOptions,
    cache?: boolean
  ): Promise<FetchedThreadsMore>;
  public fetchActive(cache?: boolean): Promise<FetchedThreads>;
}

export class GuildTextThreadManager<
  AllowedThreadType
> extends ThreadManager<false> {
  public create(
    options: GuildTextThreadCreateOptions<AllowedThreadType>
  ): Promise<
    AllowedThreadType extends ChannelType.PrivateThread
      ? PrivateThreadChannel
      : PublicThreadChannel<false>
  >;
}

export class GuildForumThreadManager extends ThreadManager<true> {
  public create(
    options: GuildForumThreadCreateOptions
  ): Promise<ForumThreadChannel>;
}

export class ThreadMemberManager extends CachedManager<
  Snowflake,
  ThreadMember,
  ThreadMemberResolvable
> {
  private constructor(
    thread: ThreadChannel,
    iterable?: Iterable<RawThreadMemberData>
  );
  public thread: AnyThreadChannel;
  public get me(): ThreadMember | null;

  /* tslint:disable:unified-signatures */
  public add(member: UserResolvable | "@me"): Promise<Snowflake>;
  /** @deprecated The `reason` parameter is deprecated as Discord does not parse them. */
  public add(
    member: UserResolvable | "@me",
    reason?: string
  ): Promise<Snowflake>;
  /* tslint:enable:unified-signatures */

  public fetch(
    options:
      | ThreadMember<true>
      | (
          | (FetchThreadMemberOptions & { withMember: true })
          | { member: ThreadMember<true> }
        )
  ): Promise<ThreadMember<true>>;

  public fetch(
    options: ThreadMemberResolvable | FetchThreadMemberOptions
  ): Promise<ThreadMember>;

  public fetch(
    options: FetchThreadMembersWithGuildMemberDataOptions
  ): Promise<Collection<Snowflake, ThreadMember<true>>>;

  public fetch(
    options?: FetchThreadMembersWithoutGuildMemberDataOptions
  ): Promise<Collection<Snowflake, ThreadMember>>;
  public fetchMe(options?: BaseFetchOptions): Promise<ThreadMember>;

  /* tslint:disable:unified-signatures */
  public remove(member: UserResolvable | "@me"): Promise<Snowflake>;
  /** @deprecated The `reason` parameter is deprecated as Discord does not parse them. */
  public remove(
    member: UserResolvable | "@me",
    reason?: string
  ): Promise<Snowflake>;
  /* tslint:enable:unified-signatures */
}

export class UserManager extends CachedManager<
  Snowflake,
  User,
  UserResolvable
> {
  private constructor(client: Client<true>, iterable?: Iterable<RawUserData>);
  private dmChannel(userId: Snowflake): DMChannel | null;
  public createDM(
    user: UserResolvable,
    options?: BaseFetchOptions
  ): Promise<DMChannel>;
  public deleteDM(user: UserResolvable): Promise<DMChannel>;
  public fetch(user: UserResolvable, options?: BaseFetchOptions): Promise<User>;
  /** @deprecated This method is deprecated and will be removed in the next major version. Flags may still be retrieved via {@link UserManager.fetch} */
  public fetchFlags(
    user: UserResolvable,
    options?: BaseFetchOptions
  ): Promise<UserFlagsBitField>;
  public send(
    user: UserResolvable,
    options: string | MessagePayload | MessageCreateOptions
  ): Promise<Message>;
}

export class VoiceStateManager extends CachedManager<
  Snowflake,
  VoiceState,
  typeof VoiceState
> {
  private constructor(guild: Guild, iterable?: Iterable<RawVoiceStateData>);
  public guild: Guild;
  public fetch(
    member: GuildMemberResolvable | "@me",
    options?: BaseFetchOptions
  ): Promise<VoiceState>;
}

//#endregion
