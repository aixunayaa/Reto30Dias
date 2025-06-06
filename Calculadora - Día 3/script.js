const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

let firstValue = null; // Almacena el primer número de la operación
let operator = null; // Almacena el operador seleccionado (+, -, *, /)
let waitingForSecondValue = false; // Indica si ya se ingresó el primer valor y se espera el segundo

keys.addEventListener('click', e => {
    // Solo procesa clics en botones
    if (e.target.matches('button')) {
        const key = e.target;
        const keyValue = key.value;

        // Si es un número (no tiene una clase de acción especial)
        if (!key.classList.contains('operator') && !key.classList.contains('decimal') && !key.classList.contains('clear') && !key.classList.contains('equal-sign')) {
            if (waitingForSecondValue === true) {
                display.value = keyValue;
                waitingForSecondValue = false;
            } else {
                // Si la pantalla muestra '0', reemplázalo; de lo contrario, concatena el número
                display.value = display.value === '0' ? keyValue : display.value + keyValue;
            }
        }

        // Si es un operador
        if (key.classList.contains('operator') && !key.classList.contains('equal-sign')) {
            handleOperator(keyValue);
        }

        // Si es el punto decimal
        if (key.classList.contains('decimal')) {
            inputDecimal(keyValue);
        }

        // Si es el botón de borrar
        if (key.classList.contains('clear')) {
            clearCalculator();
        }

        // Si es el botón de igual
        if (key.classList.contains('equal-sign')) {
            calculate();
        }
    }
});

function handleOperator(nextOperator) {
    const value = parseFloat(display.value); // Convierte el valor actual de la pantalla a un número

    // Si ya hay un operador y estamos esperando el segundo valor, simplemente actualiza el operador
    if (operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    // Si es el primer valor de la operación, lo guarda
    if (firstValue === null) {
        firstValue = value;
    } else if (operator) {
        // Si ya hay un primer valor y un operador, realiza la operación anterior
        const result = operate(operator, firstValue, value);
        display.value = String(result); // Muestra el resultado
        firstValue = result; // El resultado se convierte en el nuevo firstValue para encadenar operaciones
    }

    waitingForSecondValue = true; // Prepara la calculadora para el siguiente número
    operator = nextOperator; // Almacena el nuevo operador
}

function inputDecimal(dot) {
    // Si estamos esperando el segundo valor, al presionar el punto, empezamos con '0.'
    if (waitingForSecondValue === true) {
        display.value = '0.';
        waitingForSecondValue = false;
        return;
    }
    // Si la pantalla no contiene ya un punto, lo añade
    if (!display.value.includes(dot)) {
        display.value += dot;
    }
}

function clearCalculator() {
    display.value = '0'; // Resetea la pantalla a '0'
    firstValue = null; // Borra el primer valor
    operator = null; // Borra el operador
    waitingForSecondValue = false; // Resetea el estado de espera
}

function calculate() {
    const secondValue = parseFloat(display.value); // Obtiene el segundo número de la pantalla

    // Si no hay un primer valor o un operador, o si el segundo valor no es un número, no hace nada
    if (firstValue === null || operator === null || isNaN(secondValue)) {
        return;
    }

    const result = operate(operator, firstValue, secondValue); // Realiza la operación

    display.value = String(result); // Muestra el resultado
    firstValue = result; // El resultado se convierte en el nuevo firstValue para posibles operaciones encadenadas
    operator = null; // Reinicia el operador
    waitingForSecondValue = true; // Permite iniciar una nueva operación o continuar con el resultado
}

// Función para realizar las operaciones matemáticas
function operate(operator, num1, num2) {
    if (operator === '+') {
        return num1 + num2;
    }
    if (operator === '-') {
        return num1 - num2;
    }
    if (operator === '*') {
        return num1 * num2;
    }
    if (operator === '/') {
        if (num2 === 0) {
            return 'Error'; // Manejar la división por cero
        }
        return num1 / num2;
    }
    return 'Error'; // Si el operador no es reconocido
}