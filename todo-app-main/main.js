"use strict";

let todoDiv = document.getElementById("todo");
let count = document.getElementById("count");
let theme = document.getElementById("theme");
let iconTheme = document.getElementById("imgTheme");
let main = document.body.getElementsByTagName("main")[0];
let inputText = document.getElementById("inputText");
let footerDiv = document.getElementById("footerDiv");
let spansFooterDiv = footerDiv.getElementsByTagName("span");

let darkTheme = true;
let list = { "javascript course": true, "jog around park": false, "read": false, "pick up groceries": false, "do some other very long tasks that need to be done and do some other very long tasks that need to be done": false };

let allFilter = document.getElementById("all");
let activeFilter = document.getElementById("active");
let completedFilter = document.getElementById("completed");
let clearCompleted = document.getElementById("clearCompleted");

let allMobile = document.getElementById("allMobile");
let activeMobile = document.getElementById("activeMobile");
let completedMobile = document.getElementById("completedMobile");
let mobileDiv = document.getElementById("mobileDiv");
let spansMobileDiv = mobileDiv.getElementsByTagName("span");

function delDiv(event, str) {
    let el = event ? event.target.getAttribute("dataTask") : str;
    let reg = new RegExp(el);
    delete list[el];
    addCount();

    for (let i = 0; i < todoDiv.children.length; ++i) {
        if (reg.test(todoDiv.children[i].getAttribute("dataTask"))) 
            todoDiv.children[i].remove();
    }
}

function addCount() {
    if (Object.keys(list).length > 0) {
        count.textContent = Object.keys(list).length + " ";
    } else count.textContent = "";
}

function checkCheckBox(event) {
    if (!list[event.target.getAttribute("datatask")]) {
        list[event.target.getAttribute("datatask")] = true;
        event.target.nextSibling.style.textDecoration = "line-through";
        event.target.nextSibling.style.color = "hsl(234, 11%, 52%)";
    }
    else {
        list[event.target.getAttribute("datatask")] = false;
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
    for (let i = 0; i < todoDiv.children.length; ++i) {
        if (reg.test(todoDiv.children[i].getAttribute("dataTask"))) 
            return false;
    }
    return true;
}

function addDrag(elem) {
    elem.addEventListener("dragstart", function() {
        elem.classList.add("dragging");
    });

    elem.addEventListener("dragend", function() {
        elem.classList.remove("dragging");
    });
}

function addItemInDiv() {
    for (let key in list) {
        if (checkItem(key)) {
            let div = document.createElement("div");
            div.className = "d-flex flex-row align-items-center item";
            div.setAttribute("dataTask", key);
            div.draggable = true;
            addDrag(div);

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
            checkBox.setAttribute("dataTask", key);
            checkBox.addEventListener("change", checkCheckBox);

            let spanIMG = document.createElement("span");
            spanIMG.id = "spanIMG";
            spanIMG.setAttribute("dataTask", key);
            spanIMG.addEventListener("mousedown", delDiv);
            let img = document.createElement("img");
            img.src = "images/icon-cross.svg";
            img.alt = "icon-cross";
            img.setAttribute("dataTask", key);
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

clearCompleted.addEventListener("mousedown", function() {
    for (let key in list) {
        if (list[key]) 
            delDiv(0, key);
    }
    clearChoosed();
    allDivFilter();
});


function addNewTodo(event) {
    if (event.key === "Enter") {
        if (inputText.value.trim()) {
            let completed = document.getElementById("newTodoCheckBox");
            list[inputText.value] = completed.checked ? true : false;
            inputText.value = "";
            completed.checked = false;
            addItemInDiv();
            addCount();
        }
    }
}

inputText.addEventListener("keydown", addNewTodo);

todoDiv.addEventListener("dragover", function(event) {
    event.preventDefault();
    let activeEl = todoDiv.querySelector(".dragging");
    let currentEl = event.target.closest('.item');
    if (!activeEl) return;

    let nextEl = (currentEl === activeEl.nextElementSibling)
        ? currentEl.nextElementSibling
        : currentEl;

    if (nextEl && nextEl.parentNode === todoDiv)
        todoDiv.insertBefore(activeEl, nextEl);
    else 
        todoDiv.appendChild(activeEl);
});

function clearChoosed() {
    if (window.innerWidth <= 581) {
        for (let i = 0; i < spansMobileDiv.length; ++i) {
            spansMobileDiv[i].classList.remove("choosed");
        }
    }
    else {
        for (let i = 0; i < spansFooterDiv.length; ++i) {
            spansFooterDiv[i].classList.remove("choosed");
        }
    }

    for (let i = 0; i < todoDiv.children.length; ++i) {
        todoDiv.children[i].classList.remove("hidden");
    }
}

function allDivFilter(event) {
    clearChoosed();
    if (window.innerWidth <= 581)
        allMobile.classList.add("choosed");
    else 
        allFilter.classList.add("choosed");
    addCount();
} 
allFilter.addEventListener("mousedown", allDivFilter);
allMobile.addEventListener("mousedown", allDivFilter);

function filter(item, choose) {
    if (choose) {
        let reg = new RegExp(item);
        for (let i = 0; i < todoDiv.children.length; ++i) {
            if (reg.test(todoDiv.children[i].getAttribute("dataTask"))) {
                todoDiv.children[i].classList.add("hidden");
            }        
        }
    }
}

function actFilter(event) {
    clearChoosed();
    event.target.classList.add("choosed");
    let sum = 0;
    for (let item in list) {
        filter(item, list[item]);
        if (!list[item]) ++sum;
    }
    count.textContent = sum + " ";
}
activeFilter.addEventListener("mousedown", actFilter);
activeMobile.addEventListener("mousedown", actFilter);

function complFilter(event) {
    clearChoosed();
    event.target.classList.add("choosed");
    let sum = 0;
    for (let item in list) {
        filter(item, !list[item]);
        if (list[item]) ++sum;
    }
    count.textContent = sum + " ";
}   
completedFilter.addEventListener("mousedown", complFilter);
completedMobile.addEventListener("mousedown", complFilter);