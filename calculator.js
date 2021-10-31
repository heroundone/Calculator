function add(num1, num2) {
    return num1 + num2;
};

function subtract(num1, num2) {
    return num1 - num2;
};

function multiply(num1, num2) {
    return num1 * num2;
};

function divide(num1, num2) {
    if(num2 === '0') {
        return document.getElementById('displayText').textContent = "can't do that!";
    }
    return num1 / num2;
};

function operate(num1, num2, operator) {
    if(operator === '+') {
        return add(parseInt(num1), parseInt(num2));
    }
    else if(operator === '-') {
        return subtract(num1, num2);
    }
    else if(operator === '*') {
        return multiply(num1, num2);
    }
    else {
        return divide(num1, num2);
    };
};

// create object to contain equation
let equation = {
    num1: null,
    operator: null,
    num2: null,
}

// establish display as a global variable for easier access to and editing of the calculator display box
let display = document.getElementById('displayText');

// event listener and function for adding digits to display
document.querySelectorAll('.toDisplay').forEach(digit => {
    digit.addEventListener('click', (e) => {
        text = e.target.textContent;
        // check whether button clicked is an operand or operator
        if(text === '+' | text === '-' | text === '*' | text === '/') {
            if(equation['num1'] != null && equation['num2'] === null) {
                display.textContent += ' ' + text + ' ';
                equation['operator'] = text;
            }
            else if(equation['num1'] === null) {
                return;
            }
            else {
               answer = operate(equation['num1'], equation['num2'], equation['operator']);
               equation['num1'] = answer.toFixed(2);
               display.textContent = answer.toFixed(2);
               equation['operator'] = null;
               equation['num2'] = null;
            }
        }
        // check to see whether to assign to num1 or num2
        else {
            if(equation['num1'] === null) {
                display.textContent += text;
                equation['num1'] = display.textContent
            }
            else if(equation['operator'] === null) {
                display.textContent += text;
                equation['num1'] += text;
            }
            else if(equation['num1'] != null && equation['operator'] != null && equation['num2'] === null) {
                display.textContent += text;
                equation['num2'] = text;
            }
            else {
                display.textContent += text;
                equation['num2'] += text;
            }
        };
        console.log(equation['num1']);
        console.log(equation['operator']);
        console.log(equation['num2']);
    });
});

// event listener and function for evaluating the expression
document.querySelector('#solve').addEventListener('click', () => {
    if(equation['num1'] != null && equation['num2'] != null && equation['operator'] != null) {
        answer = operate(equation['num1'], equation['num2'], equation['operator']);
        equation['num1'] = answer.toFixed(2);
        display.textContent = answer.toFixed(2);
        equation['operator'] = null;
        equation['num2'] = null;
    }
    else {
        return;
    };
});

// event listener and function for clearing calculator's "memory"
document.querySelector('#clear').addEventListener('click', () => {
    display.textContent = '';
    for(let key in equation) {
        equation[key] = null;
    };
});