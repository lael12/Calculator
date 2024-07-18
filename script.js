document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    let displayValue = '0';
    let firstNumber = null;
    let secondNumber = null;
    let operator = null;
    let waitingForSecondNumber = false;

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            handleInput(button.textContent);
        });
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (!isNaN(key) || key === '.') {
            handleNumber(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleOperator(key);
        } else if (key === 'Enter') {
            event.preventDefault(); // Prevent form submission if inside a form
            handleEquals();
        } else if (key === 'Backspace') {
            handleBackspace();
        } else if (key.toLowerCase() === 'c') {
            handleClear();
        }
    });

    function handleInput(input) {
        if (!isNaN(input) || input === '.') {
            handleNumber(input);
        } else if (input === '+' || input === '-' || input === '*' || input === '/') {
            handleOperator(input);
        } else if (input === '=') {
            handleEquals();
        } else if (input === 'Clear') {
            handleClear();
        }
    }

    function handleNumber(number) {
        if (waitingForSecondNumber) {
            displayValue = number;
            waitingForSecondNumber = false;
        } else {
            if (displayValue === '0') {
                displayValue = number;
            } else {
                displayValue += number;
            }
        }
        updateDisplay();
    }

    function handleOperator(op) {
        if (firstNumber === null) {
            firstNumber = displayValue;
        } else if (operator && !waitingForSecondNumber) {
            secondNumber = displayValue;
            displayValue = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
            firstNumber = displayValue;
        }
        operator = op;
        waitingForSecondNumber = true;
        displayValue = `${firstNumber} ${operator}`;
        updateDisplay();
    }

    function handleEquals() {
        if (operator && firstNumber !== null && !waitingForSecondNumber) {
            secondNumber = displayValue;
            displayValue = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber)).toString();
            firstNumber = null;
            operator = null;
            secondNumber = null;
        }
        updateDisplay();
    }

    function handleClear() {
        displayValue = '0';
        firstNumber = null;
        secondNumber = null;
        operator = null;
        waitingForSecondNumber = false;
        updateDisplay();
    }

    function handleBackspace() {
        displayValue = displayValue.slice(0, -1) || '0';
        updateDisplay();
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
            return 'Error: Division by zero';
        }
        return a / b;
    }

    function updateDisplay() {
        display.textContent = displayValue;
    }
});
