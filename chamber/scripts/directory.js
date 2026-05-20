const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

const container = document.getElementById("cards");

container.classList.add("grid-view");

const gridBtn = document.getElementById("gridView");
const listBtn = document.getElementById("listView");

gridBtn.addEventListener("click", () => {
  container.classList.add("grid-view");
  container.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  container.classList.add("list-view");
  container.classList.remove("grid-view");
});

async function loadCompanies() {
  try {
    const response = await fetch("scripts/members.json");

    if (!response.ok) {
      throw new Error("Failed to load members.json");
    }

    const companies = await response.json();

    companies.forEach(company => {
      const card = document.createElement("section");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${company.image}" alt="${company.name}">

        <h2>${company.name}</h2>

        <div class="grid-info">
          <p><strong>Address:</strong> ${company.address}</p>
          <p><strong>Phone:</strong> ${company.phone}</p>
          <p><strong>Category:</strong> ${company.category}</p>
          <p><strong>Membership:</strong> ${company.membership}</p>

          <div class="parts">
            <p>${company.description}</p>
            <a href="${company.website}" target="_blank">Visit Website</a>
          </div>
        </div>

        <div class="list-info">
          <p>${company.name}</p>
          <p>${company.phone}</p>
          <p>Membership: ${company.membership}</p>
          <p>
            <a href="${company.website}" target="_blank">Website</a>
          </p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading members:", error);
  }
}

loadCompanies();

document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;