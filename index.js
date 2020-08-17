const readline = require("readline");
const Calculator = require("./lib/Calculator");
const Lexer = require("./lib/Lexer"),

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.setPrompt("Введите выражение: ");
rl.prompt();