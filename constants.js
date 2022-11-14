// numbers from 0 to 9
const dg = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

// numbers from 10 to 19
const tn = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

// numbers from 20 to 90

const tw = [
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const th = ["hundred", "thousand"];

const invalidInputMessage = "invalid string";

const outOfRangeMessage = "some number is out of range (0-999)";

module.exports = { dg, tn, tw, th, invalidInputMessage, outOfRangeMessage };
