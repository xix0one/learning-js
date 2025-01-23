"use strict";

const rules = document.getElementsByClassName("buttonRules")[0];
const close = document.getElementById("close");

let score = document.getElementById("score");
let wins = 0;

let main = document.querySelector("main");
let section = document.getElementsByClassName("section")[0];
let items = section.querySelectorAll("div");
let gameText = document.createElement("p");

let gameField = document.createElement("div");
gameField.className = "gameField";

let buttonEndGame = document.createElement("button");
buttonEndGame.textContent = "PLAY AGAIN";

let youPicked = document.createElement("p");
youPicked.textContent = "YOU PICKED";

let housePicked = document.createElement("p");
housePicked.textContent = "THE HOUSE PICKED";

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
    startGame(event.currentTarget.cloneNode(true));
}

function rndItem() {
    return items[Math.floor(Math.random() * 3)];
}

function endGame(user, comp, rnd) {
    let div = document.createElement("div");
    div.className = "endGame";
    div.appendChild(gameText);
    div.appendChild(buttonEndGame);

    if (window.innerWidth > 650) {
        gameField.style.gridTemplateColumns = "repeat(3, 1fr)";
        rnd.style.gridColumnStart = 3;
        housePicked.style.gridColumnStart = 3;
    }
    gameField.appendChild(div);

    buttonEndGame.addEventListener("mousedown", function() {
        user.remove();
        comp.remove();
        div.remove();
        housePicked.style.gridColumnStart = 2;
        gameText.textContent = "";
        buttonEndGame.remove();
        gameField.remove();
        gameField.style.gridTemplateColumns = "repeat(2, 1fr)";
        section.style.display = "grid";
    });    
}

function checkWin(userDiv, compDiv, rnd) {
    let user = userDiv.className;
    let comp = compDiv.className;
    
    if (user === comp) {
        gameText.textContent = "DRAW";
        userDiv.setAttribute("class", user + " winner");
        compDiv.setAttribute("class", comp + " winner");
    }
    else if ((user === "rock" && comp === "scissors") ||
            (user === "scissors" && comp === "paper") ||
            (user === "paper" && comp === "rock")) {
            userDiv.setAttribute("class", user + " winner");
            gameText.textContent = "YOU WIN";
            ++wins;
    } else {
        compDiv.setAttribute("class", comp + " winner");
        wins = wins == 0 ? 0 : --wins;
        gameText.textContent = "YOU LOSE";
    }
    endGame(userDiv, compDiv, rnd);
}

function addElem(div) {
    div.style.gridColumnStart = 1;
    div.style.gridColumnEnd = 2;

    let comp = rndItem().cloneNode(true);

    let emptyDiv = document.createElement("div");
    emptyDiv.className = "emptyDiv";

    if (window.innerWidth > 650) {
        emptyDiv.style.gridColumnStart = 2;
        emptyDiv.style.gridColumnEnd = 3;
    }

    gameField.appendChild(youPicked);
    gameField.appendChild(housePicked);
    gameField.appendChild(div);
    gameField.appendChild(emptyDiv);

    main.prepend(gameField);

    setTimeout(() => {
        emptyDiv.remove();
        comp.style.gridColumnStart = 2;
        gameField.appendChild(comp);
        setTimeout(() => {
            checkWin(div, comp, comp);
            score.textContent = wins;
        }, 200);
    }, 500);
}

function startGame(div) {
    div.removeEventListener("click", click);
    section.style.display = "none";
    addElem(div);
}