const Calculator = require("../lib/Calculator");
const Lexer = require("../lib/Lexer");

describe("Calculator operators", () => {

  it("should add correctly", () => {
    let result = Calculator.solve("2+1");
    expect(result).toBe(3);
  });

  it("should subtract correctly", () => {
    let result = Calculator.solve(new Lexer(("2-1").trim()).tokenize());
    expect(result).toBe(1);
  });

  it("should multiply correctly", () => {
    let result = Calculator.solve(new Lexer(("2*1").trim()).tokenize());
    expect(result).toBe(2);
  });

  it("should divide correctly", () => {
    let result = Calculator.solve(new Lexer(("2/1").trim()).tokenize());
    expect(result).toBe(2);
  });

  it("should return negatives", () => {
    let result = Calculator.solve(new Lexer(("1-2").trim()).tokenize());
    expect(result).toBe(-1);
  });

  it("should prioritize parentheses", () => {
    let result = Calculator.solve(new Lexer(("(2/1)+2+(2*2)").trim()).tokenize());
    expect(result).toBe(8);
  });

  it("should prioritize higher precedence operators without parentheses", () => {
    let result = Calculator.solve(new Lexer(("2+2+2*4").trim()).tokenize());
    expect(result).toBe(12);
  });

  it("should calculate fractions", () => {
    let result = Calculator.solve(new Lexer(("(2.21/1)+2.21+(2*2.21)").trim()).tokenize());
    expect(result).toBe(8.84);
  });

  it("should use e-notation for large numbers", () => {
    let result = Calculator.solve(new Lexer(("(222222222 * 111111111) * 222222222").trim()).tokenize());
    expect(result).toBe(5.486968433470508e+24);
  });

  it("should return zero", () => {
    let result = Calculator.solve(new Lexer(("(123+123)-246").trim()).tokenize());
    expect(result).toBe(0);
  });

});