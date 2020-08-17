// Для расширения функционала калькулятора потребуется выполнить следующие действия:
// 1. Добавить новый case в Calculator._eval (line 15);
// 2. Добавить нужный оператор в список ops (line 82).

function Calculator(tokens, env) {
  this.tokens = tokens;
  this.env = env;
}

Calculator.solve = function (expr, env) {
  let c = new Calculator(expr, env);
  return Calculator._eval(c.parse(), env);
};

Calculator._eval = function (node, env) {
  if (node.type === "number") {
    return node.value;
  } else if (node.type === "expr") {
    return this._eval(node.subtree, env);
  } else if (node.type === "assignment") {
    env[node.varName] = this._eval(node.expr, env);
    return env[node.varName];
  } else if (node.type === "variable") {
    if (typeof env[node.varName] === "undefined") {
      throw "Неверный ввод переменной: " + node.varName;
    }
    return env[node.varName];
  } else if (node.type === "op") {
    let left = this._eval(node.left, env);
    let right = this._eval(node.right, env);
    switch (node.value) {
      case "subtract":
      case "-":
        return left - right;
      case "add":
      case "+":
        return left + right;
      case "multiply":
      case "*":
        return left * right;
      case "divide":
      case "/":
        return left / right;
      default:
        throw "Неверный ввод оператора: " + node.value;
    }
  }
};

Calculator.prototype.parse = function () {
  if (this.tokens.length >= 2 && this.tokens[1] === "=") {
    return {
      type: "assignment",
      varName: this.tokens[0],
      expr: this._parseHelper(this.tokens.slice(2)),
    };
  } else {
    return this._parseHelper(this.tokens);
  }
};

Calculator.prototype._parseParenExpr = function (tokenArr) {
  return { type: "expr", subtree: this._parseHelper(tokenArr) };
};

Calculator.prototype._handleParenExpressions = function (tokenArr) {
  let lparen;

  do {
    lparen = tokenArr.indexOf("(");
    if (lparen > -1) {
      let rparen = this._findMatchingParen(tokenArr, lparen);
      let expr = this._parseParenExpr(tokenArr.slice(lparen + 1, rparen));
      tokenArr.splice(lparen, rparen - lparen + 1, expr);
    }
  } while (lparen > -1);
};

Calculator.prototype._parseHelper = function (tokenArr) {
  this._handleParenExpressions(tokenArr);
  let ops = ["-", "+", "*", "/"];

  let i, // index списка операций
    tokenIdx; // index токена
  for (i = 0; i < ops.length; i++) {
    tokenIdx = tokenArr.indexOf(ops[i]);
    if (tokenIdx > -1) break;
  }
  if (tokenIdx > -1) {
    return {
      type: "op",
      value: ops[i],
      left: this._parseHelper(tokenArr.slice(0, tokenIdx)),
      right: this._parseHelper(tokenArr.slice(tokenIdx + 1, tokenArr.length)),
    };
  } else if (tokenArr.length === 1 && ["expr"].indexOf(tokenArr[0].type) > -1) {
    return tokenArr[0];
  } else if (tokenArr.length === 1 && /[-0-9.]+/.test(tokenArr[0])) {
    return { type: "number", value: parseFloat(tokenArr[0]) };
  }
  throw "Неизвестное значение: " + JSON.stringify(tokenArr);
};

Calculator.prototype._findMatchingParen = function (tokens, lparenIdx) {
  let parenStack = 1;
  let i = lparenIdx + 1;
  while (i < tokens.length && parenStack > 0) {
    if (tokens[i] === "(") {
      parenStack += 1;
    } else if (tokens[i] === ")") {
      parenStack -= 1;
    }
    i++;
  }
  if (parenStack === 0) return i - 1;
  else throw "Скобки не закрыты, попробуйте снова!";
};

module.exports = Calculator;
