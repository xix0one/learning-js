"use strict";

let playButton = document.getElementById("play");
let beginWindow = document.getElementById("beginWindow");
let gameSection = document.getElementById("game");
let words = document.getElementById("word");
let alphabet = document.getElementById("alphabet");
let clear = document.getElementById("clear");
let progressBarColor = document.getElementById("progressBarColor");
let winWord = document.getElementById("winWord");
let exitModal = document.getElementsByClassName("exitButton")[0];

const modalBackground = document.getElementsByClassName("modalBackground")[0];
const modalActive = document.getElementsByClassName("modalActive")[0];
let modalClose = document.getElementsByClassName("nextButton")[0];

let progressBarColorWidth = 20;

let countries = ["RUSSIA", "CHINA", "INDIA", "INDONESIA", "BRAZIL"];
let countryChoosed = "";

function rndEmptyLetters(word) {
    let max = word.length > 5 ? 4 : 2;
    let arr = [];

    while (arr.length < max) {
        let rnd = Math.floor(Math.random() * word.length);
        if (!(arr.includes(rnd))) arr.push(rnd);
    }

    return arr;
}

function delLetter(event) {
    for (let i = 0; i < alphabet.children.length; ++i) {
        if (event.target.textContent === alphabet.children[i].textContent) {
            if (!alphabet.children[i].getAttribute("default"))
                alphabet.children[i].classList.remove("choose");
            alphabet.children[i].removeAttribute("player");
        }
    }
    event.target.textContent = "";
}

function renderingCountry(country) {
    words.innerHTML = "";
    let emptyLetters = rndEmptyLetters(country);
    
    for (let i = 0; i < country.length; ++i) {
        let div = document.createElement("div");

        if (emptyLetters.includes(i)) {
            div.classList = "empty";
            div.addEventListener("mousedown", delLetter);
        }
        else
            div.textContent = country[i];

        words.appendChild(div);
    }
}

function rndWord() {
    let rndNum = Math.floor(Math.random() * countries.length);
    countryChoosed = countries[rndNum];
    countries.splice(rndNum, 1);
    return countryChoosed;
}

function chooseLetter() {
    let arr = [];
    for (let i = 0; i < words.children.length; ++i) {
        if (words.children[i].textContent)
            arr.push(words.children[i].textContent);
    }
    return arr;
}

function addDrag(elem) {
    elem.addEventListener("dragstart", function() {
        elem.classList.add("dragging");
    });

    elem.addEventListener("dragend", function() {
        elem.classList.remove("dragging");
    });
}

function checkEmpty() {
    for (let i = 0; i < words.children.length; ++i) {
        if (!words.children[i].textContent) return true;
    }
    return false;
}

function openModal() {
    modalBackground.style.display = "block";
    winWord.textContent = countryChoosed;
    if (countries.length == 0) {
        modalClose.style.display = "none";
    }
}

modalClose.addEventListener("click", function () {
    modalBackground.style.display = "none";
    startGame();
});

modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
        modalBackground.style.display = "none";
        startGame();
    }
});

function checkWin() {
    let str = "";

    for (let i = 0; i < words.children.length; ++i) {
        str += words.children[i].textContent;
    }

    if (str === countryChoosed) {
        console.log("win");
        progressBarColor.style.width = progressBarColorWidth + "%";
        progressBarColorWidth += 20;
        openModal();
    }
}

function addLetter(letter) {
    for (let i = 0; i < words.children.length; ++i) {
        if (words.children[i].className === "empty" && !words.children[i].textContent) {
            words.children[i].textContent = letter;
            checkWin();
            return;
        }
    }
}

function changeDivLetter(div) {
    if (checkEmpty()) {
        div.target.classList = "choose";    
        div.target.setAttribute("player", "true");
        addLetter(div.target.textContent);
    }
}

function alphabetRendering() {
    alphabet.innerHTML = "";
    let chooseLetters = chooseLetter();

    for (let i = 65; i <= 90; ++i) {
        let div = document.createElement("div");
        div.textContent = String.fromCharCode(i);
        div.draggable = true;
        addDrag(div);
        div.addEventListener("mouseup", changeDivLetter);

        if (chooseLetters.includes(String.fromCharCode(i))) {
            div.classList = "choose";
            div.setAttribute("default", "true");
        }

        alphabet.appendChild(div);
    }
}

function startGame() {
    beginWindow.style.display = "none";
    gameSection.style.display = "flex";
    renderingCountry(rndWord());
    alphabetRendering();
}
playButton.addEventListener("click", startGame);

words.addEventListener("dragover", function(event) {
    event.preventDefault();
    let activeEl = alphabet.querySelector(".dragging");
    let currentEl = event.target.closest('.empty');
    if (!activeEl || !currentEl) return;
    currentEl.textContent = activeEl.textContent;
    activeEl.classList.add("choose");
    checkWin();
});

clear.addEventListener("mousedown", function() {
    for (let i = 0; i < words.children.length; ++i) {
        if (words.children[i].className === "empty")
            words.children[i].textContent = "";
    }

    for (let i = 0; i < alphabet.children.length; ++i) {
        if (alphabet.children[i].getAttribute("player")) {
            alphabet.children[i].removeAttribute("player");
            if (!alphabet.children[i].getAttribute("default"))
                alphabet.children[i].className = "";
        }
    }
});

function restartGame() {
    progressBarColorWidth = 20;
    progressBarColor.style.width = "0%";
    countries = ["RUSSIA", "CHINA", "INDIA", "INDONESIA", "BRAZIL"];
    countryChoosed = "";
    modalClose.style.display = "";
    modalBackground.style.display = "none";
    beginWindow.style.display = "block";
    gameSection.style.display = "none";
}

exitModal.addEventListener("mousedown", restartGame);