require("dotenv").config();

const { REST } = require("discord.js");
const fs = require("fs");
const chalk = require("chalk");
const rest = new REST({ version: 10 }).setToken(process.env.DISCORD_CLIENT_TOKEN);

async function fetchAndSaveEmojis() {
	const app = await rest.get("/applications/@me");
	const data = await rest.get(`/applications/${app.id}/emojis`);

	if (!Array.isArray(data.items)) {
		return console.log(
			chalk.redBright(`Unable to fetch emojis from ${application.name}`),
		);
	}

	let emojis = new Object();
	for (let emoji of data.items) {
		emojis[emoji.name] = `<:${emoji.name}:${emoji.id}>`;
	}

	fs.writeFileSync("./scripts/emojis.json", JSON.stringify(emojis), (err) => {
		throw err;
	});

	const slash = process.platform === "win32" ? "\\" : "/";

	return console.log(
		chalk.greenBright(
			`Successfully fetched and saved emojis in ${chalk.yellowBright(
				`${process.cwd()}${slash}scripts${slash}emojis.json`,
			)}`,
		),
	);
}

fetchAndSaveEmojis().catch((error) => {
	console.log(error);
});
