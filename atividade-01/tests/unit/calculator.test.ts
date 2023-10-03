import calculator from "../../src/calculator";

describe("calculator tests", () => {
  it("should work", async () => {
    expect(true).toBe(true);
  });
});

describe("calculator tests", () => {
  it("subtracts 2 - 1 to equal 1", () => {
    expect(calculator.sub(2, 1)).toBe(1);
  });

  it("mult 2 * 10 to equal 20", () => {
    expect(calculator.mul(2, 10)).toBe(20);
  });

  it("div 10 : 2 to equal 5", () => {
    expect(calculator.div(10, 2)).toBe(5);
  });

  it("sum 10 : 2 to equal 5", () => {
    expect(calculator.sum(10, 2)).toBe(12);
  });
});
