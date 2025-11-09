
const container = document.getElementById("characterContainer");
const houseFilter = document.getElementById("houseFilter");
const yearSpan = document.getElementById("year");
yearSpan.textContent = new Date().getFullYear();

const API_URL = "https://hp-api.onrender.com/api/characters";
const NOT_FOUND_IMG = "images/not-found.png";
let characters = [];

// Fetch data from the API
async function fetchCharacters() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    characters = data.slice(0, 16); // limit to 16 characters
    displayCharacters(characters);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Render character cards dynamically
function displayCharacters(list) {
  container.innerHTML = "";

  list.forEach((char) => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    const img = document.createElement("img");
    img.src = char.image || NOT_FOUND_IMG;
    img.alt = char.name;

    const name = document.createElement("h2");
    name.textContent = char.name;

    const house = document.createElement("p");
    house.textContent = `House: ${char.house || "Unknown"}`;

    const dob = document.createElement("p");
    dob.textContent = `DOB: ${char.dateOfBirth || "Unknown"}`;

    card.append(img, name, house, dob);
    container.appendChild(card);
  });
}

// Filter by house
houseFilter.addEventListener("change", () => {
  const selected = houseFilter.value;
  if (selected === "all") {
    displayCharacters(characters);
  } else {
    const filtered = characters.filter(
      (char) => char.house === selected
    );
    displayCharacters(filtered);
  }
});

// Initialize
fetchCharacters();