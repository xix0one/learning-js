"use strict";

let todoDiv = document.getElementById("todo");
let count = document.getElementById("count");
let theme = document.getElementById("theme");
let iconTheme = document.getElementById("imgTheme");
let main = document.body.getElementsByTagName("main")[0];
let inputText = document.getElementById("inputText");

let darkTheme = true;
let list = { "javascript course": false, "jog around park": false, "read": false, "pick up groceries": false, "pick up groceries and do some other very long tasks that need to be done and do some other very long tasks that need to be done": false };

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
    if (darkTheme) {
        iconTheme.src = "images/icon-moon.svg";
        document.body.classList.add("lightTheme");
    }
    else {
        iconTheme.src = "images/icon-sun.svg";
        document.body.classList.remove("lightTheme");
    }
    darkTheme = !darkTheme;
}

theme.addEventListener("mousedown", changeTheme);

function checkItem(item) {
    let reg = new RegExp(item);
    for (let i = 0; i < todoDiv.childNodes.length; ++i) {
        if (reg.test(todoDiv.childNodes[i].className)) 
            return false;
    }
    return true;
}

function addItemInDiv() {
    for (let key in list) {
        if (checkItem(key)) {
            let div = document.createElement("div");
            div.className = "d-flex flex-row align-items-center " + key;
            div.draggable = true;

            let span = document.createElement("span");
            span.textContent = key;
            span.className = "textSpan";

            let checkBox = document.createElement("input");
            if (list[key]) {
                span.style.textDecoration = "line-through";
                span.style.color = "hsl(234, 11%, 52%)";
                checkBox.checked = true;
            }
            
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
}

addItemInDiv();
addCount();

function addNewTodo(event) {
    if (event.key === "Enter") {
        let completed = document.getElementById("newTodoCheckBox");

        if (completed.checked)
            list[inputText.value] = true;
        else
            list[inputText.value] = false;

        inputText.value = "";
        completed.checked = false;
        addItemInDiv();
        addCount();
    }
}

inputText.addEventListener("keydown", addNewTodo);