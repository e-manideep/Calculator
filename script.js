const display = document.getElementById("display");
let currentNumber = "";
let firstNumber = "";
let operator = "";
let hasDecimal = false;

function clearCalculator() {
  currentNumber = "";
  firstNumber = "";
  operator = "";
  hasDecimal = false;
  display.textContent = "0";
}

function updateDisplay(value) {
  display.textContent = value;
}

function appendNumber(number) {
  if (number === "." && hasDecimal) {
    return;
  }
  if (number === ".") {
    hasDecimal = true;
  }
  currentNumber += number;
  updateDisplay(currentNumber);
}

function setOperator(value) {
  if (currentNumber === "") {
    return;
  }
  if (firstNumber !== "") {
    firstNumber = operate(operator, firstNumber, currentNumber);
    updateDisplay(roundResult(firstNumber));
  } else {
    firstNumber = currentNumber;
  }
  currentNumber = "";
  operator = value;
  hasDecimal = false;
}

function roundResult(value) {
  if (value.toString().includes(".")) {
    if (value.toString().split(".")[1].length > 5) {
      return value.toFixed(5);
    }
  }
  return value;
}

function operate(operator, num1, num2) {
  const num1Float = parseFloat(num1);
  const num2Float = parseFloat(num2);
  switch (operator) {
    case "+":
      return num1Float + num2Float;
    case "-":
      return num1Float - num2Float;
    case "*":
      return num1Float * num2Float;
    case "/":
      if (num2Float === 0) {
        alert("Cannot divide by zero!");
        clearCalculator();
        return;
      }
      return num1Float / num2Float;
    default:
      return;
  }
}

function addEventListeners() {
  const numberButtons = document.querySelectorAll(".number");
  const operatorButtons = document.querySelectorAll(".operator");
  const equalsButton = document.getElementById("equals");
  const clearButton = document.getElementById("clear");

  numberButtons.forEach(button => {
    button.addEventListener("click", () => {
      appendNumber(button.textContent);
    });
  });

  operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
      setOperator(button.textContent);
    });
  });

  equalsButton.addEventListener("click", () => {
    if (operator === "") {
      return;
    }
    firstNumber = operate(operator, firstNumber, currentNumber);
    updateDisplay(roundResult(firstNumber));
    currentNumber = "";
    operator = "";
    hasDecimal = false;
  });

  clearButton.addEventListener("click", () => {
    clearCalculator();
  });
}
function appendNumber(number) {
  if (number === "." && hasDecimal) {
    return;
  }
  if (number === ".") {
    hasDecimal = true;
  }
  currentNumber += number;
  updateDisplay(currentNumber);
  
  // Remove any previous event listeners before adding a new one
  const buttons = document.querySelectorAll(".number");
  buttons.forEach(button => {
    if (!button.hasListener) {
      button.addEventListener("click", function() {
        appendNumber(button.textContent);
      });
      button.hasListener = true;
    }
  });
}


addEventListeners();
