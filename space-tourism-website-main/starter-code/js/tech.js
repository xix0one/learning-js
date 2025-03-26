"use strict";

let naviga = document.querySelectorAll("#naviga div");
let photo = document.getElementById("photo");
let description = document.getElementById("description");
let profName = document.getElementById("profName");
let name = document.getElementById("name");

function removeClass() {
    naviga.forEach(element => {
        element.classList.remove("active");
    });
}

function changeTech(num) {
    switch(num) {
        case "0":
            photo.src = "assets/technology/image-launch-vehicle-portrait.jpg";
            photo.alt = "launch-vehicle";
            description.textContent = "A launch vehicle or carrier rocket is a rocket-propelled vehicle used to carry a payload from Earth's surface to space, usually to Earth orbit or beyond. Our WEB-X carrier rocket is the most powerful in operation. Standing 150 metres tall, it's quite an awe-inspiring sight on the launch pad!";
            name.textContent = "Launch vehicle";
            break;
        case "1":
            photo.src = "assets/technology/image-space-capsule-portrait.jpg";
            photo.alt = "space-capsule";
            description.textContent = "A space capsule is an often-crewed spacecraft that uses a blunt-body reentry capsule to reenter the Earth's atmosphere without wings. Our capsule is where you'll spend your time during the flight. It includes a space gym, cinema, and plenty of other activities to keep you entertained.";
            name.textContent = "Space capsule";
            break;
        case "2":
            photo.src = "assets/technology/image-spaceport-portrait.jpg";
            photo.alt = "spaceport";
            description.textContent = "  A spaceport or cosmodrome is a site for launching (or receiving) spacecraft, by analogy to the seaport for ships or airport for aircraft. Based in the famous Cape Canaveral, our spaceport is ideally situated to take advantage of the Earth’s rotation for launch.";
            name.textContent = "Spaceport";
            break;
    }
}

naviga.forEach(function(element, i) {
    element.setAttribute("number", i);

    element.addEventListener("click", function(event) {
        removeClass();
        changeTech(event.target.getAttribute("number"));
        event.target.classList.add("active");
    });
});