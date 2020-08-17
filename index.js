const readline = require("readline");
const Calculator = require("./lib/Calculator");
const Lexer = require("./lib/Lexer"),
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

rl.setPrompt("Введите выражение: ");
rl.prompt();
let env = {}; // хранение введенных переменных

rl.on("line", function (line) {
  try {
    let tokens = new Lexer(line.trim()).tokenize();
    console.log("=> ", Calculator.solve(tokens, env));
  } catch (e) {
    console.log("Error:", e);
  }
  rl.prompt();
})
  .on("SIGINT", function () {
    rl.close();
  })
  .on("close", function () {
    console.log("Хорошего дня!");
    process.exit(0);
  });
