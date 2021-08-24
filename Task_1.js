'use strict';
/*Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999,
мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы,
десятки и сотни. Например, для числа 245 мы должны получить следующий объект:
{‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и
вернуть пустой объект.*/

let numbers = {
    one: null,
    ten: null,
    hundred: null
}

function numToObj(num) {
    if (num > 999 || num < 0 || !Number.isInteger(+num)) {
        console.log(numbers)
        return 'Введенное значение вне допустимого диапазона (0-999)'
    }
    numbers.one = Number.parseInt(num % 10)
    numbers.ten = Number.parseInt((num / 10) % 10)
    numbers.hundred = Number.parseInt((num / 100))
    return numbers
}

let inputNum = parseInt(prompt('Введите значение от 0 до 999'))
console.log(numToObj(inputNum))