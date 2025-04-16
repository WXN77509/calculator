import { calc } from './lib.js';
const select = document.querySelector('select');
const html = document.querySelector('html');
const title = document.querySelector('a#title span');
const history_title = document.querySelector('.results div p');
const div_output = document.getElementById('output');
const div_input = document.getElementById('input');
const ul_results = document.querySelector('.results div ul');
const mReaderOrCleaner = document.getElementById('m-r-c');
changeLanguage();
let calc_results = [];
let output = '';
let input = '';
var expression_error;
var syntax_error;
let memory = 0;
let isMReader = true;
function changeLanguage() {
    html.setAttribute('lang', select.value);
    if (select.value === 'en') {
        title.innerText = 'Calculator';
        history_title.innerText = 'Calculation history :';
        expression_error = 'Expression error';
        syntax_error = 'Syntax error';
    }
    else if (select.value === 'es') {
        title.innerText = 'Calculadora';
        history_title.innerText = 'Historial de cálculo :';
        expression_error = 'Error de expresión';
        syntax_error = 'Error de sintaxis';
    }
    else {
        title.innerText = 'Calculatrice';
        history_title.innerText = 'Historique des calculs';
        expression_error = "Erreur d'expression";
        syntax_error = 'Erreur de syntaxe';
    }
    ;
}
select?.addEventListener('change', () => {
    changeLanguage();
});
function add(char) {
    if (!'+-/*%'.includes(char)) {
        output += char;
        const value = calc(output);
        if (typeof value[1] === 'string') {
            if (value[1] === 'Expression') {
                input = expression_error;
            }
            else {
                input = syntax_error;
            }
        }
        else {
            input = `${value[1]}`;
        }
    }
    else {
        output += ' ' + char + ' ';
    }
    show(false);
}
function equal() {
    const value = calc(output);
    output += ' =';
    if (typeof value[1] === 'string') {
        if (value[1] === 'Expression') {
            input = expression_error;
        }
        else {
            input = syntax_error;
        }
    }
    else {
        input = `${value[1]}`;
    }
    calc_results.push([value[0].replace('*', '×').replace('/', '÷'), input]);
    show(false);
    show_results();
    output = '';
    input = '';
}
function ac() {
    output = '';
    input = '';
    show(true);
}
function ChangeSign() {
    output = '-' + output;
    const value = calc(output);
    if (typeof value[1] === 'string') {
        if (value[1] === 'Expression') {
            input = expression_error;
        }
        else {
            input = syntax_error;
        }
    }
    else {
        input = `${value[1]}`;
    }
    show(false);
}
function show(isAc) {
    if (!isAc) {
        div_output.textContent = `${output.replace('*', '×').replace('/', '÷')}`;
        div_input.textContent = `${input}`;
    }
    else {
        div_output.textContent = '0';
        div_input.textContent = '0';
    }
}
function show_results() {
    ul_results.innerHTML = '';
    calc_results.forEach((value) => {
        const li = document.createElement('li');
        li.textContent = `${value[0]}${value[1]}`;
        ul_results.appendChild(li);
    });
}
function mPlus() {
    const value = calc(div_input.textContent)[1];
    if (typeof value === 'number' && !isNaN(value)) {
        memory += value;
    }
}
function mMoins() {
    const value = calc(div_input.textContent)[1];
    if (typeof value === 'number' && !isNaN(value)) {
        memory -= value;
    }
}
function mReader() {
    output = `${memory}`;
    input = `${memory}`;
    show(false);
}
function mCleaner() {
    memory = 0;
    ac();
}
document.getElementById('ac')?.addEventListener('click', () => ac());
document.getElementById('num-7')?.addEventListener('click', () => add('7'));
document.getElementById('num-8')?.addEventListener('click', () => add('8'));
document.getElementById('num-9')?.addEventListener('click', () => add('9'));
document.getElementById('sign-plus')?.addEventListener('click', () => add('+'));
document.getElementById('m-plus')?.addEventListener('click', () => mPlus());
document.getElementById('num-4')?.addEventListener('click', () => add('4'));
document.getElementById('num-5')?.addEventListener('click', () => add('5'));
document.getElementById('num-6')?.addEventListener('click', () => add('6'));
document.getElementById('sign-moins')?.addEventListener('click', () => add('-'));
document.getElementById('m-moins')?.addEventListener('click', () => mMoins());
document.getElementById('num-1')?.addEventListener('click', () => add('1'));
document.getElementById('num-2')?.addEventListener('click', () => add('2'));
document.getElementById('num-3')?.addEventListener('click', () => add('3'));
document.getElementById('sign-fois')?.addEventListener('click', () => add('*'));
mReaderOrCleaner.addEventListener('click', () => {
    if (isMReader) {
        mReader();
        isMReader = false;
        mReaderOrCleaner.textContent = 'MC';
    }
    else {
        mCleaner();
        isMReader = true;
        mReaderOrCleaner.textContent = 'MR';
    }
});
document.getElementById('num-0')?.addEventListener('click', () => add('0'));
document.getElementById('other-point')?.addEventListener('click', () => add('.'));
document.getElementById('other-ChangeSign')?.addEventListener('click', () => ChangeSign());
document.getElementById('sign-division')?.addEventListener('click', () => add('/'));
document.getElementById('modulo')?.addEventListener('click', () => add('%'));
document.getElementById('parenthese-right')?.addEventListener('click', () => add('('));
document.getElementById('parenthese-left')?.addEventListener('click', () => add(')'));
document.getElementById('equal')?.addEventListener('click', () => equal());
