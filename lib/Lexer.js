let EOF = -1;

function Lexer(input) {
  this.input = input;
  this.c = input[0];
  this.p = 0;
}

Lexer.prototype.nextToken = function () {
  while (this.c !== EOF) {
    if (/\s/.test(this.c)) {
      this.pass();
      continue;
    } else if (["(", ")", "+", "/", ",", "=", "*", "-"].indexOf(this.c) > -1) {
      return this.symbol();
      // } else if (this.c === "*") {
      // 	this.pass();
      // 	// if (this.c === "*") {
      // 	// 	this.pass();
      // 	// 	return "**";
      // 	// } else {
      // 		return "*";
      // 	// }
      // } else if (this.c === "-") {
      // 	if (this.isNumber(this.input[this.p + 1])) {
      // 		// this is a negative number
      // 		return this.number();
      // 	} else {
      // 		return "-";
      // 	}
    } else if (this.isNumber(this.c)) {
      return this.number();
    } else {
      throw "Неверный ввод: " + this.c;
    }
  }
  return EOF;
};

Lexer.prototype.tokenize = function () {
  let tokens = [];

  for (let t = this.nextToken(); t !== EOF; t = this.nextToken()) {
    tokens.push(t);
  }
  return tokens;
};

Lexer.prototype.isNumber = function (d) {
  return /^[0-9.]$/.test(d);
};

Lexer.prototype.symbol = function () {
  let c = this.c;
  this.pass();
  return c;
};

Lexer.prototype.number = function () {
  let result = [];
  // allow negatives at the front only
  if (this.c === "-") {
    result.push("-");
    this.pass();
  }
  do {
    result.push(this.c);
    this.pass();
  } while (this.c === "." || this.isNumber(this.c));

  let numStr = result.join("");
  if (/^.*\..*\..*$/.test(numStr)) {
    throw "Ввод запрещен: " + numStr;
  }
  return numStr;
};

Lexer.prototype.pass = function () {
  this.p++;
  if (this.p < this.input.length) {
    this.c = this.input[this.p];
  } else {
    this.c = EOF;
  }
};

module.exports = Lexer;
