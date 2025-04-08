"use strict;"

const BLOCK_SIZE = 30;
const SPEED = 70;

let canvas = document.getElementById("mainWindow");
let ctx = canvas.getContext("2d");
let left = document.getElementById("left");
let right = document.getElementById("right");
let stop = document.getElementById("stop");
let start = document.getElementById("restart");
let idLife = document.getElementById("life");
let lose = document.getElementById("lose");
let idScore = document.getElementById("score");

canvas.width = 10 * BLOCK_SIZE;
canvas.height = 15 * BLOCK_SIZE;

let pause = false;
let enemies = [];
let interval = null;
let life = 3;
let score = 0;

class Car {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 35;
        this.shape = [[1], [1], [1]];
        this.color = null;
    }

    draw() {
        for (let y = 0; y < this.shape.length; ++y) {
            for (let x = 0; x < this.shape[y].length; ++x) {
                if (this.shape[y][x]) {
                    ctx.fillStyle = this.color;
                    ctx.fillRect(
                        (this.x + x) * BLOCK_SIZE,
                        (this.y + y) * BLOCK_SIZE,  
                        BLOCK_SIZE - 1,             
                        BLOCK_SIZE - 1  
                    );
                }
            }
        }
    }
}

function addEvents() {
    left.addEventListener("click", moveLeft);
    right.addEventListener("click", moveRight);
    stop.addEventListener("click", stopMove);
    document.addEventListener("keyup", buttonEvents);
}

function removeEvents() {
    left.removeEventListener("click", moveLeft);
    right.removeEventListener("click", moveRight);
    stop.removeEventListener("click", stopMove);
    document.removeEventListener("keyup", buttonEvents);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let mainCar = new Car();
mainCar.color = "yellow";
mainCar.x = 4;
mainCar.y = (canvas.height / BLOCK_SIZE) - 3;

function getCarX() {
    let getR = getRandomInt(10);
    let f = true;

    while (f) {
        f = false;
        for (let j = 0; j < enemies.length; ++j) {
            if (enemies[j].x == getR) {
                getR = getRandomInt(10);
                f = true;
                break;
            }
        }
    }

    return getR;
}

function addEnemies() {
    for (let i = 0; i < 5; ++i) {
        let enemyCar = new Car();
        enemyCar.color = "red";
        enemyCar.y = -2;
        enemyCar.x = getCarX();
        enemies.push(enemyCar);
    }
}
addEnemies();

function stopMove() {
    if (pause) {
        stop.textContent = "STOP";
    } else
        stop.textContent = "continue";
    pause = !pause;
}

function moveLeft() {
    if (pause) return;
    if (mainCar.x > 0) {
        mainCar.x--;
    }
}

function moveRight() {
    if (pause) return;
    if (mainCar.x < ((canvas.width / 30) - 1)) {
        mainCar.x++;
    }
}

function buttonEvents(e) {
    if (pause) return;
    switch (e.key) {
        case 'a':
            moveLeft();
            break;
        case 'd':
            moveRight();
            break;

    }
}

function checkLose() {
    if (life == 0) {
        lose.style.display = "block";
        idLife.textContent = 0;
        clearInterval(interval);
        removeEvents();
    }
}

let touch = false;
function checkCollision() {
    for (let i = 0; i < enemies.length; ++i) {
        for (j = 11; j < 15; ++j) {
            if (enemies[i].y == j && enemies[i].x == mainCar.x) {
                if (!touch) {
                    life--;
                    checkLose();
                    touch = true;
                    break;
                }
            }
        }   
    }
}

function enemyMove() {
    for (let i = 0; i < enemies.length; ++i) {
        enemies[i].y++;
        if ((enemies[i].y * BLOCK_SIZE) >= canvas.height) {
            enemies[i].y = -2;
            enemies[i].x = getCarX();
            touch = false;
            score++;
            idScore.textContent = score;
        }
    }
    checkCollision();
}

function loop() {
    if (pause) return;

    idLife.textContent = life;

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    mainCar.draw();

    for (let i = 0; i < enemies.length; ++i)
        enemies[i].draw();

    enemyMove();
}

function startPlay() {
    interval = setInterval(loop, SPEED);
    start.textContent = "RESTART";
    start.removeEventListener("click", startPlay);
    start.addEventListener("click", restartPlay);
    addEvents();
}

start.addEventListener("click", startPlay);

function restartPlay() {
    clearInterval(interval);

    score = 0;
    pause = false;
    life = 3;
    touch = false;
    enemies = [];

    stop.textContent = "STOP";
    lose.style.display = "none";
    idScore.textContent = score;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addEvents();
    addEnemies();
    interval = setInterval(loop, SPEED); 
}