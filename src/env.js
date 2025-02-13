const { z } = require("zod");

const envSchema = z.object({
	DEFAULT_LOCALE: z.string().default("en-US"),
	DISCORD_CLIENT_TOKEN: z.string(),
	DISCORD_CLIENT_ID: z.string(),
	DISCORD_CLIENT_SECRET: z.string(),
	DEV_IDS: z.preprocess(
		(val) => (typeof val === "string" ? JSON.parse(val) : val),
		z.string().array().optional(),
	),
	MONGO_URI: z.string(),
	OWNER_ID: z.string(),
	GUILD_ID: z.string().optional(),
	SPOTIFY_CLIENT_ID: z.string(),
	SPOTIFY_CLIENT_SECRET: z.string(),
	LOG_CHANNEL_ID: z.string().optional(),
	COMMAND_CHANNEL_ID: z.string().optional(),
	GENIUS_API: z.string().optional(),
});

/** @type {z.infer<typeof envSchema>} */
const env = envSchema.parse(process.env);

for (const key in env) {
	if (!(key in env)) {
		throw new Error(
			`Missing env variable: ${key}. Please check the .env file and try again.`,
		);
	}
}

module.exports = { env };
