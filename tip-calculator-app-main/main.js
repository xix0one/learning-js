"use strict";

let inputs = document.querySelectorAll("input");
let buttons = document.querySelectorAll("button");
let zero = document.getElementById("zero");

let bill = 0;
let numberOfPeople = 0;
let percent = 0;

let amountPerson = document.getElementById("amountPerson");
let totalPerson = document.getElementById("totalPerson");

inputs[0].addEventListener("input", function() {
    bill = inputs[0].value;
    inputs[0].style.color = "hsl(183, 100%, 15%)";
});

inputs[1].addEventListener("input", function() {
    percent = Number(inputs[1].value);
    buttons.forEach(function(button) {
        if (button.style.backgroundColor) {
            button.style.backgroundColor = "";
            button.style.color = "hsl(0, 0%, 100%)";
        }
    });
});

inputs[2].addEventListener("input", function() {
    if (inputs[2].value == 0) {
        zero.style.visibility = "visible";
        inputs[2].style.borderColor = "red";
    } else {
        zero.style.visibility = "hidden";
        inputs[2].style.borderColor = "hsl(172, 67%, 45%)";
    }
    inputs[2].style.color = "hsl(183, 100%, 15%)";
    numberOfPeople = inputs[2].value;
});

buttons.forEach(function(button) {
    button.addEventListener("mouseup", function() {
        if (button.id == "reset") {
            if (inputs[2].value == 0) {
                zero.style.visibility = "visible";
                inputs[2].style.borderColor = "red";
            } else {
                button.style.backgroundColor = "hsl(172, 48.60%, 43.50%)";
                button.style.color = "hsl(183, 100%, 15%)";

                let tipAmount = bill * (percent / 100);
                let tipAmountPerPeson = tipAmount / numberOfPeople;
                let totalAmount = Number(bill) + tipAmount;
                let totalPerPerson = totalAmount / numberOfPeople;

                amountPerson.textContent = "$" + tipAmountPerPeson.toFixed(2);
                totalPerson.textContent = "$" + totalPerPerson.toFixed(2);
            }
        } else {
            inputs[1].value = "";
            buttons.forEach(function(button) {
                if (button.style.backgroundColor) {
                    button.style.backgroundColor = "";
                    button.style.color = "hsl(0, 0%, 100%)";
                }
            });
            button.style.backgroundColor = "hsl(172, 48.60%, 43.50%)";
            button.style.color = "hsl(183, 100%, 15%)";
            percent = button.textContent.length == 2 ? 
                      button.textContent.slice(0, 1) :
                      button.textContent.slice(0, 2);
        }
    });
});