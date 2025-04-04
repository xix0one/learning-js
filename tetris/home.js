"use strict";

let homeInfo = document.getElementById("homeInfo");
let windowInfo = document.getElementById("windowInfo");
let next = document.getElementById("next");
let startGame = document.getElementById("start");

next.style.display = "none";
windowInfo.style.display = "none";
homeInfo.textContent = "use left, right and start for choose game";

startGame.addEventListener("click", function() {
    let script = document.createElement('script');
    script.src = "tetris.js";
    script.async = false;
    document.body.appendChild(script);
});