"use strict";

let todoDiv = document.getElementById("todo");
let count = document.getElementById("count");
let theme = document.getElementById("theme");

let list = { "javascript course": false, "jog around park": false, "read": false, "pick up groceries": false };

function delDiv(event) {
    let el = event.target.className;
    let reg = new RegExp(el);
    delete list[el];
    addCount();

    for (let i = 0; i < todoDiv.childNodes.length; ++i) {
        if (reg.test(todoDiv.childNodes[i].className)) todoDiv.childNodes[i].remove();
    }
}

function addCount() {
    if (Object.keys(list).length > 0) {
        count.textContent = Object.keys(list).length + " ";
    } else count.textContent = "";
}

function addItemInDiv() {
    for (let key in list) {
        let div = document.createElement("div");
        div.className = "d-flex flex-row align-items-center " + key;

        let span = document.createElement("span");
        span.textContent = key;

        if (list[key]) {} // underline

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";

        let spanIMG = document.createElement("span");
        spanIMG.id = "spanIMG";
        spanIMG.className = key;
        spanIMG.addEventListener("mousedown", delDiv);
        let img = document.createElement("img");
        img.src = "images/icon-cross.svg";
        img.alt = "icon-cross";
        img.className = key;
        spanIMG.append(img);

        div.append(checkBox);
        div.append(span);
        div.append(spanIMG);
        todoDiv.append(div);
    }
}

addItemInDiv();
addCount();