const chalk = require("chalk");

/** @param {import("@root/src/lib/DiscordClient").DiscordClient} client */
module.exports = (client) => {
	// Handle beforeExit event
	process.on("beforeExit", (code) => {
		console.log(
			chalk.yellow("[AntiCrash] | [BeforeExit_Logs] | [Start] : ==============="),
		);
		client.logger.error(code);
		console.log(
			chalk.yellow("[AntiCrash] | [BeforeExit_Logs] | [End] : ==============="),
		);
	});

	// Handle exit event
	process.on("exit", (code) => {
		console.log(chalk.yellow("[AntiCrash] | [Exit_Logs] | [Start] : ==============="));
		client.logger.error(code);
		console.log(chalk.yellow("[AntiCrash] | [Exit_Logs] | [End] : ==============="));
	});

	// Handle unhandledRejection event
	process.on("unhandledRejection", (reason, promise) => {
		console.log(
			chalk.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [Start] : ==============="),
		);
		client.logger.error(reason);
		console.log(
			chalk.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [End] : ==============="),
		);
	});

	// Handle rejectionHandled event
	process.on("rejectionHandled", (promise) => {
		console.log(
			chalk.yellow("[AntiCrash] | [RejectionHandled_Logs] | [Start] : ==============="),
		);
		client.logger.error(promise);
		console.log(
			chalk.yellow("[AntiCrash] | [RejectionHandled_Logs] | [End] : ==============="),
		);
	});

	// Handle uncaughtException event
	process.on("uncaughtException", (error, origin) => {
		console.log(
			chalk.yellow("[AntiCrash] | [UncaughtException_Logs] | [Start] : ==============="),
		);
		client.logger.error(error);
		console.log(
			chalk.yellow("[AntiCrash] | [UncaughtException_Logs] | [End] : ==============="),
		);
	});

	// Handle warning event
	process.on("warning", (warning) => {
		console.log(chalk.yellow("[AntiCrash] | [Warning_Logs] | [Start] : ==============="));
		client.logger.warn(warning);
		console.log(chalk.yellow("[AntiCrash] | [Warning_Logs] | [End] : ==============="));
	});
};
