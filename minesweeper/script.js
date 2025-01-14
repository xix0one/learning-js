"use strict";

const div = document.createElement("div");
div.style.display = "grid";
div.style.gridTemplateColumns = "repeat(5, 1fr)";
div.style.width = 100 + "px";
div.style.border = "2px solid blue";

let countPara = document.createElement("p"), 
    count = 7;
countPara.textContent = "bombs: " + count;

let newGameButton = document.createElement("button");
newGameButton.textContent = "New game";
newGameButton.id = "new-game-button";

function drawField() {
    for (let i = 0; i < 5; ++i) {
        for (let j = 0; j < 5; ++j) {
            let but = document.createElement("button");
            but.style.height = 20 + "px";
            but.style.width = 20 + "px";
            but.setAttribute("coords", i + "" + j);
            div.appendChild(but);
        }
    }
}

let coords = { };
function checkBombs(coord) {
    return coord in coords;
}

function bombs() {
    for (let i = 0; i < 7; ++i) {
        let x, y;
        while (1) {
            x = Math.floor(Math.random() * 5);
            y = Math.floor(Math.random() * 5);
            let key = x + "" + y;
            if (!(checkBombs(key))) {
                coords[x + "" + y] = true;
                break;
            }
        }
    }
}

function countBombs(coordOne, coordTwo) {
    let bomb = 0;
    for (let i = coordOne - 1; i < coordOne + 2; ++i) {
        for (let j = coordTwo - 1; j < coordTwo + 2; ++j) {
            if (checkBombs(i + "" + j))
                ++bomb;
        }
    }
    return bomb;
}

function openCell(event, cell) {
    event.target.style.background = "hsl(264, 2%, 40%)";
    event.target.style.color = "white";
    event.target.textContent = countBombs(Number(cell[0]), Number(cell[1]));
}

function openAnotherCell() {
    let count = Math.floor(Math.random() * 3);
    for (let i = 0; i <= count; ++i) {
        while (1) {
            let x = Math.floor(Math.random() * 5);
            let y = Math.floor(Math.random() * 5);
            let coord = x + "" + y;
            if (!(checkBombs(coord))) {
                let but = document.querySelector('[coords="' + coord + '"]');
                if (!(but.style.background == "green")) {
                    but.style.background = "hsl(264, 2%, 40%)"; 
                    but.style.color = "white";
                    but.textContent = countBombs(x, y);
                    but.setAttribute("disabled", "");
                    break;
                }
            }
        }
    }
}

function stopPlay() {
    let buttons = document.querySelectorAll("button")
    for (let i = 0; i < buttons.length; ++i) {
        if (!buttons[i].id)
            buttons[i].setAttribute("disabled", "");
    }
}

let match = { };
let sum = 0;
function checkWin(coord) {
    if (checkBombs(coord)) ++sum;
    if (sum == 7 && count == 0) {
        countPara.textContent = "WIN!";
        stopPlay();
    }
}

function markCell(event) {
    let coord = event.target.getAttribute("coords");
    if (event.target.style.background == "green") {
        event.target.style.background = "";
        ++count;
        countPara.textContent = "bombs: " + count;
        if (checkBombs(coord)) {
            sum -= sum == 0 ? 0 : 1;  
        }
        delete match[coord];
    } else {
        event.target.style.background = "green";
        --count;
        countPara.textContent = "bombs: " + count;
        if (checkBombs(coord)) {
            match[coord] = true;
            checkWin(coord);
        } else match[coord] = false;
    }
}

function removeEl() {
    let buttons = document.querySelectorAll("button")
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].remove();
    }
    div.remove();
    countPara.remove();
}

document.addEventListener("contextmenu", event => event.preventDefault());

document.body.addEventListener("mousedown", function(event) {
    if (event.target.nodeName == "BUTTON") {
        let cell = event.target.getAttribute("coords");
        if (cell) {
            if (event.which == 1) {
                if (checkBombs(cell)) {
                    countPara.textContent = "BOOM!";
                    event.target.style.background = "hsl(356, 100%, 50%)";
                    stopPlay();
                }
                else {
                    event.target.setAttribute("disabled", "");
                    openCell(event, cell);
                    openAnotherCell();
                }
            } else if (event.which == 3) {
                markCell(event);
            }
        } else {
            removeEl();
            newGame();
        }
    }
});

function newGame() {
    document.body.appendChild(div);
    document.body.appendChild(newGameButton);
    coords = { };
    match = { };
    drawField();
    bombs();
    count = 7;
    countPara.textContent = "bombs: " + count;
    sum = 0;
    document.body.appendChild(countPara);
}

newGame();