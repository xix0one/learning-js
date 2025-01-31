"use strict";

let countSneakers = document.getElementById("countSneakers");
let basket = document.getElementById("basket");
let listBasket = document.getElementById("listBasket");
let windowBasket = document.getElementById("windowBasket");
let avatar = document.getElementById("avatar");

let previousButton = document.getElementById("previousButton");
let nextButton = document.getElementById("nextButton");

let mainImageDiv = document.getElementById("mainImageDiv");
let mainImageModal = document.getElementById("mainImageModal");
let imagesDiv = document.getElementById("imagesDiv");
let imagesModal = document.getElementById("imagesModal");

let plus = document.getElementById("plus");
let minus = document.getElementById("minus");
let amount = document.getElementById("amount");
let addToCart = document.getElementById("addToCart");

function closeBasket() {
    windowBasket.className = "divBasket";
    document.body.removeEventListener("mouseup", closeBasket);
}

function addOpenBasket(elem) {
    elem.addEventListener("mousedown", function() {
        windowBasket.className += " d-flex flex-column mt-5 shadow p-3 bg-body-tertiary rounded";
        document.body.addEventListener("mouseup", closeBasket);
    });
}

function imagesOpen(elem, mainImage) {
    for (let i = 0; i < elem.children.length; ++i) {
        elem.children[i].addEventListener("mousedown", function(event) {
            event.target.className = "chooseImage";
            mainImage.src = event.target.src.replace(/-thumbnail/, "");
            mainImageModal.src = mainImage.src;
            imagesModal.children[i].className = "chooseImage";

            for (let j = 0; j < elem.children.length; ++j) {
                if ((elem.children[j].className == "chooseImage") && (elem.children[j] !== event.target)) {
                    elem.children[j].className = "";
                    imagesModal.children[j].className = "";
                }
            }
        });
    }
}

function previousButtonDiv(current) {
    if (current === 0) {
        imagesModal.children[3].className = "chooseImage";
        mainImageModal.src = imagesModal.children[3].src.replace(/-thumbnail/, "");
    }
    else {
        imagesModal.children[current - 1].className = "chooseImage";
        mainImageModal.src = imagesModal.children[current - 1].src.replace(/-thumbnail/, "");
    }
}

function nextButtonDiv(current) {
    if (current === 3) {
        imagesModal.children[0].className = "chooseImage";
        mainImageModal.src = imagesModal.children[0].src.replace(/-thumbnail/, "");
    }
    else {
        imagesModal.children[current + 1].className = "chooseImage";
        mainImageModal.src = imagesModal.children[current + 1].src.replace(/-thumbnail/, "");
    }
}

function readDivImages() {
    let current = 0;
    for (let i = 0; i < imagesModal.children.length; ++i) {
        if (imagesModal.children[i].className == "chooseImage") {
            imagesModal.children[i].className = "";
            current = i;
        }
    }
    return current;
}

function previousNextButtons() {
    previousButton.addEventListener("mousedown", function(event) {
        event.preventDefault();
        previousButtonDiv(readDivImages());
    });
    nextButton.addEventListener("mousedown", function(event) {
        event.preventDefault();
        nextButtonDiv(readDivImages());
    });
}

function plusAmount() {
    amount.textContent = Number(amount.textContent) + 1;
}
plus.addEventListener("mousedown", plusAmount);

function minusAmount() {
    if (!(amount.textContent == 0)) amount.textContent -= 1;
}
minus.addEventListener("mousedown", minusAmount);

addToCart.addEventListener("mousedown", function() {
    
});

addOpenBasket(countSneakers); 
addOpenBasket(basket);
addOpenBasket(avatar);
addOpenBasket(addToCart); 
imagesOpen(imagesDiv, mainImageDiv);
imagesOpen(imagesModal, mainImageModal);
previousNextButtons();