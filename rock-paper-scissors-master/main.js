"use strict";

const rules = document.querySelector("button");
const close = document.getElementById("close");

let score = document.getElementById("score");
let main = document.querySelector("main");
let section = document.getElementsByClassName("section")[0];
let items = section.querySelectorAll("div");

rules.addEventListener("mousedown", function() {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";

    close.addEventListener("mousedown", function() {
        modal.style.display = "none";
    });
});

for (let i = 0; i < items.length; ++i) {
    items[i].addEventListener("click", click);
}

function click(event) {
    startGame(event.currentTarget);
}

function addElem(div) {
    let gameField = document.createElement("div");
    gameField.className = "gameField";
    
    let youPicked = document.createElement("p");
    youPicked.textContent = "YOU PICKED";
    let housePicked = document.createElement("p");
    housePicked.textContent = "THE HOUSE PICKED";

    gameField.appendChild(youPicked);
    gameField.appendChild(housePicked);
    gameField.appendChild(div);

    main.prepend(gameField);
}

function startGame(div) {
    div.removeEventListener("click", click);
    section.remove();
    addElem(div);
}