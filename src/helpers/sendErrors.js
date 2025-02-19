/**
 * A function to send errors to discord
 * @param {import("@root/src/lib/DiscordClient").DiscordClient} client
 * @param {Error} error
 * @param {any} data
 * @returns {Promise<void>}
 */
async function sendErrors(client, error, data) {
	if (!error) return;
	if (!client.database) return;

	const errStack = error?.stack ? error.stack : error;
	const embed = new EmbedBuilder()
		.setColor(this.client.config.colors.Wrong)
		.setTitle(`**An Error Occurred**`)
		.setDescription(
			`\`\`\`\n${
				errStack.length > 4000 ? errStack.substring(0, 4000) + "..." : errStack
			}\n\`\`\``,
		)
		.setFooter({
			text: `Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
				2,
			)} MB CPU: ${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%`,
		})
		.setTimestamp();

	return webhookClient
		.send({
			username: this.client.user?.tag || undefined,
			avatarURL: this.client.user?.avatarURL() || undefined,
			embeds: [embed],
		})
		.catch((error) => {
			console.log(
				chalk.yellow("[AntiCrash] | [Send_Error_Logs] | [Start] : ==============="),
			);
			console.log(chalk.red(error));
			console.log(
				chalk.yellow("[AntiCrash] | [Send_Error_Logs] | [End] : ==============="),
			);
		});
}

module.exports = sendErrors;
