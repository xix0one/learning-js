"use strict";

let todoDiv = document.getElementById("todo");
let count = document.getElementById("count");

let list = { "javascript course": false, "jog around park": false, "read": false, "pick up groceries": false };

function addCount() {
    if (Object.keys(list).length > 0) {
        count.textContent = Object.keys(list).length + " ";
    } else count.textContent = "";
}

function addItemInDiv() {
    for (let key in list) {
        let div = document.createElement("div");
        div.className = "d-flex flex-row align-items-center";

        let span = document.createElement("span");
        span.textContent = key;

        if (list[key]) {} // underline

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        let spanIMG = document.createElement("span");
        spanIMG.id = "spanIMG";
        let img = document.createElement("img");
        img.src = "images/icon-cross.svg";
        img.alt = "icon-cross";
        spanIMG.append(img);

        div.append(checkBox);
        div.append(span);
        div.append(spanIMG);
        todoDiv.append(div);
    }
}

addItemInDiv();
addCount();