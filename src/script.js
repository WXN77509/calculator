"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const select = document.querySelector('select');
const html = document.querySelector('html');
const title = document.querySelector('a#title span');
const history_title = document.querySelector('.results div p');
const div_output = document.getElementById('output');
const div_input = document.getElementById('input');
const ul_results = document.querySelector('.results div ul');
let calc_results = [];
let output = '';
let input = '';
let expression_error;
let syntax_error;
let memory = 0;
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
    html.setAttribute('lang', select.value);
});
function add(char) {
    output += ' ' + char;
    if (!'+-/*%'.includes(char)) {
        const value = (0, lib_1.calc)(output);
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
    show();
}
function equal() {
    const value = (0, lib_1.calc)(output);
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
    calc_results.push([value[0], input]);
    show();
}
function ac() {
    output = '';
    input = '0';
    show();
}
function ChangeSign() {
    output = '-' + output;
    const value = (0, lib_1.calc)(output);
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
    show();
}
function show() {
    div_output.innerText = `${output}`;
    div_input.innerText = `${input}`;
}
function show_results() {
    calc_results.forEach((value) => {
        const li = document.createElement('li');
        li.innerText = `${value[0]}${value[1]}`;
        ul_results.appendChild(li);
    });
}
changeLanguage();
show_results();
