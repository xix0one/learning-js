"use strict";

const subscribe = document.getElementById("subscribe");

let modal = document.getElementsByClassName("modal")[0];
let emailReq = document.getElementsByClassName("emailReq")[0];
let input = document.querySelector("input");
let dismiss = document.getElementById("dismiss");
let emailPerson = document.getElementById("emailPerson");

function checkInput() {
    return /(\s+)?\w+@\w+\.\w+(\s+)?/.test(input.value);
}

function defaultInput() {
    input.style.borderColor = "";
    input.style.backgroundColor = "";
    input.style.color = "";
    emailReq.style.display = "none";
    input.removeEventListener("keydown", defaultInput);
}

function clearInput() {
    input.value = "";
    input.removeEventListener("mousedown", clearInput);
}
input.addEventListener("mousedown", clearInput);

function pressSubscribe() {
    if (checkInput()) {
        modal.style.display = "block";
        emailReq.style.display = "none";
        emailPerson.textContent = input.value;
        defaultInput();
    }
    else {
        emailReq.style.display = "inline";
        input.style.borderColor = "red";
        input.style.color = "red";
        input.style.backgroundColor = "rgba(255, 200, 200, 0.7)";
        input.addEventListener("keydown", defaultInput);
    }
}

subscribe.addEventListener("mousedown", pressSubscribe);

input.addEventListener("keydown", function(event) {
    if (event.key == "Enter") {
        event.preventDefault();
        pressSubscribe();
    }
});

dismiss.addEventListener("mousedown", function() {
    modal.style.display = "none";
});