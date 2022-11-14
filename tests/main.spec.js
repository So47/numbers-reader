const numbersReader = require("../services/numbersReader");

describe("When input is empty", () => {
  it("should return an empty string", () => {
    const result = numbersReader.stringValidate(" ");
    expect(result).toEqual(expect.stringContaining("empty input"));
  });
});

describe("when number is out of range", () => {
  it.each`
    invalidInput
    ${"1000"}
    ${"-1"}
    ${"one thousand"}
    ${"minus one"}
  `(
    "should return an error message for input '$invalidInput'",
    ({ invalidInput }) => {
      const result = numbersReader.stringValidate(invalidInput);
      expect(result).toEqual(
        expect.stringContaining("some number is out of range (0-999)")
      );
    }
  );
});

describe("When input string is invalid", () => {
  it.each`
    invalidInput
    ${"onehundred"}
    ${"fortyfour"}
    ${"cincuenta uno"}
  `(
    "should return an error message for '$invalidInput'",
    ({ invalidInput }) => {
      const result = numbersReader.stringValidate(invalidInput);
      expect(result).toEqual(expect.stringContaining("invalid string"));
    }
  );
});

describe("when input is valid", () => {
  it.each`
    input                                   | result
    ${"5"}                                  | ${"5"}
    ${"0 + 1"}                              | ${"1"}
    ${"five"}                               | ${"five"}
    ${"zero plus one"}                      | ${"one"}
    ${"nine hundred ninety-eight plus one"} | ${"nine hundred ninety-nine"}
  `("should return '$result' for '$input'", ({ input, result }) => {
    const res = numbersReader.stringValidate(input);
    expect(res).toEqual(expect.stringContaining(result));
  });
});
