const Calculator = require("../lib/Calculator");

describe("Calculator operators", () => {
  // let calc, a, b;

  // beforeEach(() => {
  //   calc = new Calculator();
  //   a = Math.random();
  //   b = Math.random();
  // });

  it("should add correctly", () => {
    let result = Calculator.solve("2+1");
    expect(result).toBe(3);
  });

  it("should subtract correctly", () => {
    let result = Calculator.solve("2-1");
    expect(result).toBe(1);
  });

  it("should multiply correctly", () => {
    let result = Calculator.solve("2*1");
    expect(result).toBe(2);
  });

  it("should divide correctly", () => {
    let result = Calculator.solve("2/1");
    expect(result).toBe(2);
  });

});