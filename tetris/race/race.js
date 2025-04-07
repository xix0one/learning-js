"use strict;"

let canvas = document.getElementById("mainWindow");
let ctx = canvas.getContext("2d");
let left = document.getElementById("left");
let right = document.getElementById("right");

let life = 3;

class Car {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 35;
        this.color = null;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function addEvents() {
    left.addEventListener("click", moveLeft);
    right.addEventListener("click", moveRight);
    document.addEventListener("keyup", buttonEvents);
}

let mainCar = new Car();
mainCar.color = "yellow";
mainCar.y = canvas.height - mainCar.height;

let enemyCar = new Car();
enemyCar.color = "red";
enemyCar.y = 0;

function moveLeft() {
    if (mainCar.x > 0) {
        mainCar.x -= 20;
    }
}

function moveRight() {
    if (mainCar.x < (canvas.width - mainCar.width)) {
        mainCar.x += 20;
    }
}

addEvents();

function buttonEvents(e) {
    switch (e.key) {
        case 'a':
            moveLeft();
            break;
        case 'd':
            moveRight();
            break;

    }
}

function enemyMove() {
    enemyCar.y += 1.5;
    if (enemyCar.y == canvas.height) {
        enemyCar.y = 0;
    }
}

function checkCollision() {
    if (enemyCar.x == mainCar.x && enemyCar.y ) {
        console.log(1);
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    mainCar.draw();
    enemyCar.draw();
    enemyMove();
    checkCollision();
    window.requestAnimationFrame(loop);
}

loop();