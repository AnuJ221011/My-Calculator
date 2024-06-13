// Get the display element
const display = document.getElementById('display');

// Get all the keys
const keys = document.querySelectorAll('.key');

// Define the variables to store the current operation and result
let currentInput = '';
let previousInput = '';
let operator = null;

// Add event listeners to the keys
keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;

        if (key.id === 'clear') {
            clearAll();
        } else if (key.id === 'delete') {
            deleteLast();
        } else if (key.id === 'equal') {
            calculate();
        } else if (key.id === 'divide' || key.id === 'multiply' || key.id === 'subtract' || key.id === 'add') {
            setOperator(keyValue);
        } else {
            appendNumber(keyValue);
        }
    });
});

// Function to clear the display and reset variables
function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// Function to delete the last character from the input
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

// Function to append a number or dot to the input
function appendNumber(number) {
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

// Function to set the operator and move the current input to the previous input
function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
    display.value = previousInput + operator; // Show operator in display
}

// Function to perform the calculation
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case 'x':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// Function to update the display
function updateDisplay() {
    display.value = currentInput || previousInput;
}
