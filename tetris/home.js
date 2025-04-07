"use strict";

let start = document.getElementById("start");
let exit = document.getElementById("exit");
let frame = document.getElementById("game-frame");
let form = document.getElementById("games");

let currentGame = null;

function closeGame() {
    currentGame = null;
    frame.src = "";
    frame.style.height = "auto";
}

function loadGame() {
    currentGame = form.value;
    frame.style.height = "800px";
    frame.src = currentGame + "/" + currentGame + ".html";
}

start.addEventListener("click", loadGame);
exit.addEventListener("click", closeGame);