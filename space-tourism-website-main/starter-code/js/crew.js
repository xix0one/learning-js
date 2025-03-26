"use strict";

let naviga = document.querySelectorAll("#naviga p");
let description = document.getElementById("description");
let name = document.getElementById("name");
let photo = document.getElementById("photo");

function removeClass() {
    naviga.forEach(element => {
        element.className = "";
    });
}

function changeDescription(num) {
    switch(num) {
        case "0":
            photo.src = "assets/crew/image-douglas-hurley.png";
            photo.alt = "douglas-hurley";
            description.textContent = "Douglas Gerald Hurley is an American engineer, former Marine Corps pilot and former NASA astronaut. He launched into space for the third time as commander of Crew Dragon Demo-2.";
            name.textContent = "Douglas Hurley";
            profName.textContent = "Commander";
            break;
        case "1":
            photo.src = "assets/crew/image-mark-shuttleworth.png";
            photo.alt = "mark-shuttleworth";
            description.textContent = "Mark Richard Shuttleworth is the founder and CEO of Canonical, the company behind the Linux-based Ubuntu operating system. Shuttleworth became the first South African to travel to space as a space tourist.";
            name.textContent = "Mark Shuttleworth";
            profName.textContent = "Mission Specialist";
            break;
        case "2":
            photo.src = "assets/crew/image-victor-glover.png";
            photo.alt = "victor-glover";
            description.textContent = "Pilot on the first operational flight of the SpaceX Crew Dragon to the International Space Station. Glover is a commander in the U.S. Navy where he pilots an F/A-18.He was a crew member of Expedition 64, and served as a station systems flight engineer. ";
            name.textContent = "Victor Glover";
            profName.textContent = "Pilot";
            break;
        case "3":
            photo.src = "assets/crew/image-anousheh-ansari.png";
            photo.alt = "anousheh-ansari";
            description.textContent = "Anousheh Ansari is an Iranian American engineer and co-founder of Prodea Systems. Ansari was the fourth self-funded space tourist, the first self-funded woman to fly to the ISS, and the first Iranian in space. ";
            name.textContent = "Anousheh Ansari";
            profName.textContent = "Flight Engineer";
            break; 
    }
}

naviga.forEach(function (element, i) {
    element.setAttribute("number", i);

    element.addEventListener("click", function(event) {
        removeClass();
        changeDescription(event.target.getAttribute("number"));
        event.target.className = "active";
    });
});