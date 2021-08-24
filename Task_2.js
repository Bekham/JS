'use strict';
/*2.Продолжить работу с интернет-магазином:
2.1. В прошлом домашнем задании вы реализовали корзину на базе массивов.
Какими объектами можно заменить их элементы?
2.2. Реализуйте такие объекты.
2.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.*/

let basket = {
    namePos: [],
    count: [],
    price: [],
    addPos: function (name, count, price) {
        if (name && count && price) {
            this.namePos.push(name);
            this.count.push(count);
            this.price.push(price)
        } else {
            alert('Неверно указаны данные. Позиция не добавлена в корзину!')
        }
    },
    countBasketPrice: function () {
        let totalPrice = 0
        console.log('N | Name of position | Quantity | Price / 1pcs | Total price |')
        for (let index in this.namePos) {
            let posCost = this.count[index] * this.price[index]
            console.log((+index + 1) + ' | ' + this.namePos[index] + ' | ' + this.count[index] + ' | ' +
                this.price[index] + ' | ' + posCost)
            totalPrice = totalPrice + posCost
        }
        return totalPrice
    }
}

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
    basket.addPos(position[0], position[1], position[2])
    if (confirm('Хотите добавить еще позицию в коризину?')) addPosition()
    return basket
}

console.log(addPosition())
console.log('TOTAL: ' + basket.countBasketPrice())





