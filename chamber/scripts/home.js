const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

async function loadEvents() {
  try {
    const response = await fetch("data/events.json");

    if (!response.ok) {
      throw new Error("Failed to load events.json");
    }

    const events = await response.json();
    const container = document.getElementById("events");

    events.forEach(event => {
      const card = document.createElement("section");
      card.classList.add("event-card");

      card.innerHTML = `
        <h3>• ${event.title}</h3>
        <p><strong>Time:</strong> ${event.date}, ${event.time}</p>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error("Error loading events:", error);
  }
}

loadEvents();

const apiKey = "1107b3e97368b7657595d64e961d1d54";
const lat = 47.0105;
const lon = 28.8638;
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Weather data failed");
    }

    const data = await response.json();

    displayCurrent(data);
    displayForecast(data);
  } catch (error) {
    console.error(error);
  }
}

function toTitleCase(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function displayCurrent(data) {
  const current = data.list[0];

  document.getElementById("current-weather").innerHTML = `
    <p>${Math.round(current.main.temp)} °C</p>
    <p>${toTitleCase(current.weather[0].description)}</p>
    <p>High: ${Math.round(current.main.temp_max)} °C</p>
    <p>Low: ${Math.round(current.main.temp_min)} °C</p>
    <p>Humidity: ${current.main.humidity}%</p>
    <p>Sunrise: ${new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    <p>Sunset: ${new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
  `;
}

function displayForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  for (let i = 8; i < 32; i += 8) {
    const item = data.list[i];
    const date = new Date(item.dt_txt);

    forecastDiv.innerHTML += `
      <div class="forecast-day">
        <p>${date.toLocaleDateString("en-US", { weekday: "long" })}: <strong>${Math.round(item.main.temp)} °C</strong></p>
      </div>
    `;
  }
}

getWeather();

function getMembership(level) {
  switch (level) {
    case 1:
      return "Bronze";
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "";
  }
}

async function loadCompanies() {
  try {
    const response = await fetch("data/members.json");

    if (!response.ok) {
      throw new Error("Failed to load members.json");
    }

    const companies = await response.json();
    const container = document.getElementById("cards");

    container.innerHTML = "";

    const filtered = companies.filter(c => c.membership >= 2);

    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    const selected = filtered.slice(0, 3);

    selected.forEach(company => {
      const card = document.createElement("section");
      card.classList.add("card");

      card.innerHTML = `
        <div class="top">
          <h3>${company.name}</h3>
          <p><strong>Membership:</strong> ${getMembership(company.membership)}</p>
        </div>
        <hr>
        <div class="detail">
          <img src="${company.image}" alt="${company.name}">
          <div class="details">
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>URL:</strong> <a href="${company.website}" target="_blank">Visit Website</a></p>
          </div>
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