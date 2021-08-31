'use strict';
/*
a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
*/

const basket = {
    tableNames: ['N', 'Name of position', 'Quantity', 'Price / 1pcs', 'Total price'],
    cartGoods: [],
    countCartPrice: function () {
        let totalPrice = 0
        if (+this.cartGoods.length > 0) {
            for (let index in this.cartGoods) {
                let posCost = +this.cartGoods[index][2] * +this.cartGoods[index][3]
                totalPrice = totalPrice + posCost
            }
        }
        return totalPrice
    }
}

const goods = {
    goodsTableNames: ['id', 'Name', 'Quantity', 'Price'],
    allGoods: [[123, 'Ноутбук', 5, 35000],
        [345, 'Клавиатура', 20, 700],
        [678, 'Мышь', 35, 1200],
        [111, 'Материнская плата', 11, 18000],
        [141, 'Видеокарта', 3, 87000]
    ],
    countSelected: [],
    selectedGoodsCountDefault: function () {
        if (this.countSelected.length === 0) {
            for (let i = 0; i < this.allGoods.length; i++) {
                this.countSelected.push(1)
            }
        }
    }
}

const basketSiteContent = {
    basket,
    goods,
    containerElement: null,
    basketView: 0,
    init: function () {
        this.showBasketLogo();
        this.basketShow();
        this.clearCartButton();
        this.showButton();
    },
    showBasketLogo: function () {
        this.containerElement = document.getElementById("basket");
        let h1 = document.createElement("h1");
        h1.innerHTML = "Ваша корзина покупок";
        this.containerElement.appendChild(h1);
        h1.setAttribute("id", "h1");
        h1.setAttribute('align', 'center');
    },
    basketShow: function () {
        this.containerElement = document.getElementById("basket");
        let div = document.createElement("div");
        this.containerElement.appendChild(div);
        div.setAttribute("id", "div1");
        div.setAttribute('align', 'center');
        if (this.basket.cartGoods.length < 1) {
            div.innerHTML = "Корзина пуста";
        } else {
            div.innerHTML = ' ';
            this.productTable()
        }
    },
    productTable: function () {
        let table = document.createElement("table");
        let div = document.getElementById("div1");
        div.appendChild(table);
        table.setAttribute("id", "selectedGoods");
        this.initCells();
    },
    initCells() {
        this.containerElement = document.getElementById('selectedGoods');
        for (let row = 0; row < this.basket.cartGoods.length + 1; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);
            for (let col = 0; col < this.basket.tableNames.length; col++) {
                const cell = document.createElement('td');
                if (row === 0) {
                    cell.innerHTML = '' + (this.basket.tableNames[col]) + '';
                } else if (col === 0) {
                    cell.innerHTML = (row).toString();
                } else if (col === 4) {
                    cell.innerHTML = '' + +(this.basket.cartGoods[row - 1][2]) * +(this.basket.cartGoods[row - 1][3]);
                } else {
                    cell.innerHTML = this.basket.cartGoods[row - 1][col];
                }

                trElem.appendChild(cell);
                cell.setAttribute('align', 'center');
            }
        }
        this.containerElement = document.getElementById('div1');
        let total = document.createElement("p");
        total.className = "total";
        total.innerHTML = 'Общая сумма: ' + (this.basket.countCartPrice()) + '';
        this.containerElement.appendChild(total);
    },
    clearCartButton: function () {
        if (this.basket.cartGoods.length > 0) {
            let btnClear = document.createElement("button");
            btnClear.setAttribute("id", "btnClear");
            btnClear.innerHTML = "Очистить корзину";
            this.containerElement.appendChild(btnClear);
            btnClear.addEventListener('click', (event) => this.clearCart(event));
        }
    },
    clearCart: function () {
        for (let i = 0; i < this.basket.cartGoods.length; i++) {
            for (let j = 0; j < this.goods.allGoods.length; j++) {
                if (+this.basket.cartGoods[i][0] === +goods.allGoods[j][0]) {
                    goods.allGoods[j][2] = goods.allGoods[j][2] + this.basket.cartGoods[i][2]
                    goodsSiteContent.changeGoodsView(j)
                }
            }
        }
        this.basket.cartGoods = [];
        document.getElementById("div1").remove();
        this.basketShow();

    },
    showButton: function () {
        let p1 = document.createElement("p");
        p1.setAttribute("id", "btnP");
        document.body.append(p1);
        let btn = document.createElement("button");
        btn.className = "btn";
        document.body.append(btn);
        btn.setAttribute("id", "btnCart");
        this.buttonName();
        btn.style.marginLeft = '70%'
        btn.addEventListener('click', (event) => this.buttonVisibility(event));
    },
    buttonName: function () {
        let btnCart = document.getElementById("btnCart");
        if (+this.basketView === 1) {
            btnCart.innerHTML = "Скрыть корзину";
        } else {
            document.getElementById('basket').style.display = 'none';
            btnCart.innerHTML = "Отобразить корзину";
        }
    },
    buttonVisibility: function () {
        if (this.basketView === 1) {
            document.getElementById('basket').style.display = 'none';
            document.getElementById('goods').style.display = '';
            this.basketView = 0;
        } else {
            document.getElementById('basket').style.display = '';
            document.getElementById('goods').style.display = 'none';
            this.basketView = 1;
        }
        this.buttonName();
    }

}

const goodsSiteContent = {
    basket,
    basketSiteContent,
    goods,
    goodsContainerElement: null,
    moveGoodToCart: [],
    init: function () {
        this.goods.selectedGoodsCountDefault();
        this.showGoodsLogo();
        this.goodsTable();
        this.goodCells();
    },
    showGoodsLogo: function () {
        this.goodsContainerElement = document.getElementById("goods");
        let h1 = document.createElement("h1");
        h1.className = "h1_goods";
        h1.innerHTML = "Магазин на диване";
        this.goodsContainerElement.appendChild(h1);
        h1.setAttribute("id", "h1_goods");
        h1.setAttribute('align', 'center');
    },
    goodsTable: function () {
        let table = document.createElement("table");
        table.className = "goods_table";
        this.goodsContainerElement.appendChild(table);
        table.setAttribute("id", "goods_table");
        table.setAttribute('align', 'center');
        this.goodsContainerElement = document.getElementById('goods_table');

    },
    goodCells: function () {
        for (let row = 0; row < this.goods.allGoods.length; row++) {
            const trElem = document.createElement('tr');
            this.goodsContainerElement.appendChild(trElem);
            for (let col = 0; col < 2; col++) {
                const cell = document.createElement('td');
                if (col === 0) {
                    cell.innerHTML = this.goodsTableText(row);
                    cell.setAttribute('width', '600px');
                    cell.setAttribute('align', 'left');
                    cell.setAttribute("id", (row) + "goods");
                    trElem.appendChild(cell);
                } else {
                    cell.setAttribute("id", (row) + "td");
                    cell.setAttribute('align', 'center');
                    // cell.dataset.td = ((row)+"td").toString();

                    trElem.appendChild(cell);
                    this.buyGood(row)
                }
            }
        }
    },
    goodsTableText: function (row) {
        return 'Наименование: ' + goods.allGoods[row][1] + '<br>' +
            'Количество на складе: ' + goods.allGoods[row][2] + '<br>' +
            'Стоимость: ' + goods.allGoods[row][3]
    },
    buyGood: function (row) {
        let buyGoodButtonID = document.getElementById((row) + 'td');
        this.countTextSelect(buyGoodButtonID, row)
        this.minusSelect(buyGoodButtonID, row);
        this.plusSelect(buyGoodButtonID, row);
        this.buyButton(buyGoodButtonID, row);
    },
    minusSelect(buyGoodButtonID, row) {
        let btnMinus = document.createElement("button");
        btnMinus.setAttribute("id", (row) + "btnMinus");
        btnMinus.innerHTML = "-";
        buyGoodButtonID.appendChild(btnMinus);
        btnMinus.addEventListener('click', (event) => this.countMinus(event));
    },
    countTextSelect(buyGoodButtonID, row) {
        buyGoodButtonID.innerHTML = "Количество<br>" + this.goods.countSelected[row] + "<br>";
    },
    plusSelect(buyGoodButtonID, row) {
        let btnPlus = document.createElement("button");
        btnPlus.setAttribute("id", (row) + "btnPlus");
        btnPlus.innerHTML = "+";
        buyGoodButtonID.appendChild(btnPlus);
        btnPlus.addEventListener('click', (event) => this.countPlus(event));
    },
    buyButton: function (buyGoodButtonID, row) {
        let p2 = document.createElement("p");
        buyGoodButtonID.appendChild(p2);
        let btnBuy = document.createElement("button");
        btnBuy.setAttribute("id", (row) + "btnBuy");
        btnBuy.innerHTML = "Купить";
        buyGoodButtonID.appendChild(btnBuy);
        btnBuy.addEventListener('click', (event) => this.countBuy(event));

    },
    countPlus: function (event) {
        let row = parseInt(event.target.id)
        if (this.goods.countSelected[parseInt(event.target.id)] < this.goods.allGoods[row][2]) {
            this.goods.countSelected[parseInt(event.target.id)]++
        }
        this.buyGood(row)
    },
    countMinus: function (event) {
        let row = parseInt(event.target.id)
        if (this.goods.countSelected[parseInt(event.target.id)] > 1) {
            this.goods.countSelected[parseInt(event.target.id)]--
        }
        this.buyGood(row)
    },
    countBuy: function (event) {
        let row = parseInt(event.target.id)
        if (this.goods.countSelected[row] > this.goods.allGoods[row][2]) {
            return
        }
        let newCountGoods = (this.goods.allGoods[row][2]) - (this.goods.countSelected[row])
        if (this.basket.cartGoods.length > 0) {
            for (let i = 0; i < this.basket.cartGoods.length; i++) {

                if (+this.basket.cartGoods[i][0] === +goods.allGoods[row][0]) {
                    this.basket.cartGoods[i][2] = this.basket.cartGoods[i][2] + this.goods.countSelected[row];
                    this.changeRender(newCountGoods, row)
                    return
                }
            }
        }
        let tempCart = []
        for (let i = 0; i < this.goods.allGoods[row].length; i++) {
            tempCart[i] = (this.goods.allGoods[row][i])
        }
        this.basket.cartGoods.push(tempCart)
        this.basket.cartGoods[this.basket.cartGoods.length - 1][2] = this.goods.countSelected[row]
        this.changeRender(newCountGoods, row)
    },
    changeRender: function (newCountGoods, row) {
        this.changeAllGoods(newCountGoods, row)
        this.changeBasketView();
        this.changeGoodsView(row);
    },
    changeAllGoods: function (newCountGoods, row) {
        this.goods.allGoods[row][2] = newCountGoods;
        this.goods.countSelected[row] = 1;
    },
    changeBasketView: function () {
        document.getElementById("h1").remove();
        document.getElementById("div1").remove();
        document.getElementById("btnP").remove();
        document.getElementById("btnCart").remove();
        basketSiteContent.init()
    },
    changeGoodsView: function (row) {
        document.getElementById((row) + "goods").innerHTML = this.goodsTableText(row);
        this.buyGood(row)
    }


}
goodsSiteContent.init()
basketSiteContent.init()
