// console.log(__dirname);
// console.log(__filename);

// process.env.NODE_ENV = 'development'

// console.log(process.env);
// console.log(process.cwd());
// console.log(process.argv);

// process.exit();
// console.log(global);

// setTimeout(() => {
// console.log(12355465);
// }, 3000)

const readline = require("readline");
const fs = require("fs").promises;
const { program } = require("commander");
// const { log } = require('console');
require("colors");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// redline usage example
// rl.on('line', (txt) => {
//     console.log(txt.bgBlue);

//     process.exit();
// });

// Commander configs
program.option(
  "-l, --log <type>",
  "file for saving results",
  "game_results.txt"
);

// Use command line arguments
program.parse(process.argv);

// path to the log file
const logFile = program.opts().log;
console.log(logFile);

// Simple input
/**
 * @param {number} val
 * @returns {boolean}
 */

const isValid = (val) => {
  if (!Number.isNaN(val) && val > 0 && val <= 10) return true;

  if (Number.isNaN(val)) console.log("Please, enter a number!!".red);
  if (val < 1 || val > 10) console.log("Number shoul be between 1 and 10");

  return false;
};

// Log game results to the text filter:

/**
 * @param {string} msg
 * @returns {Promise<void>}
 */
const logger = async (msg) => {
  try {
    await fs.appendFile(logFile, `${msg}/n`);

    console.log(`Successfully save game result to the file ${logFile}`.yellow);
  } catch (err) {
    console.log(`Something went very wrong.. ${err.message}`);
  }
};

// GAME LOGIC

// counter of user attemps
let counter = 0;

// Gussed number random number 1-10
const mind = Math.ceil(Math.random() * 10);

/**
 * Main game process
 *
 * */

const game = () => {
  // ask the question
  rl.question(
    "Plese, enter any whole number between 1 and 10!\n".green,
    (val) => {
      // convert type from string to number
      // const number = Number(val);
      const number = +val;

      //validate input value
      if (!isValid(number)) {
        game();

        return;
      }

      //    counter = counter + 1;
      //    counter += 1;
      //    ++counter;
      counter++;

      //    if number is not right
      if (number !== mind) {
        console.log("Oh no! Try again".red);

        return game();
      }

      console.log(
        `Congtatulations!!! You have gussed the number in ${counter} step(s) =^^=`
          .magenta
      );

      logger(
        `${new Date().toLocaleString(
          "uk-UK"
        )}: Congrats!! You guessed the number in ${counter} step(s) =^^= `
      );

      rl.close();
    }
  );
};

game();
