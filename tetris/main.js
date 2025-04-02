"use strict";

const BLOCK_SIZE = 30;

let left = document.getElementById("left");
let right = document.getElementById("right");
let rotation = document.getElementById("rotation");

let canvas = document.getElementById("mainWindow");
let ctx = canvas.getContext("2d");

canvas.width = 10 * BLOCK_SIZE;
canvas.height = 20 * BLOCK_SIZE;

let field = [];

let interval = null;

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
I.shape = [[1, 1, 1, 1]];
I.color = "green";
shapes.push(I);

let J = new Object();
J.shape = [[1, 1, 1], 
           [0, 0, 1]];
J.color = "yellow";
shapes.push(J);

let T = new Object();
T.shape = [[1, 1, 1],
           [0, 1, 0]];
T.color = "white";
shapes.push(T);

let L = new Object();
L.shape = [[1, 1, 1],
           [1, 0, 0]];
L.color = "red";
shapes.push(L);

let S = new Object();
S.shape = [[0, 1, 1],
           [1, 1, 0]];
S.color = "cyan";
shapes.push(S);

let Z = new Object();
Z.shape = [[1, 1, 0],
           [0, 1, 1]];
Z.color = "orange";
shapes.push(Z);

let O = new Object();
O.shape = [[1, 1],
           [1, 1]];
O.color = "purple";
shapes.push(O);

let currentShape = null;

left.addEventListener("click", leftMove);
right.addEventListener("click", rightMove);
rotation.addEventListener("click", rotationMove);

function rotationMove() {
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

    currentShape.shape = rotated;
}

function leftMove() {
    if ((currentShape.x - 1) >= 0) 
        currentShape.x--;
}

function rightMove() {
    let width = currentShape.shape[0].length;
    if ((currentShape.x + width) < 10)
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

let count = 0; // for tests

function draw() {

    drawGrid();
    currentShape.drawShape();
    currentShape.y++;

    if (currentShape.y > (20 - currentShape.shape.length)) {
            count++;

            console.log(field);
            currentShape.lockShape();
            drawGrid();

            // clearInterval(interval);

            currentShape = shapes[getRandomInt(7)];
            currentShape.y = 0;
            currentShape.x = 4;

            if (count == 2)
                clearInterval(interval);
            console.log(count);
    }
}

function gameLoop() {
    currentShape = shapes[getRandomInt(7)];
    interval = setInterval(draw, 100);
}

gameLoop();