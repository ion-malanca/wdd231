import { places } from "../data/discover.mjs";

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const container = document.getElementById("discover-grid");

places.forEach((place, index) => {
    const card = document.createElement("section");

    card.classList.add("card");
    card.classList.add(`card${index + 1}`);

    card.innerHTML = `
        <h2>${place.name}</h2>

        <figure>
            <img src="${place.image}" alt="${place.name}" loading="lazy">
        </figure>

        <address>${place.address}</address>

        <p>${place.description}</p>

        <button>Learn More</button>
    `;

    container.appendChild(card);
});

const visitMessage = document.getElementById("visit-message");

const lastVisit = localStorage.getItem("lastVisit");

const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const daysBetween = Math.floor(
        (currentVisit - Number(lastVisit)) /
        (1000 * 60 * 60 * 24)
    );

    if (daysBetween < 1) {
        visitMessage.textContent =
            "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
        visitMessage.textContent =
            "You last visited 1 day ago.";
    } else {
        visitMessage.textContent =
            `You last visited ${daysBetween} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);