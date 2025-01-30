"use strict";

let countSneakers = document.getElementById("countSneakers");
let basket = document.getElementById("basket");
let listBasket = document.getElementById("listBasket");
let windowBasket = document.getElementById("windowBasket");
let avatar = document.getElementById("avatar");

// images
let chooseImage = document.getElementsByClassName("chooseImage")[0];
let mainImageDiv = document.getElementById("mainImageDiv");
let mainImageModal = document.getElementById("mainImageModal");
let imagesDiv = document.getElementById("imagesDiv");
let imagesModal = document.getElementById("imagesModal");

function openBasket(elem) {
    elem.addEventListener("mousedown", function() {
        windowBasket.className += " d-flex flex-column mt-5 shadow p-3 bg-body-tertiary rounded";
    });
}

openBasket(countSneakers); 
openBasket(basket);
openBasket(avatar); 

function imagesOpen(elem, mainImage) {
    for (let i = 0; i < elem.children.length; ++i) {
        elem.children[i].addEventListener("mousedown", function(event) {
            event.target.className = "chooseImage";
            mainImage.src = event.target.src.replace(/-thumbnail/, "");

            for (let j = 0; j < elem.children.length; ++j) {
                if ((elem.children[j].className == "chooseImage") && (elem.children[j] !== event.target)) 
                    elem.children[j].className = "";
            }
        });
    }
}

imagesOpen(imagesDiv, mainImageDiv);