const Calculator = require("../lib/Calculator");

describe('Calculator operators', () => {
  let calc, a, b;

  beforeEach(() => {
    // Arrange
    calc = new Calculator();
    a = Math.random();
    b = Math.random();
  });

  it('should add correctly', () => {
    // Act
    let result = calc.add(a, b);
    // Assert
    expect(result).toBe(a + b);
  });

  it("should subtract correctly", () => {
    // Act
    let result = calc.subtract(a, b);
    // Assert
    expect(result).toBe(a - b);
  });

  it("should add if positive number is subtracted to negative number", () => {
    // Act
    let result = calc.subtract(a, -b);
    // Assert
    expect(result).toBe(a - (-b));
  });

  it("should multiply correctly", () => {
    // Act
    let result = calc.multiply(a, b);
    // Assert
    expect(result).toBe(a * b);
  });

  it("should divide correctly", () => {
    // Act
    let result = calc.divide(a, b);
    // Assert
    expect(result).toBe(a / b);
  });

  it("should error when divided by zero", () => {
    // Act and Assert
    expect(() => calc.divide(a, 0)).toThrow("Can't divide by zero");
  });
});