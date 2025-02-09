const { glob } = require("glob");
const { join, extname, resolve } = require("path");
const chalk = require("chalk");
const { t } = require("i18next");

/**
 * Returns an array of files from given path filtered by provided extensions.
 * Remember path starts from your projects main folder through **process.cwd()**.
 * So provide path from the base folder.
 * @type {import("@types/utils").LoadFiles}
 * @default loadFiles(path,ext)
 * @example const files = await loadFiles("src", [".js"]);
 * @example const files = await loadFiles("src/commands", [".js"]);
 * @example const files = await loadFiles("src/types", [".ts"]);
 * @example const files = await loadFiles("public", [".mp4", ".mkv", ".jpeg"]);
 */
async function loadFiles(path, ext) {
	// Validate parameters
	if (typeof path !== "string") {
		throw new TypeError(t("errors:type.string", { param: chalk.yellow("path") }));
	}
	if (!Array.isArray(ext)) {
		throw new TypeError(t("errors:type.array", { param: chalk.yellow("ext") }));
	}

	// Helper function to delete cached files
	function deleteCashedFile(file) {
		const filePath = resolve(file);
		delete require.cache[filePath];
	}

	// Retrieve and filter files
	const allFiles = await glob(join(process.cwd(), path, "*/**").replace(/\\/g, "/"));
	const files = allFiles.filter((file) => ext.includes(extname(file)));
	await Promise.all(files.map(deleteCashedFile));
	return files;
}

// Export the function
module.exports = loadFiles;
