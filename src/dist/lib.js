const is_ascii_digit = (char) => {
    switch (char) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            return true;
        default:
            return false;
    }
};
function last(array) {
    return array[array.length - 1];
}
function get_operator_priority(op) {
    switch (op) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
        case '%':
            return 2;
        default:
            return 0;
    }
}
export function shunting_yard(token) {
    let operators = [];
    let output = [];
    let numbers = "";
    let expression = token.split('');
    let last_token_was_operator = true;
    let index = 0;
    for (let char of expression) {
        switch (char) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '%':
                if (last_token_was_operator && (char === '-' || char === '+')) {
                    if (index + 1 < expression.length) {
                        let next_char = expression[index + 1];
                        if (is_ascii_digit(next_char)) {
                            numbers += char;
                            last_token_was_operator = false;
                            break;
                        }
                        else if (next_char === '(') {
                            operators.push(char === '-' ? "u-" : "u+");
                            last_token_was_operator = true;
                            break;
                        }
                    }
                }
                if (last_token_was_operator && char === '-') {
                    if (index + 1 < expression.length && expression[index + 1] === '-') {
                        expression.splice(index, 2);
                        expression.splice(index, 0, '+');
                    }
                }
                if (last_token_was_operator && (char === '*' || char === '/' || char === '%')) {
                    if (index > 0 && expression[index - 1] === ')') {
                    }
                    else {
                        return { value: null };
                    }
                }
                if (char === '(') {
                    if (last_token_was_operator) {
                        if (last(operators) === "u-") {
                            output.push("u-");
                            operators.pop();
                        }
                    }
                    operators.push(char);
                    last_token_was_operator = true;
                }
                if (numbers.length === 0 && output.length === 0 && char !== '(') {
                    return { value: null };
                }
                if (numbers.length !== 0) {
                    output.push(numbers);
                    numbers = "";
                }
                if (index > 0 && "+*/%".includes(expression[index - 1])) {
                    if (char === '-' && index + 1 < expression.length && is_ascii_digit(expression[index + 1])) {
                        numbers += char;
                        last_token_was_operator = false;
                        continue;
                    }
                    return { value: null };
                }
                if (char === '/' && expression[index + 1] === '/') {
                    return { value: null };
                }
                if (char === '*' && expression[index + 1] === '*') {
                    return { value: null };
                }
                if (char === '%' && index + 1 < expression.length && expression[index + 1] === '%') {
                    return { value: null };
                }
                stack: while (true) {
                    let top_op = last(operators);
                    switch (top_op) {
                        case undefined:
                            break stack;
                        default: {
                            let top_char = top_op[0];
                            let top_priority = get_operator_priority(top_char);
                            let current_priority = get_operator_priority(char);
                            if (current_priority <= top_priority) {
                                output.push(operators.pop());
                            }
                            else {
                                break stack;
                            }
                        }
                    }
                }
                operators.push(char);
                last_token_was_operator = true;
                break;
            case '(':
                operators.push(char);
                last_token_was_operator = true;
                break;
            case ')':
                if (numbers.length !== 0) {
                    output.push(numbers);
                    numbers = "";
                }
                let found_open_parenthesis = false;
                let op;
                while ((op = operators.pop()) !== undefined) {
                    if (op === '(') {
                        found_open_parenthesis = true;
                        break;
                    }
                    output.push(op);
                }
                if (!found_open_parenthesis) {
                    return { value: null };
                }
                last_token_was_operator = false;
                break;
            case '.':
                if (numbers.includes('.')) {
                    return { value: null };
                }
                if (numbers.length === 0) {
                    numbers = '0';
                }
                if (index + 1 >= expression.length || !is_ascii_digit(expression[index + 1])) {
                    return { value: null };
                }
                numbers += '.';
                break;
            default: {
                if (is_ascii_digit(char)) {
                    numbers += char;
                    last_token_was_operator = false;
                }
                else if (char === " ") {
                    // On ignore les espaces
                }
                else {
                    return { value: null };
                }
                break;
            }
        }
        index++;
    }
    if (numbers.length !== 0) {
        output.push(numbers);
    }
    let op;
    while ((op = operators.pop()) !== undefined) {
        if (op === '(') {
            return { value: null };
        }
        output.push(op);
    }
    return { value: output };
}
export function evaluate_rpn(tokens) {
    let stack = [];
    for (let token of tokens) {
        switch (token) {
            case "u-": {
                let a = stack.pop();
                if (a !== undefined) {
                    stack.push(-a);
                }
                else {
                    return { value: null };
                }
                break;
            }
            case "+": {
                let b = stack.pop();
                let a = stack.pop();
                if (a !== undefined && b !== undefined) {
                    stack.push(a + b);
                }
                else {
                    return { value: null };
                }
                break;
            }
            case "-": {
                let b = stack.pop();
                let a = stack.pop();
                if (a !== undefined && b !== undefined) {
                    stack.push(a - b);
                }
                else {
                    return { value: null };
                }
                break;
            }
            case "*": {
                let a = stack.pop();
                let b = stack.pop();
                if (a !== undefined && b !== undefined) {
                    stack.push(a * b);
                }
                else {
                    return { value: null };
                }
                break;
            }
            case "/": {
                let b = stack.pop();
                let a = stack.pop();
                if (a !== undefined && b !== undefined) {
                    if (b === 0) {
                        return { value: null };
                    }
                    stack.push(a / b);
                }
                else {
                    return { value: null };
                }
                break;
            }
            case '%': {
                let b = stack.pop();
                let a = stack.pop();
                if (a !== undefined && b !== undefined) {
                    if (b === 0) {
                        return { value: null };
                    }
                    stack.push(a % b);
                }
                else {
                    return { value: null };
                }
                break;
            }
            default: {
                let num;
                try {
                    num = parseFloat(token);
                }
                catch (_) {
                    return { value: null };
                }
                stack.push(num);
            }
        }
    }
    if (stack.length === 1) {
        const result = stack.pop();
        return { value: result };
    }
    else {
        return { value: null };
    }
}
export function calc(expression) {
    let x = shunting_yard(expression);
    switch (x.value) {
        case null: {
            return [expression + ' = ', 'Syntax'];
        }
        default: {
            let result = evaluate_rpn(x.value).value;
            switch (result) {
                case null: {
                    return [expression + ' = ', 'Expression'];
                }
                default: {
                    return [expression + ' = ', result];
                }
            }
        }
    }
}
