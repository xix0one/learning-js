"use strict";

const BLOCK_SIZE = 30;
const SPEED = 200;

let field = [];
let snake = [];
let pause = false;
let interval = null;
let score = -10;

let snakeLeft = true;
let snakeRight = false;
let snakeUp = false;
let snakeDown = false;

let canvas = document.getElementById("mainWindow");
let ctx = canvas.getContext("2d");
let stop = document.getElementById("stop");
let up = document.getElementById("up");
let left = document.getElementById("left");
let right = document.getElementById("right");
let down = document.getElementById("down");
let start = document.getElementById("start");
let idScore = document.getElementById("score");
let lose = document.getElementById("lose");

canvas.width = 10 * BLOCK_SIZE;
canvas.height = 20 * BLOCK_SIZE;

for (let y = 0; y < canvas.height / BLOCK_SIZE; ++y) {
    let arr = [];
    for (let x = 0; x < canvas.width / BLOCK_SIZE; ++x) {
        arr.push(0);
    }
    field.push(arr);
}

function drawField() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < field.length; ++y) {
        for (let x = 0; x < field[y].length; ++x) {
            if (field[y][x]) {
                ctx.fillStyle = "red";
                ctx.fillRect(
                    x * BLOCK_SIZE,
                    y * BLOCK_SIZE,  
                    BLOCK_SIZE - 1,             
                    BLOCK_SIZE - 1  
                );
            }
        }
    }

    for (let i = 0; i < snake.length; ++i) {
        ctx.fillStyle = "yellow";
        ctx.fillRect(
            snake[i].x * BLOCK_SIZE,
            snake[i].y * BLOCK_SIZE,  
            BLOCK_SIZE - 1,             
            BLOCK_SIZE - 1  
        );
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function stopMove() {
    pause = !pause;
    if (pause) {
        stop.textContent = "continue";
    } else {
        stop.textContent = "STOP";
    }
}

function defaultBool() {
    snakeLeft = false;
    snakeRight = false;
    snakeUp = false;
    snakeDown = false;
} 

function addEvents() {
    stop.addEventListener("click", stopMove);

    up.addEventListener("click", function() {
        if (pause) return;
        if (snakeUp || snakeDown) return;
        moveUp();
    });

    left.addEventListener("click", function() {
        if (pause) return;
        if (snakeLeft || snakeRight) return;
        moveLeft();
    });
    
    right.addEventListener("click", function() {
        if (pause) return;
        if (snakeRight || snakeLeft) return;
        moveRight();
    });

    down.addEventListener("click", function() {
        if (pause) return;
        if (snakeUp || snakeDown) return;
        moveDown();
    });

    document.addEventListener("keyup", buttonEvents);
}

function buttonEvents(e) {
    if (pause) return;
    switch (e.key) {
        case 'w':
            if (snakeUp || snakeDown) return;
            moveUp();
            break;
        case 'a':
            if (snakeLeft || snakeRight) return;
            moveLeft();
            break;
        case 'd':
            if (snakeLeft || snakeRight) return;
            moveRight();
            break;
        case 's':
            if (snakeUp || snakeDown) return;
            moveDown();
            break;
    }
}

function defaultSnake() {
    for (let i = 4; i < 7; ++i) {
        snake.push({y: 5, x: i});
    }
}

function moveRight() {
    if (snakeLeft) return;
    
    defaultBool();
    snakeRight = true;

    let nx = snake[0].x + 1;
    nx = nx > 9 ? 0 : nx;

    snake.unshift({y: snake[0].y, x: nx});
    snake.pop();
}

function moveLeft() {
    if (snakeRight) return;
    
    defaultBool();
    snakeLeft = true;

    let nx = snake[0].x - 1;
    nx = nx < 0 ? 9 : nx;

    snake.unshift({y: snake[0].y, x: nx});
    snake.pop();
}

function moveUp() {
    if (snakeDown) return;

    defaultBool();
    snakeUp = true;

    let ny = snake[0].y - 1;
    ny = ny < 0 ? 19 : ny;

    snake.unshift({y: ny, x: snake[0].x});
    snake.pop();
}

function moveDown() {
    if (snakeUp) return;
   
    defaultBool();
    snakeDown = true;

    let ny = snake[0].y + 1;
    ny = ny > 19 ? 0 : ny;

    snake.unshift({y: ny, x: snake[0].x});
    snake.pop();
}

function getEat() {
    let x = getRandomInt(10);
    let y = getRandomInt(20);

    let f = true;

    while (f) {
        f = false;
        x = getRandomInt(10);
        y = getRandomInt(20);

        for (let i = 0; i < snake.length; ++i) {
            if (snake[i].x == x && snake[i].y == y) {
                f = true;
                break;
            }
        }
    } 
    
    field[y][x] = 1;
    score += 10;
    idScore.textContent = score;
}

function checkEat() {
    let head = snake[0];

    if (field[head.y][head.x]) {
        snake.unshift({y: head.y, x: head.x});
        field[head.y][head.x] = 0;
        getEat();
    }

    if (snakeLeft) {
        let nx = head.x - 1 < 0 ? 9 : head.x - 1;
        if (field[head.y][nx]) {
            snake.unshift({y: head.y, x: head.x});
            field[head.y][nx] = 0;
            getEat();
        }
    }

    if (snakeRight) {
        let nx = head.x + 1 > 9 ? 0 : head.x + 1;
        if (field[head.y][nx]) {
            snake.unshift({y: head.y, x: head.x});
            field[head.y][nx] = 0;
            getEat();
        } 
    }

    if (snakeDown) {
        let ny = head.y + 1 > 19 ? 0 : head.y + 1;
        if (field[ny][head.x]) {
            snake.unshift({y: head.y, x: head.x});
            field[ny][head.x] = 0;
            getEat();
        }
    }

    if (snakeUp) {
        let ny = head.y - 1 < 0 ? 19 : head.y - 1;
        if (field[ny][head.x]) {
            snake.unshift({y: head.y, x: head.x});
            field[ny][head.x] = 0;
            getEat();
        }
    }   
}

function checkCollision() {
    let head = snake[0];
    for (let i = 1; i < snake.length; ++i) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            clearInterval(interval);
            lose.style.display = "block";
            stop.removeEventListener("click", stopMove);
        }
    }
}

function loop() {
    if (pause) return;

    checkEat();

    if (snakeLeft) moveLeft();
    if (snakeUp) moveUp();
    if (snakeRight) moveRight();
    if (snakeDown) moveDown();

    drawField();
    checkCollision();

    idScore.textContent = score;
}

function startGame() {
    addEvents();
    defaultSnake();
    getEat();
    drawField();
    start.removeEventListener("click", startGame);
    start.textContent = "RESTART";
    start.addEventListener("click", restartGame);
    interval = setInterval(loop, SPEED);
}

start.addEventListener("click", startGame);

function restartGame() {
    clearInterval(interval);

    interval = null;
    pause = false;
    snake = [];
    field = [];
    score = -10;
    defaultBool();
    snakeLeft = true;

    for (let y = 0; y < canvas.height / BLOCK_SIZE; ++y) {
        let arr = [];
        for (let x = 0; x < canvas.width / BLOCK_SIZE; ++x) {
            arr.push(0);
        }
        field.push(arr);
    }
    
    stop.textContent = "STOP";
    idScore.textContent = 0;
    lose.style.display = "none";

    startGame();
}