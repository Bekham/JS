/*
1. Выводить счёт в режиме реального времени.
2. Генерировать временные препятствия на поле.
3. *Убрать границы поля. Т.е. при пересечении границы поля змейка появляется с противоположной стороны.
*/
"use strict";
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
    blockCount: 20, // Количество начальных препятствий
    addNewBlockInterval: 2, //Добавление одного препятствия через заданный интервал количества съеденной еды
    autoAddBlock: true, // Включение/отключение добавления новых препятствий в процессе игры
};

const config = {
    settings,

    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    getRowsCount() {
        return this.settings.rowsCount;
    },

    getColsCount() {
        return this.settings.colsCount;
    },

    getSpeed() {
        return this.settings.speed;
    },

    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    getBlockCount() {   // Добавлено
      return this.settings.blockCount;
    },

    addBlockInterval() {   // Добавлено
        if (this.settings.autoAddBlock) {
            return this.settings.addNewBlockInterval;
        }
        else {return this.settings.winFoodCount;}

    },

    validate() {
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.getRowsCount() < 10 || this.getRowsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getColsCount() < 10 || this.getColsCount() > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.getSpeed() < 1 || this.getSpeed() > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.getWinFoodCount() < 2 || this.getWinFoodCount() > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};

const map = {
    cells: {},
    usedCells: [],

    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = '';

        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                const cellKey = `x${col}_y${row}`;
                this.cells[cellKey] = td;

                tr.appendChild(td);
            }
        }
    },

    render(snakePointsArray, foodPoint, blockPointsArray) {
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        this.usedCells = [];

        snakePointsArray.forEach((point, index) => {
            const cellKey = `x${point.x}_y${point.y}`;
            const snakeCell = this.cells[cellKey];

            snakeCell.classList.add(index === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCellKey = `x${foodPoint.x}_y${foodPoint.y}`;
        const foodCell = this.cells[foodCellKey];

        foodCell.classList.add('food');

        this.usedCells.push(foodCell);

        blockPointsArray.forEach((point) => {   // Добавлено
            const blockKey = `x${point.x}_y${point.y}`;
            const blockCell = this.cells[blockKey];

            blockCell.classList.add('blockBody');
            this.usedCells.push(blockCell);
        });
    },
};

const food = {
    x: null,
    y: null,

    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        };
    },

    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};
const block = {   // Добавлено
    blockPointCoordinates: [],

    getCoordinates() {
        return this.blockPointCoordinates

    },

    setCoordinates(point) {
        this.blockPointCoordinates.push({x: point.x, y: point.y});
    },

    isOnPoint(point) {
        return this.getCoordinates().some(blockPoint => {
            return blockPoint.x === point.x && blockPoint.y === point.y;
        });
    },
    clearBlockArray(){
        this.blockPointCoordinates = [];
    }
};
const snake = {
    body: [],
    direction: null,
    lastStepDirection: null,
    config,

    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    getBody() {
        return this.body;
    },

    getLastStepDirection() {
        return this.lastStepDirection;
    },

    setDirection(direction) {
        this.direction = direction;
    },

    isOnPoint(point) {
        return this.getBody().some(snakePoint => {
            return snakePoint.x === point.x && snakePoint.y === point.y;
        });
    },

    makeStep() {
        this.lastStepDirection = this.direction;
        this.getBody().unshift(this.getNextHeadPoint());
        this.getBody().pop();
    },

    growUp() {
        const lastBodyIndex = this.getBody().length - 1;
        const lastBodyPoint = this.getBody()[lastBodyIndex];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);

        this.getBody().push(lastBodyPointClone);
    },

    getNextHeadPoint() {
        const firstPoint = this.getBody()[0];
        let rowsCount = this.config.getRowsCount();
        let colsCount = this.config.getColsCount();
        switch (this.direction) {
            case 'up':
                if (firstPoint.y === 0) {   // Добавлено
                    return {x: firstPoint.x, y: rowsCount - 1};
                }
                return {x: firstPoint.x, y: firstPoint.y - 1};
            case 'right':
                if (firstPoint.x === colsCount - 1) {   // Добавлено
                    return {x: 0, y: firstPoint.y};
                }
                return {x: firstPoint.x + 1, y: firstPoint.y};
            case 'down':
                if (firstPoint.y === rowsCount - 1) {   // Добавлено
                    return {x: firstPoint.x, y: 0};
                }
                return {x: firstPoint.x, y: firstPoint.y + 1};
            case 'left':
                if (firstPoint.x === 0) {   // Добавлено
                    return {x: colsCount - 1, y: firstPoint.y};
                }
                return {x: firstPoint.x - 1, y: firstPoint.y};
        }
    },
};

const status = {
    condition: null,

    setPlaying() {
        this.condition = 'playing';
    },

    setStopped() {
        this.condition = 'stopped';
    },

    setFinished() {
        this.condition = 'finished';
    },

    isPlaying() {
        return this.condition === 'playing';
    },

    isStopped() {
        return this.condition === 'stopped';
    },
};

const game = {
    config,
    map,
    snake,
    food,
    block,
    status,
    tickInterval: null,
    goals: 0,
    addNewBlocksInterval: 0,

    init(userSettings = {}) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();
        this.checkGame();   // Добавлено
        this.reset();

    },

    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => {
            this.playClickHandler();
        });
        document.getElementById('newGameButton').addEventListener('click', () => {
            this.newGameClickHandler();
        });
        document.addEventListener('keydown', event => {
            this.keyDownHandler(event);
        })
    },

    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.getBlockCounts()   // Добавлено
        this.render();
        this.resetGoals();   // Добавлено
    },

    resetGoals(){   // Добавлено
        this.goals = 0;
        document.getElementById('goalsCount').innerHTML= `Счет: ${this.goals}`;
    },
    render() {
        this.map.render(this.snake.body, this.food.getCoordinates(), this.block.blockPointCoordinates);
    },

    getBlockCounts(){   // Добавлено
        this.addNewBlocksInterval = this.config.addBlockInterval()
        this.block.clearBlockArray();
        for (let i = 0; i < this.config.getBlockCount(); i++) {
            this.block.setCoordinates(this.getRandomFreeCoordinates());
       }
    },

    getStartSnakeBody() {
        return [
            {
                x: Math.floor(this.config.getColsCount() / 2),
                y: Math.floor(this.config.getRowsCount() / 2),
            },
        ];
    },

    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody(), ...this.block.getCoordinates()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some(exPoint => rndPoint.x === exPoint.x && rndPoint.y === exPoint.y)) return rndPoint;
        }
    },

    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) return;

        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) this.snake.setDirection(direction);
    },

    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
        }
    },

    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => this.tickHandler(), 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');

    },

    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра завершена', true);
    },

    setPlayButton(text, isDisabled = false) {
        const playButton = document.getElementById('playButton');

        playButton.textContent = text;

        isDisabled
            ? playButton.classList.add('disabled')
            : playButton.classList.remove('disabled');
    },

    tickHandler() {
        if (!this.canMakeStep()) return this.finish();
        this.addNewBlock();   // Добавлено

        if (this.food.isOnPoint(this.snake.getNextHeadPoint())) {
            this.snake.growUp();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            this.goalsCounter();   // Добавлено
            if (this.isGameWon()) this.finish();
        }

        this.snake.makeStep();
        this.render();
    },

    addNewBlock(){   // Добавлено

        if (this.addNewBlocksInterval - this.goals === 0) {
            this.addNewBlocksInterval = this.addNewBlocksInterval + this.config.addBlockInterval();
            this.block.setCoordinates(this.getRandomFreeCoordinates());
        }
    },

    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    canMakeStep() {
        const nextHeadPoint = this.snake.getNextHeadPoint();

        return !this.snake.isOnPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0 &&
            !this.block.isOnPoint(nextHeadPoint);
    },
    checkGame(){   // Добавлено
        let checkGoals = document.getElementById("goals");
        let h3 = document.createElement("h3");
        h3.setAttribute("id", "goalsCount");
        h3.innerHTML = `Счет: ${this.goals}`;
        checkGoals.appendChild(h3);
    },
    goalsCounter(){   // Добавлено
        ++this.goals
        if (this.goals === this.config.getWinFoodCount()){
            document.getElementById('goalsCount').innerHTML=
                `Счет: ${this.goals}. <br> Вы победили! Поздравляем!!!`;
            return
        }
        document.getElementById('goalsCount').innerHTML= `Счет: ${this.goals}`;
    },

};

game.init({speed: 3});
