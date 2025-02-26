"use strict";

let todoDiv = document.getElementById("todo");
let count = document.getElementById("count");
let theme = document.getElementById("theme");
let iconTheme = document.getElementById("imgTheme");
let main = document.body.getElementsByTagName("main")[0];
let inputText = document.getElementById("inputText");

let darkTheme = true;
let list = { "javascript course": false, "jog around park": false, "read": false, "pick up groceries": false };

function delDiv(event) {
    let el = event.target.className;
    let reg = new RegExp(el);
    delete list[el];
    addCount();

    for (let i = 0; i < todoDiv.childNodes.length; ++i) {
        if (reg.test(todoDiv.childNodes[i].className)) 
            todoDiv.childNodes[i].remove();
    }
}

function addCount() {
    if (Object.keys(list).length > 0) {
        count.textContent = Object.keys(list).length + " ";
    } else count.textContent = "";
}

function checkCheckBox(event) {
    if (!list[event.target.className]) {
        list[event.target.className] = true;
        event.target.nextSibling.style.textDecoration = "line-through";
        event.target.nextSibling.style.color = "hsl(234, 11%, 52%)";
    }
    else {
        list[event.target.className] = false;
        event.target.nextSibling.style = "";
    }
}

function changeTheme() {
    let divs = main.getElementsByTagName("div");
    let span = todoDiv.getElementsByClassName("textSpan");
    const white = "hsl(0, 0%, 98%)";

    if (darkTheme) {
        iconTheme.src = "images/icon-moon.svg";
        document.body.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
        document.body.style.backgroundColor = white;
        inputText.style.backgroundColor = white;

        for (let i = 0; i < divs.length; ++i)
            divs[i].style.backgroundColor = white;   

        for (let i = 0; i < span.length; ++i) 
            span[i].style.color = "hsl(235, 19%, 35%)";
    }
    else {
        iconTheme.src = "images/icon-sun.svg";
        document.body.style.backgroundImage = "";
        document.body.style.backgroundColor = "";
        inputText.style.backgroundColor = "";

        for (let i = 0; i < divs.length; ++i) 
            divs[i].style.backgroundColor = "";
        
        for (let i = 0; i < span.length; ++i) 
            span[i].style.color = "";
    }
    darkTheme = !darkTheme;
}

theme.addEventListener("mousedown", changeTheme);

function addItemInDiv() {
    for (let key in list) {
        let div = document.createElement("div");
        div.className = "d-flex flex-row align-items-center " + key;

        let span = document.createElement("span");
        span.textContent = key;
        span.className = "textSpan";

        if (list[key]) {
            span.style.textDecoration = "line-through";
        } 

        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = key;
        checkBox.addEventListener("change", checkCheckBox);

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