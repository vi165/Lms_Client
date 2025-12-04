// Simple calculator logic for calculator.html
// Handles digits, decimal point, operators, clear and equals

const display = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstOperand = null;
let waitingForSecondOperand = false;
let operator = null;

function updateDisplay() {
	if (display) display.value = displayValue;
}

function inputDigit(digit) {
	if (waitingForSecondOperand) {
		displayValue = digit;
		waitingForSecondOperand = false;
	} else {
		displayValue = displayValue === '0' ? digit : displayValue + digit;
	}
}

function inputDecimal(dot) {
	if (waitingForSecondOperand) {
		// start new number with 0.
		displayValue = '0' + dot;
		waitingForSecondOperand = false;
		return;
	}
	if (!displayValue.includes(dot)) {
		displayValue += dot;
	}
}

function handleOperator(nextOperator) {
	const inputValue = parseFloat(displayValue);

	if (operator && waitingForSecondOperand) {
		// Replace operator if user changes their mind
		operator = nextOperator;
		return;
	}

	if (firstOperand == null && !Number.isNaN(inputValue)) {
		firstOperand = inputValue;
	} else if (operator) {
		const result = performCalculation(operator, firstOperand, inputValue);
		displayValue = `${parseFloat(result.toFixed(10))}`; // remove floating error noise
		firstOperand = result;
	}

	waitingForSecondOperand = true;
	operator = nextOperator;
}

function performCalculation(op, a, b) {
	switch (op) {
		case '+':
			return a + b;
		case '-':
			return a - b;
		case '*':
			return a * b;
		case '/':
			return b === 0 ? NaN : a / b;
		case '=':
			return b;
	}
	return b;
}

function resetCalculator() {
	displayValue = '0';
	firstOperand = null;
	waitingForSecondOperand = false;
	operator = null;
}

// Event delegation for calculator buttons
if (keys) {
	keys.addEventListener('click', (event) => {
		const { target } = event;
		if (!target.matches('button')) return;

		if (target.classList.contains('operator')) {
			// operators include + - * / and =
			const val = target.value;
			if (val === '=') {
				handleOperator('=');
				operator = null; // reset operator after equals
			} else {
				handleOperator(val);
			}
			updateDisplay();
			return;
		}

		if (target.classList.contains('decimal')) {
			inputDecimal(target.value);
			updateDisplay();
			return;
		}

		if (target.classList.contains('all-clear')) {
			resetCalculator();
			updateDisplay();
			return;
		}

		// Digit
		inputDigit(target.value);
		updateDisplay();
	});
}

// Initialize display
updateDisplay();

