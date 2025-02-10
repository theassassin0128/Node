export type GuildSchema = {
	_id: string;
	data: {
		name: string;
		owner: string;
		joinedAt: Date;
		leftAt: Date;
	};
	locale: string;
	rank: {
		enabled: boolean;
		rank_message: string;
		channel_id?: string;
	};
	ticket: {
		enabled: boolean;
		channel_id?: string;
		limit: number;
		categories?: [
			{
				name?: string;
				staff_roles?: [string];
			},
		];
	};
	automod: {
		enabled: boolean;
		debug: boolean;
		strikes: number;
		acion: string;
		wh_channels: string[];
		anti_attachments?: boolean;
		anti_invites?: boolean;
		anti_links?: boolean;
		anti_spam?: boolean;
		anti_ghostping?: boolean;
		anti_massmention?: number;
		max_lines?: number;
	};
	invite: {
		tracking: boolean;
		ranks?: [
			{
				_id: string;
				invite: number;
			},
		];
	};
	moderation: {
		channel_id?: string;
		max_warn: {
			action: {
				type: string;
				enum: ["TIMEOUT", "KICK", "BAN"];
				default: "KICK";
			};
			limit: number;
		};
	};
	counters: [
		{
			counter_type: string;
			name: string;
			channel_id: string;
		},
	];
	welcome: {
		enabled: boolean;
		channel_id?: string;
		content?: string;
		embed?: {
			author?: { name?: string; icon_url?: string };
			title?: string;
			description?: string;
			color?: string;
			thumbnail?: string;
			image?: string;
			footer?: { text?: string; icon_url?: string };
		};
	};
	farewell: {
		enabled: boolean;
		channel_id?: string;
		content?: string;
		embed?: {
			author?: { name?: string; icon_url?: string };
			description?: string;
			color?: string;
			thumbnail?: string;
			image?: string;
			footer?: { text?: string; icon_url?: string };
		};
	};
	autorole: {
		bot?: [string];
		member?: [string];
	};
	suggestions: {
		enabled: boolean;
		channel_id?: string;
		approved_channel?: string;
		rejected_channel?: string;
		staff_roles?: [string];
	};
};

export type UserSchema = {
	_id: string;
	username: string;
	discriminator: string;
	locale: string;
	coins: number;
	bank: number;
	reputation: {
		received: number;
		given: number;
		timestamp: Date;
	};
	daily: {
		streak: number;
		timestamp: Date;
	};
	createdAt: Date;
	updatedAt: Date;
};
