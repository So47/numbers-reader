const express = require("express");
const app = express();
const numbersReader = require("./services/numbersReader");

let inputString = "";

process.stdin.on("data", function (data) {
  inputString = data.toString();
  inputString = inputString.replace("\n", "");
  main();
});

function main() {
  const result = numbersReader.stringValidate(inputString);
  process.stdout.write(result.toString());
  process.exit();
}
app.listen(3000);
