"use strict";

let planets = document.querySelectorAll("#planets li");
let planet = document.getElementById("planet");
let description = document.getElementById("description");
let header = document.getElementById("header");
let travelTime = document.getElementById("travel-time");
let avgDistance = document.getElementById("avg-distance");

function removeClass() {
    planets.forEach(element => {
        element.className = "";
    });
}

function changeImgPlanet(name) {
    planet.src = "assets/destination/image-" + name.toLowerCase() + ".png";
    planet.alt = name;
}

function changeDescription(name) {
    if (name === "Mars") {
        description.textContent = "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!";
        header.textContent = "Mars";
        travelTime.textContent = "9 months";
        avgDistance.textContent = "225 mil. km";
    } 
    else if (name === "Moon") {
        description.textContent = "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.";
        header.textContent = "Moon";
        travelTime.textContent = "3 days";
        avgDistance.textContent = "384,400 km";
    }
    else if (name === "Europa") {
        description.textContent = "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.";
        header.textContent = "Europa";
        travelTime.textContent = "3 years";
        avgDistance.textContent = "628 mil. km";
    }
    else if (name === "Titan") {
        description.textContent = "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.";
        header.textContent = "Titan";
        travelTime.textContent = "7 years";
        avgDistance.textContent = "1.6 bil. km";
    }
}

planets.forEach(element => {
    element.addEventListener("click", function(event) {
        removeClass();
        changeImgPlanet(event.target.textContent);
        changeDescription(event.target.textContent);
        event.target.className = "active-link";
    });
});