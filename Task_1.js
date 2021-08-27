'use strict';
/*Создать функцию, генерирующую шахматную доску. При этом можно использовать любые html-теги по своему
желанию. Доска должна быть разлинована соответствующим образом, т.е. чередовать черные и белые ячейки.
Строки должны нумероваться числами от 1 до 8, столбцы – латинскими буквами A, B, C, D, E, F, G, H.
(использовать createElement / appendChild)*/

const chessSettings = {

    rowCount: 8,
    colCount: 8,
    blackCellColor: '#000000',
    whiteCellColor: '#c0c0c0',
}

const chessRender = {
    chessSettings,
    containerElement: null,
    cellElements: [],
    run() {
        this.init();
        this.initCells();
        this.arrayAH();
    },
    init() {
        var table = document.createElement("table");
        table.className = "chess";
        document.body.append(table);
        table.setAttribute("id", "chess");
        this.containerElement = document.getElementById('chess');
    },
    initCells() {
        for (let row = 0; row < this.chessSettings.rowCount; row++) {
            const trElem = document.createElement('tr');
            this.containerElement.appendChild(trElem);

            for (let col = 0; col < this.chessSettings.colCount + 1; col++) {
                const cell = document.createElement('td');
                if (col === 0) {
                    cell.innerHTML = '' + (row + 1) + '';
                    cell.setAttribute('align', 'center');
                }
                trElem.appendChild(cell);

                this.cellElements.push(cell);
                if (col === 0) {

                }
                if (col > 0 && (row + 1) % 2 === 0) {
                    if ((col + 1) % 2 === 0) {
                        this.render(col + 1, row + 1, "white")
                    } else {
                        this.render(col + 1, row + 1, 'black')
                    }
                } else if (col > 0) {
                    if ((col + 1) % 2 === 0) {
                        this.render(col + 1, row + 1, "black")
                    } else {
                        this.render(col + 1, row + 1, 'white')
                    }
                }
            }
        }
    },
    render(xCol, yRow, color) {
        const playerCell = document
            .querySelector(`tr:nth-child(${yRow})`)
            .querySelector(`td:nth-child(${xCol})`);
        if (color === 'white') {
            playerCell.style.backgroundColor = this.chessSettings.whiteCellColor
        } else {
            playerCell.style.backgroundColor = this.chessSettings.blackCellColor
        }

    },
    genCharArray(charA, charZ) {
        let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
        for (; i <= j; ++i) {
            a.push(String.fromCharCode(i));
        }
        return a;
    },
    arrayAH() {
        let arrayAH = this.genCharArray('A', 'H')
        const elemAH = document.createElement('tr');
        elemAH.setAttribute("id", "A-H");
        this.containerElement.appendChild(elemAH);
        for (let col = 0; col < this.chessSettings.colCount + 1; col++) {
            const cell = document.createElement('td');
            if (col > 0) {
                cell.innerHTML = '' + (arrayAH[col - 1]) + '';
                cell.setAttribute('align', 'center');
            }
            elemAH.appendChild(cell);
        }
    }


}
chessRender.run()
