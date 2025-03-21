const chalk = require("chalk");
const { table } = require("table");
const pkg = require("@root/package.json");

/**
 * A function to log Welcome Message
 * @returns {void}
 * @example loadWelcome();
 */
function loadWelcome() {
  // ansi chalk with escape
  let esc = "\u001b[0m";
  let red = "\u001b[31m";
  let blue = "\u001b[36m";
  let green = "\u001b[32m";
  let white = "\u001b[37m";
  let yellow = "\u001b[33m";

  let vanity = [
    "g _   _           _        r____            _           _  b______",
    "g| \\ | | ___   __| | ___  r|  _ \\ _ __ ___ (_) ___  ___| |_b\\ \\ \\ \\",
    "g|  \\| |/ _ \\ / _` |/ _ \\ r| |_) | '__/ _ \\| |/ _ \\/ __| __|b\\ \\ \\ \\",
    "g| |\\  | (_) | (_| |  __/ r|  __/| | | (_) | |  __/ (__| |_  b) ) ) )",
    "g|_| \\_|\\___/ \\__,_|\\___| r|_|   |_|  \\___// |\\___|\\___|\\__|b/ / / /",
    "y=======================================r|__/y==============b/_/_/_/"
  ].join("\n");

  vanity = vanity
    .replace(/r/g, red)
    .replace(/g/g, green)
    .replace(/b/g, blue)
    .replace(/y/g, yellow)
    .replace(/w/g, white)
    .replace(/e/g, esc);

  const border = {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,
    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight: `┘`,
    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,
    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  };

  /**
   * A function to get table border in provided color
   * @param {import("@types/index").ChalkColors} color
   * @returns {object}
   * @example const border = getTableBorder(color);
   */
  function getTableBorder(color) {
    const newBorder = {};
    Object.keys(border).forEach((key) => {
      newBorder[key] = chalk[color](border[key]);
    });
    return newBorder;
  }

  /** @type {import("table").TableUserConfig} */
  const config = {
    columnDefault: {
      alignment: "center",
      width: 62
    },
    border: getTableBorder("greenBright"),
    drawHorizontalLine: (lineIndex, rowCount) => {
      return lineIndex === 0 || lineIndex === rowCount;
    }
  };

  const data = [
    [""],
    [`Welcome to ${chalk.green("Node")} Project`],
    [`Running on nodejs version ${chalk.green(process.version)}`],
    [`Package version ${chalk.yellow(pkg.version)}`],
    [`Coded by ${chalk.cyan("theassassin0128")}`],
    [""]
  ];

  console.log(vanity);
  console.log(table(data, config));
}

module.exports = { loadWelcome };
