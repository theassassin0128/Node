const chalk = require("chalk");
const { glob } = require("glob");
const { join, extname, resolve } = require("path");

/**
 * Returns an array of files from given path filtered by provided extensions.
 * @param {string} path - path from projects root dir
 * @param {import("@types/index").FileExtensions[]|string[]} ext - extensions to filter files
 * @returns {Promise<string[]>}
 * @example const jsFiles = await loadFiles("src", [".js"]);
 * @example const commandFiles = await loadFiles("src/commands", [".js"]);
 * @example const tsFiles = await loadFiles("src/types", [".ts"]);
 * @example const assets = await loadFiles("public", [".mp4", ".mkv", ".jpeg"]);
 */
async function loadFiles(path, ext) {
  // Validate parameters
  if (typeof path !== "string") {
    throw new TypeError(
      `The ${chalk.yellow(
        "path"
      )} parameter must a String. Received type ${typeof client}`
    );
  }

  if (!Array.isArray(ext)) {
    throw new TypeError(
      `The ${chalk.yellow(
        "ext"
      )} parameter must be an Array. Received type ${typeof ext}`
    );
  }

  // Helper function to delete cached files
  function deleteCashedFile(file) {
    const filePath = resolve(file);
    delete require.cache[filePath];
  }

  // Retrieve and filter files
  const allFiles = await glob(
    join(process.cwd(), path, "*/**").replace(/\\/g, "/")
  );
  const files = allFiles.filter((file) => ext.includes(extname(file)));
  await Promise.all(files.map(deleteCashedFile));
  return files;
}

// Export the function
module.exports = loadFiles;
