'use strict';
let basket = [];

function inputPosition() {
    let product = prompt('Введите наименование товара:');
    let count;
    let price;
    while (true) {
        count = prompt('Введите количество товара:');
        if (Number.isInteger(+count) && +count > 0) {
            break
        }
    }
    while (true) {
        price = prompt('Введите стоимость единицы товара:');
        if (Number.isInteger(+price * 100) && +price > 0) {
            break
        }
    }
    return [product, count, price]
}

function addPosition() {
    let position = inputPosition()
    basket.push(position)
    if (confirm('Хотите добавить еще позицию в коризину?')) addPosition()
    return basket
}

function countBasketPrice() {
    let moneyPosition = []
    let allCost = 0
    for (const item of basket) {
        moneyPosition.push([item[0], (item[1] * item[2])])
        allCost = allCost + (item[1] * item[2])
    }
    moneyPosition.unshift(allCost)
    return moneyPosition
}

addPosition()
let money = countBasketPrice()
for (const index in money) {
    if (+index === 0) {
        alert('Итоговая стоимость товаров: ' + money[0])
    } else {
        alert((index) + ':' + money[index])
    }
}