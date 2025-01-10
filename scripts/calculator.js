// Basic Calculator Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Cannot divide by zero!";
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

// HTML structure for calculator (to be included in your HTML file):
// <div id="calculator">
//     <div id="display">0</div>
//     <div class="buttons">
//         <button class="digit">7</button>
//         <button class="digit">8</button>
//         <button class="digit">9</button>
//         <button class="operator">/</button>
//         <button class="digit">4</button>
//         <button class="digit">5</button>
//         <button class="digit">6</button>
//         <button class="operator">*</button>
//         <button class="digit">1</button>
//         <button class="digit">2</button>
//         <button class="digit">3</button>
//         <button class="operator">-</button>
//         <button class="digit">0</button>
//         <button id="clear">C</button>
//         <button id="equals">=</button>
//         <button class="operator">+</button>
//     </div>
// </div>

// JavaScript for functionality
let firstNumber = "";
let secondNumber = "";
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");
const digitButtons = document.querySelectorAll(".digit");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

function updateDisplay(value) {
    if (shouldResetDisplay) {
        display.textContent = value;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === "0" ? value : display.textContent + value;
    }
}

function resetCalculator() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = null;
    display.textContent = "0";
    shouldResetDisplay = false;
}

digitButtons.forEach((button) =>
    button.addEventListener("click", () => {
        updateDisplay(button.textContent);
    })
);

operatorButtons.forEach((button) =>
    button.addEventListener("click", () => {
        console.log("operator clicked");
        if (currentOperator !== null) {
            secondNumber = display.textContent;
            display.textContent = roundResult(
                operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber))
            );
            firstNumber = display.textContent;
            shouldResetDisplay = true;
        } else {
            firstNumber = display.textContent;
            shouldResetDisplay = true;
        }
        currentOperator = button.textContent;
    })
);

equalsButton.addEventListener("click", () => {
    if (currentOperator === null || shouldResetDisplay) return;
    secondNumber = display.textContent;
    display.textContent = roundResult(
        operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber))
    );
    firstNumber = display.textContent;
    currentOperator = null;
    shouldResetDisplay = true;
});

clearButton.addEventListener("click", resetCalculator);

function roundResult(result) {
    return Math.round(result * 100) / 100;
}
