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
let addToCart = document.getElementById("addToCart");

let closeModal = document.getElementById("closeModal");

let iconPreviousTelephone = document.getElementById("iconPreviousTelephone");
let iconNextTelephone = document.getElementById("iconNextTelephone");

// shop
let amount = document.getElementById("amount");
let p = listBasket.getElementsByTagName("p")[0];
let shopOpen = document.getElementById("shopOpen");
let defaultDivBasket = listBasket.innerHTML;
let checkout = document.getElementById("checkout");
let deleteShop = document.getElementById("deleteShop");
let countShop = document.getElementById("countShop");
let totalShop = document.getElementById("totalShop");

function closeBasket(event) {
    if (event.target.id !== "windowBasket") {
        windowBasket.className = "divBasket";
        document.body.removeEventListener("click", closeBasket);
        countSneakers.removeEventListener("click", closeBasket);
        basket.removeEventListener("click", closeBasket);
        avatar.removeEventListener("click", closeBasket);
    }
}

function addOpenBasket(elem) {
    elem.addEventListener("click", function(event) {
        event.stopPropagation();
        windowBasket.className = "divBasket d-flex flex-column mt-5 shadow p-3 bg-body-tertiary rounded z-3";
        document.body.addEventListener("click", closeBasket);
        countSneakers.addEventListener("click", closeBasket);
        basket.addEventListener("click", closeBasket);
        avatar.addEventListener("click", closeBasket);
    });
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

closeModal.addEventListener("mousedown", function() {
    for (let i = 0; i < imagesDiv.children.length; ++i) {
        if (imagesDiv.children[i].className == "chooseImage") 
            imagesModal.children[i].className = "chooseImage";
        else
            imagesModal.children[i].className = "";
    }
    mainImageModal.src = mainImageDiv.src;
});


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
    document.body.addEventListener("click", closeBasket);
    if (Number(amount.textContent) > 0) {
        p.remove();
        shopOpen.className = "shop d-flex justify-content-betweenalign-items-center";
        windowBasket.style.height = "auto";
        checkout.style.display = "block";
        countShop.textContent = amount.textContent;
        totalShop.textContent = "$" + (125 * Number(countShop.textContent)).toFixed(2);
        countSneakers.textContent = amount.textContent;
        countSneakers.className = "d-inline-flex justify-content-center";
    }
});

deleteShop.addEventListener("mousedown", function() {
    shopOpen.className = "shop";
    countShop.textContent = 0;
    totalShop.textContent = 0;
    amount.textContent = 0;
    countSneakers.className = "";
    checkout.style.display = "none";
    listBasket.append(p);
});

let currentIconTelephone = 1;
iconPreviousTelephone.addEventListener("mousedown", function() {
    if (currentIconTelephone == 1) currentIconTelephone = 4;
    else --currentIconTelephone;
    mainImageDiv.src = "images/image-product-" + currentIconTelephone + ".jpg"
});

iconNextTelephone.addEventListener("mousedown", function() {
    if (currentIconTelephone == 4) currentIconTelephone = 1;
    else ++currentIconTelephone;
    mainImageDiv.src = "images/image-product-" + currentIconTelephone + ".jpg"
});

addOpenBasket(countSneakers); 
addOpenBasket(basket);
addOpenBasket(avatar);
addOpenBasket(addToCart); 
imagesOpen(imagesDiv, mainImageDiv);
imagesOpen(imagesModal, mainImageModal);
previousNextButtons();