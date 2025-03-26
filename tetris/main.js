"use strict";

let mainWindow = document.getElementById("mainWindow");
let arrayTetris = [];
let arrayObjects = ["I", "J", "L", "O", "S", "T", "Z"];

for (let i = 0; i < 20; ++i) {
    let epmtyArray = [];

    for (let j = 0; j < 10; ++j) {
        epmtyArray.push(i + " " + j);
    }

    arrayTetris.push(epmtyArray);
}

function rendering() {
    for (let i = 0; i < 12; ++i) {
        let div = document.createElement("div");
        div.className = "color";
        mainWindow.append(div);
    }

    for (let i = 0; i < 20; ++i) {
        for (let j = -1; j < 11; ++j) {
            let div = document.createElement("div");

            if (j === -1 || j === 10) 
                div.className = "color";
            else
                div.setAttribute("coord", i + " " + j);

            mainWindow.append(div);
        }
    }
    
    for (let i = 0; i < 12; ++i) {
        let div = document.createElement("div");
        div.className = "color";
        mainWindow.append(div);
    }
}
rendering();

function getRandomInt() {
    return Math.floor(Math.random() * arrayObjects.length);
}

function start() {
    // let n = getRandomInt();
    // console.log(arrayObjects[2]);
}

start();


// tests

let x = 0;
let y = 0;
let counter = 12;

setInterval(function() {
    let coord = mainWindow.children[counter].getAttribute("coord");
    console.log(coord);
    if (coord) {
        mainWindow.children[counter].className = "block";
        console.log(coord);
    }
    counter += 1;
}, 1000);
