const colors = require("colors");
const { Logger } = require("@lib/Logger.js");
const logger = new Logger();

module.exports = () => {
	// Handle beforeExit event
	process.on("beforeExit", (code) => {
		console.log(
			colors.yellow("[AntiCrash] | [BeforeExit_Logs] | [Start] : ==============="),
		);
		logger.error(code);
		console.log(
			colors.yellow("[AntiCrash] | [BeforeExit_Logs] | [End] : ==============="),
		);
	});

	// Handle exit event
	process.on("exit", (code) => {
		console.log(colors.yellow("[AntiCrash] | [Exit_Logs] | [Start] : ==============="));
		logger.error(code);
		console.log(colors.yellow("[AntiCrash] | [Exit_Logs] | [End] : ==============="));
	});

	// Handle unhandledRejection event
	process.on("unhandledRejection", (reason, promise) => {
		console.log(
			colors.yellow(
				"[AntiCrash] | [UnhandledRejection_Logs] | [Start] : ===============",
			),
		);
		logger.error(reason);
		console.log(
			colors.yellow("[AntiCrash] | [UnhandledRejection_Logs] | [End] : ==============="),
		);
	});

	// Handle rejectionHandled event
	process.on("rejectionHandled", (promise) => {
		console.log(
			colors.yellow("[AntiCrash] | [RejectionHandled_Logs] | [Start] : ==============="),
		);
		logger.error(promise);
		console.log(
			colors.yellow("[AntiCrash] | [RejectionHandled_Logs] | [End] : ==============="),
		);
	});

	// Handle uncaughtException event
	process.on("uncaughtException", (error, origin) => {
		console.log(
			colors.yellow("[AntiCrash] | [UncaughtException_Logs] | [Start] : ==============="),
		);
		logger.error(error);
		console.log(
			colors.yellow("[AntiCrash] | [UncaughtException_Logs] | [End] : ==============="),
		);
	});

	// Handle warning event
	process.on("warning", (warning) => {
		console.log(
			colors.yellow("[AntiCrash] | [Warning_Logs] | [Start] : ==============="),
		);
		logger.warn(warning);
		console.log(colors.yellow("[AntiCrash] | [Warning_Logs] | [End] : ==============="));
	});
};
