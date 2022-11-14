/*
dg is an array of strings in English from 0 to 9
tn is an array of strings in English from 10 to 19
tw is an array of strings in English from 20 to 90
th is an array of strings in English contains hundred and thousand only
*/
const {
  dg,
  tn,
  tw,
  th,
  invalidInputMessage,
  outOfRangeMessage,
} = require("../constants.js");

// Max number is 999 and min number is 0.
function validateDigit(digit) {
  if (digit >= 0 && digit <= 999) {
    return digit;
  } else {
    return outOfRangeMessage;
  }
}
// Number can belong to dg, tn and tw
function convertStrToNumberFrom0to99(str) {
  const dgIndex = dg.indexOf(str);
  const tnIndex = tn.indexOf(str);
  const twIndex = tw.indexOf(str);
  const hasSpecialCharacter = str.split("-");
  if (dgIndex != -1) {
    return dgIndex;
  } else if (tnIndex != -1) {
    return `1${tnIndex}`;
  } else if (twIndex != -1) {
    return `${twIndex + 2}0`;
  } else if (hasSpecialCharacter.length === 2) {
    const firstIndex = tw.indexOf(hasSpecialCharacter[0]);
    const secondIndex = dg.indexOf(hasSpecialCharacter[1]);
    if (firstIndex != -1 && secondIndex != -1) {
      return +`${firstIndex + 2}0` + +secondIndex;
    }
  }
}
// First number can belong to dg, tn and tw
//Second number is either hundred or thousand
function convertStrToNumberFrom100to1000(str) {
  const dgIndex = dg.indexOf(str[0]);
  if (dgIndex != -1 && dgIndex != 0) {
    const thIndex = th.indexOf(str[1]);
    if (thIndex != -1) {
      return +dgIndex * 10 ** (thIndex + 2);
    }
  }
}

// convert english numbers to digits
function toDigit(str) {
  const splittedString = str.split(" ");
  // should be within dg, tn, tw arrays or has `-` character
  if (splittedString.length === 1) {
    return convertStrToNumberFrom0to99(str);
  } else if (splittedString.length === 2) {
    return convertStrToNumberFrom100to1000(splittedString);
  } else if (splittedString.length === 3) {
    return (
      +convertStrToNumberFrom100to1000(splittedString) +
      +convertStrToNumberFrom0to99(splittedString[2])
    );
  }
}

// Convert result to Words in English if English is the used language
// or just return digits if not
function validateSumNumbers(firstNumber, secondNumber, language) {
  if (!isNaN(firstNumber) && !isNaN(secondNumber)) {
    firstNumber = validateDigit(firstNumber);
    secondNumber = validateDigit(secondNumber);
    return !isNaN(firstNumber) && !isNaN(secondNumber)
      ? language === "English"
        ? toWords(+firstNumber + +secondNumber)
        : "" + (firstNumber + secondNumber)
      : outOfRangeMessage;
  } else {
    return invalidInputMessage;
  }
}

function sum(numbers) {
  // digits
  if (numbers[0] == +numbers[0] && numbers[1] == +numbers[1]) {
    return validateSumNumbers(numbers[0], numbers[1], "Digits");
  } else if (
    // making sure that both of them are not numbers
    numbers[0] != +numbers[0] &&
    numbers[1] != +numbers[1]
  ) {
    let firstNumber = toDigit(numbers[0]);
    let secondNumber = toDigit(numbers[1]);

    return validateSumNumbers(firstNumber, secondNumber, "English");
  } else {
    return invalidInputMessage;
  }
}

function convertNumberToStrFrom0to99(str) {
  const firstDigit = +str[0];
  const secondDigit = +str[1];
  // from 0 to 9
  if (firstDigit === 0) {
    return dg[str[1]];
  }
  // from 10 to 19
  else if (firstDigit === 1) {
    return tn[str[1]];
  }
  // from 20 to 99
  else if (firstDigit >= 2 && firstDigit <= 9) {
    if (secondDigit === 0) {
      return tw[firstDigit - 2];
    } else {
      return `${tw[firstDigit - 2]}-${dg[secondDigit]}`;
    }
  }
}

// convert the result to english
function toWords(digit) {
  const str = digit.toString();
  const digitLength = str.length;
  // from 0 to 9
  if (digitLength === 1) {
    return dg[str];
  } else if (digitLength === 2) {
    return convertNumberToStrFrom0to99(str);
  } else if (digitLength === 3) {
    const firstDigit = +str[0]; // must be from 1 to 9

    if (firstDigit >= 1 && firstDigit <= 9) {
      return `${dg[firstDigit]} hundred ${convertNumberToStrFrom0to99(
        str[1] + str[2]
      )}`;
    }
  } else if (digitLength === 4) {
    const firstDigit = +str[0]; // must be from 1 to 9
    const secondDigit = +str[1]; // must be from 1 to 9

    if (
      firstDigit >= 1 &&
      firstDigit <= 9 &&
      secondDigit >= 1 &&
      secondDigit <= 9
    ) {
      return `${dg[firstDigit]} thousand ${
        dg[secondDigit]
      } hundred ${convertNumberToStrFrom0to99(str[2] + str[3])}`;
    }
  }
}

exports.stringValidate = function (str) {
  let splittedString = str.split(/\+|\plus/);

  // string has infix operator 'plus' or '+'
  if (splittedString.length === 2) {
    // clearing white spaces
    splittedString = splittedString.map((string) =>
      string.replace(/^\s+|\s+$/g, "")
    );
    return sum(splittedString);
  } else if (splittedString.length === 1) {
    // check if the input empty or not
    if (typeof str === "string" && str.trim() !== "") {
      // check if the string is digit or english
      if (str == +str) {
        //digit
        return validateDigit(str);
      } else {
        //english
        // negative numbers
        const negativeKeyword = "minus";
        const isNegativeNumber = str.includes(negativeKeyword);
        if (isNegativeNumber) {
          let negativeString = str.slice(negativeKeyword.length + 1);
          let digit = +`-${toDigit(negativeString)}`;
          if (!isNaN(digit)) {
            digit = validateDigit(digit);
            return digit;
          } else {
            return invalidInputMessage;
          }
        } else {
          let digit = toDigit(str);
          if (!isNaN(digit)) {
            digit = validateDigit(digit);
            return !isNaN(digit) ? toWords(digit) : digit;
          } else {
            return invalidInputMessage;
          }
        }
      }
    } else {
      return "empty input";
    }
  } else {
    return invalidInputMessage;
  }
};
