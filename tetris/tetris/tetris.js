"use strict";

const BLOCK_SIZE = 30;
const SPEED = 300;
let field = [];
let interval = null;
let pause = false;

let left = document.getElementById("left");
let right = document.getElementById("right");
let rotation = document.getElementById("rotation");
let down = document.getElementById("down");
let lose = document.getElementById("lose");
let stop = document.getElementById("stop");
let restart = document.getElementById("restart");
let score = 0;
let nextShape = null;
let idScore = document.getElementById("score");

let info = document.getElementById("windowInfo");
let ctxInfo = info.getContext("2d");

let canvas = document.getElementById("mainWindow");
let ctx = canvas.getContext("2d");

canvas.width = 10 * BLOCK_SIZE;
canvas.height = 20 * BLOCK_SIZE;

for (let i = 0; i < 20; ++i) {
    let row = [];
    for (let j = 0; j < 10; ++j) {
        row.push(0);
    }
    field.push(row);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
  
class Object {
    constructor() {
        this.x = 4;
        this.y = 0;
        this.shape = [];
        this.color = null;
    }

    drawShape() {
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

    lockShape() {
        for (let y = 0; y < this.shape.length; ++y) {
            for (let x = 0; x < this.shape[y].length; ++x) {
                if (currentShape.shape[y][x]) {
                    field[currentShape.y - 1 + y][currentShape.x + x] = 1;
                }
            }   
        }
    }
}

let shapes = [];

let I = new Object();
shapes.push(I);

let J = new Object();
shapes.push(J);

let T = new Object();
shapes.push(T);

let L = new Object();
shapes.push(L);

let S = new Object();
shapes.push(S);

let Z = new Object();
shapes.push(Z);

let O = new Object();
shapes.push(O);

function defauleShapes() {
    O.shape = [[1, 1], [1, 1]];
    O.color = "purple";
    O.x = 4;
    O.y = 0;

    Z.shape = [[1, 1, 0], [0, 1, 1]];
    Z.color = "orange";
    Z.x = 4;
    Z.y = 0;

    S.shape = [[0, 1, 1], [1, 1, 0]];
    S.color = "cyan";
    S.x = 4;
    S.y = 0;

    L.shape = [[1, 1, 1], [1, 0, 0]];
    L.color = "red";
    L.x = 4;
    L.y = 0;

    T.shape = [[1, 1, 1], [0, 1, 0]];
    T.color = "white";
    T.x = 4;
    T.y = 0;

    J.shape = [[1, 1, 1], [0, 0, 1]];
    J.color = "yellow";
    J.x = 4;
    J.y = 0;

    I.shape = [[1, 1, 1, 1]];
    I.color = "green";
    I.x = 4;
    I.y = 0;
}

let currentShape = null;

function addEvents() {
    left.addEventListener("click", leftMove);
    right.addEventListener("click", rightMove);
    rotation.addEventListener("click", rotationMove);
    down.addEventListener("click", speedUp);
    document.addEventListener("keyup", buttonEvents);
    stop.addEventListener("click", stopfun);
}

function removeEvents() {
    left.removeEventListener("click", leftMove);
    right.removeEventListener("click", rightMove);
    rotation.removeEventListener("click", rotationMove);
    down.removeEventListener("click", speedUp);
    document.removeEventListener("keyup", buttonEvents);
}

function collision(newX, newY, shape) {
    for (let y = 0; y < shape.length; ++y) {
        for (let x = 0; x < shape[y].length; ++x) {
            if (shape[y][x]) {
                if (field[newY + y][newX + x]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function speedUp() {
    if (currentShape.y + (currentShape.shape.length - 1) < 19 && !collision(currentShape.x, currentShape.y + 1, currentShape.shape))
        currentShape.y++;
}

function rotationMove() {
    if (currentShape.y < (20 - currentShape.shape.length)) {
        let rotated = [];
        let shapeY = currentShape.shape.length;
        let shapeX = currentShape.shape[0].length;

        for (let x = 0; x < shapeX; ++x) {
            let arr = [];
            for (let y = shapeY - 1; y >= 0; --y) {
                arr.push(currentShape.shape[y][x]);
            }
            rotated.push(arr);
        }

        if (!collision(currentShape.x, currentShape.y, rotated))
            currentShape.shape = rotated;

        if ((currentShape.x + (currentShape.shape[0].length - 1)) > 9) {
            currentShape.x--;
        }
           
    }   
}

function leftMove() {
    if ((currentShape.x - 1) >= 0 && !collision(currentShape.x - 1, currentShape.y, currentShape.shape))
        currentShape.x--;
}

function rightMove() {
    let width = currentShape.shape[0].length;
    if ((currentShape.x + width) < 10 && !collision((currentShape.x + 1), currentShape.y, currentShape.shape))
        currentShape.x++;
}

function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    
    for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 10; x++) {
            if (field[y][x]) { 
                ctx.fillStyle = "MediumSlateBlue"; 
                ctx.fillRect(
                    x * BLOCK_SIZE, 
                    y * BLOCK_SIZE, 
                    BLOCK_SIZE - 1,     
                    BLOCK_SIZE - 1
                );
            }
        }
    }
}

function checkLose() {
    if (currentShape.y == 0 && collision(currentShape.x, currentShape.y + 1, currentShape.shape)) {
        clearInterval(interval);
        lose.style.display = "block";
    }
}

function clearWin(currentY) {
    for (let x = 0; x < 10; ++x)
        field[currentY][x] = 0;

    for (let y = currentY - 1; y > 0; --y) {
        for (let x = 0; x < 10; ++x) {
            if (field[y][x]) {
                field[y][x] = 0;
                field[y + 1][x] = 1;
            }
        }
    }
}

function checkWin() {
    let match = 0;
    for (let y = field.length - 1; y >= 0; --y) {
        for (let x = 0; x < field[y].length; ++x) {
            if (field[y][x]) ++match;
        }
        if (match == 10) {
            score += 10;
            idScore.textContent = score;
            clearWin(y);
        }
        match = 0;
    }
}

function drawFake() {
    let fakeShape = currentShape.shape;
    let xFake = currentShape.x;
    let yFake = currentShape.y;

    while (!collision(xFake, yFake, fakeShape)) {
        yFake++;
        if (yFake > (20 - fakeShape.length)) {
            break;
        }
    }

    for (let y = 0; y < fakeShape.length; ++y) {
        for (let x = 0; x < fakeShape[y].length; ++x) {
            if (fakeShape[y][x]) {
                ctx.fillStyle = "rgba(255,0,0,0.5)";
                ctx.fillRect(
                    (xFake + x) * BLOCK_SIZE,
                    ((yFake - 1) + y) * BLOCK_SIZE,  
                    BLOCK_SIZE - 1,             
                    BLOCK_SIZE - 1  
                );
            }
        }
    }
}

function getNext() {
    nextShape = shapes[getRandomInt(7)];
}

function drawNext() {
    ctxInfo.clearRect(0, 0, info.width, info.height);
    let nshape = nextShape;

    nshape.x = 2;
    nshape.y = 1;

    let block = 40;
    for (let y = 0; y < nshape.shape.length; ++y) {
        for (let x = 0; x < nshape.shape[y].length; ++x) {
            if (nshape.shape[y][x]) {
                ctxInfo.fillStyle = nshape.color;
                ctxInfo.fillRect(
                    (nshape.x + x) * block,
                    (nshape.y + y) * block,  
                    block,             
                    block
                );
            }
        }
    }
}

function draw() {
    if (pause) return;
    drawGrid();
    currentShape.drawShape();
    drawFake();
    checkWin();
    checkLose();
    currentShape.y++;
    
    if (currentShape.y > (20 - currentShape.shape.length) || collision(currentShape.x, currentShape.y, currentShape.shape)) {
            currentShape.lockShape();
            currentShape = nextShape;
            getNext();
            drawNext();
            defauleShapes();
    }
}

function buttonEvents(e) {
    switch (e.key) {
        case 's':
            speedUp();
            break;
        case 'a':
            leftMove();
            break;
        case 'd':
            rightMove();
            break;
        case 'w':
            rotationMove();
            break;
    }
}

function gameLoop() {
    defauleShapes();
    addEvents();
    restart.addEventListener("click", restartFunc);
    currentShape = shapes[getRandomInt(7)];
    getNext();
    drawNext();
    interval = setInterval(draw, SPEED);
}

function stopfun() {
    pause = !pause;
    if (pause) {
        stop.textContent = "continue";
        removeEvents();
    } else {
        stop.textContent = "STOP";
        addEvents();
    }
}

gameLoop();

function restartFunc() {
    removeEvents();
    restart.removeEventListener("click", restartFunc);
    ctx.clearRect(0, 0, canvas.width, canvas.height); 

    stop.textContent = "STOP";
    field = [];
    currentShape = null;
    score = 0;
    idScore.textContent = score;
    pause = false;
    clearInterval(interval);
    interval = null;
    lose.style.display = "none";

    for (let i = 0; i < 20; ++i) {
        let row = [];
        for (let j = 0; j < 10; ++j) {
            row.push(0);
        }
        field.push(row);
    }

    defauleShapes();
    gameLoop();
}