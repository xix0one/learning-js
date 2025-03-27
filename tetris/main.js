"use strict";

let mainWindow = document.getElementById("mainWindow");
let arrayObjects = ["I", "J", "L", "O", "S", "T", "Z"];

let left = document.getElementById("left");
let right = document.getElementById("right");
let trnLeft = document.getElementById("trnLeft");
let trnRight = document.getElementById("trnRight");

let isPaused = false;

function resumeInterval() {
    isPaused = false;
}

function pauseInterval() {
    isPaused = true;
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

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function renderingJ() {
    
}

function renderingI() {
    let coord = getRandomInt(10) + 13;
    let cell = 0;
    let clearCell = coord;
    let horizontal = false;

    trnLeft.addEventListener("click", function() {
        pauseInterval();
        turnLeft();
        resumeInterval();
    });
    
    left.addEventListener("click", function() {
        pauseInterval();
        moveLeft();
        resumeInterval();
    });
    
    right.addEventListener("click", function() {
        pauseInterval();
        moveRight();
        resumeInterval();
    });

    function turnLeft() {
        horizontal = !horizontal;
        if (!mainWindow.children[coord].getAttribute("immovable")) {
            let firstBlock = coord - 12;
            for (let i = 12 * 4; i >= 0; i -= 12) {
                if (mainWindow.children[coord - i] && mainWindow.children[coord - i].className !== "color") {
                    mainWindow.children[coord - i].className = ""; // clear
                }
            }

            for (let i = 0; i < 4; ++i) {
                if (mainWindow.children[firstBlock - i].className !== "color")
                    mainWindow.children[firstBlock - i].className = "block";
                else {
                    // rendering another elem
                }
            }
        }
    }

    function moveRight() {
        if (!mainWindow.children[coord].getAttribute("immovable")) {
            if (mainWindow.children[coord + 1].getAttribute("coord")) {
                coord += 1;
                clearCell += 1;
                for (let i = mainWindow.children.length - 1; i >= 0; --i) {
                    if (mainWindow.children[i].className == "block") {
                        mainWindow.children[i].className = "";
                        mainWindow.children[i + 1].className = "block";
                    }
                }
            }
        }
    }

    function moveLeft() {
        if (mainWindow.children[coord - 1].getAttribute("coord")) {
            coord -= 1;
            clearCell -= 1;
            for (let i = 0; i < mainWindow.children.length; ++i) {
                if (mainWindow.children[i].className == "block") {
                    mainWindow.children[i].className = "";
                    mainWindow.children[i - 1].className = "block";
                }
            }
        }
    }
    
    let i = setInterval(function() {
        if (isPaused) return;

        if (horizontal) {

        }
        else {
            mainWindow.children[coord].className = "block";
            coord += 12;
            cell += 1;

            if (cell === 5) {
                mainWindow.children[clearCell].className = "";
                cell = 4;
                clearCell += 12;
            }
        }

        if (! (mainWindow.children[coord].getAttribute("coord"))) {
            for (let i = 0; i < mainWindow.children.length; ++i) {
                if (mainWindow.children[i].className == "block")
                    mainWindow.children[i].setAttribute("immovable", "true");
            }
            clearInterval(i);
        }            
            
    }, 200);
}

function renderingObject(obj) {
    if (obj === 0)
        renderingI();
    if (obj === 1)
        renderingJ();
}

function start() {
    rendering();
    let n = getRandomInt(arrayObjects.length);
    renderingObject(0);
}

start();