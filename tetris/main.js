"use strict";

let left = document.getElementById("left");
let right = document.getElementById("right");
let rotation = document.getElementById("rotation");

let canvas = document.getElementById("mainWindow");
let ctx = canvas.getContext("2d");

let I = {
    x: 0,
    y: 0,
    width: 40,
    height: 20,
    color: "green",
    draw: function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    I.draw();
    I.y += 1;
    if (I.y == (canvas.height - 100)) {
        console.log(I.y, canvas.height - 100);
        I.y = I.y;
    }
    window.requestAnimationFrame(draw);
}

draw();