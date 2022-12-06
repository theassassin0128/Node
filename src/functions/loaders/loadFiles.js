//Requiring properties
const { glob } = require("glob");
const { promisify } = require("util");
const proGlob = promisify(glob);

//Function to load files
async function loadFiles(dirName) {
	const Files = await proGlob(
		`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`
	);
	Files.forEach((file) => delete require.cache[require.resolve(file)]);
	return Files;
}

//Exporting the function
module.exports = { loadFiles };
