'use strict';
/*2.2. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
2.1. Пустая корзина должна выводить строку «Корзина пуста»;
2.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».*/

const basket = {
    quantity: 0,
    tableNames: ['N', 'Name of position', 'Quantity', 'Price / 1pcs', 'Total price'],
    numberPos: [],
    namePos: [],
    count: [],
    price: [],
    addPos: function (name, count, price) {
        ++this.quantity;
        this.numberPos.push(this.quantity);
        this.namePos.push(name);
        this.count.push(count);
        this.price.push(price)
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

const addPosition = {
    basket,
    inputPosition: function () {
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
    },
    multiAddPosition: function () {
    let position = this.inputPosition()
    if (position[0] && position[1] && position[2]) {
        this.basket.addPos(position[0], position[1], position[2])
    }
    else {alert('Неверно указаны данные. Позиция не добавлена в корзину!')}
    // if (confirm('Хотите добавить еще позицию в коризину?')) {this.multiAddPosition()}
    siteContent.basketShow()
    return this.basket.countBasketPrice()
    }
}

const siteContent = {
    basket,
    addPosition,
    containerElement: null,
    init: function () {
        let h1 = document.createElement("h1");
        h1.className = "h1";
        h1.innerHTML = "Ваша корзина покупок";
        document.body.append(h1);
        h1.setAttribute("id", "h1");
        h1.setAttribute('align', 'center');
        this.basketShow()
        let p1 = document.createElement("p");
        p1.className = "div";
        document.body.append(p1);
        let btn = document.createElement("button");
        btn.className = "btn";
        btn.innerHTML = "Добавить товары";
        document.body.append(btn);
        btn.setAttribute("id", "btn1");
        btn.style.marginLeft = '70%'
        btn.setAttribute("onclick", "addPosition.multiAddPosition()");

    },
    basketShow: function () {
        let div = document.createElement("div");
        div.className = "div";
        document.body.append(div);
        div.setAttribute("id", "div1");
        div.setAttribute('align', 'center');
        if (this.basket.quantity === 0) {
            div.innerHTML = "Корзина пуста";
        } else {
            let div = document.getElementById("div1");
            div.innerHTML = ' ';
            this.productTable()
        }
    },
    productTable: function () {
        let table = document.createElement("table");
        table.className = "product";
        let div = document.getElementById("div1");
        div.appendChild(table);
        table.setAttribute("id", "product");
        this.containerElement = document.getElementById('product');
        this.initCells();
    },
    initCells() {
        for (let row = 0; row < this.basket.quantity + 1; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            for (let col = 0; col < this.basket.tableNames.length; col++) {
                const cell = document.createElement('td');
                if (row === 0) {
                    cell.innerHTML = '' + (this.basket.tableNames[col]) + '';
                    cell.setAttribute('align', 'center');
                }
                else{
                    switch (col){
                        case 0:
                            cell.innerHTML = '' + (this.basket.numberPos[row-1]) + '';
                            break;
                        case 1:
                            cell.innerHTML = '' + (this.basket.namePos[row-1]) + '';
                            break;
                        case 2:
                            cell.innerHTML = '' + (this.basket.count[row-1]) + '';
                            break;
                        case 3:
                            cell.innerHTML = '' + (this.basket.price[row-1]) + '';
                            break;
                        case 4:
                            cell.innerHTML = '' + (+this.basket.price[row-1] * +this.basket.count[row-1]) + '';
                            break;
                    }
                }
                trElem.appendChild(cell);
                cell.setAttribute('align', 'center');
            }
        }
        this.containerElement = document.getElementById('div1');
        let total = document.createElement("p");
        total.className = "total";
        total.innerHTML = 'TOTAL AMOUNT: ' + (this.basket.countBasketPrice()) + '';
        this.containerElement.appendChild(total);
    }
}

siteContent.init()






