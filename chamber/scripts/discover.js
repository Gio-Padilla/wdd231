const url = "./data/locations.json"; // Path to your JSON file
const displayLocation = document.getElementById("locations");
const theModaL = document.getElementById("learn-more");

async function getCompanyData() {
  try {
    const response = await fetch(url); // Fetch the data
    const data = await response.json(); // Convert to JSON
    displayLocations(data); // Send to display function
  } catch (error) {
    console.error("Failed to load location data:", error);
  }
}

function displayLocations(data) {
    displayLocation.innerHTML = "";
    data.forEach(location => {
        const divCard = document.createElement("div");
        divCard.classList.add("card");
        divCard.innerHTML += returnLocationHTML(location);
        const learnButton = divCard.querySelector("button");
        learnButton.addEventListener("click", function () {
            learnMoreEvent(location);
        });
        displayLocation.appendChild(divCard);
    });
}

function returnLocationHTML(location) {
    return `<h2>${location.name}</h2>
    <figure><img src="images/discover/${location.image}" alt="${location.name}" width="400" height="300" loading="lazy"></figure>
    <p>${location.shortDescription}</p>
    <address>${location.address}</address>
    <button>Learn More</button>`;
}

function learnMoreEvent(location) {
    theModaL.innerHTML = `<div><h2>${location.name}</h2><button>X</button></div>
    <p>${location.longDescription}</p>
    <address>${location.address}</address>`;
    const modalCloseButton = theModaL.querySelector("button");
    modalCloseButton.addEventListener("click", function () {
        theModaL.close();
    });
    theModaL.showModal();

    // This allows the Modal to close if you do not click on it.
    theModaL.addEventListener("click", function (event) {
        const rect = theModaL.getBoundingClientRect();
        const clickedInDialog =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (!clickedInDialog) {
            theModaL.close();
        }
    });
}

getCompanyData();

// ------------------------------------------ The last visit code ------------------------------------------

const visitMessageEl = document.getElementById("visit-message");
const lastVisitKey = "lastVisit";
const now = Date.now(); // current time in milliseconds
const millisecondsInADay = 1000 * 60 * 60 * 24;

const lastVisit = localStorage.getItem(lastVisitKey);

let message = "";

if (!lastVisit) {
    // First visit
    message = "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = now - Number(lastVisit);
    const daysPassed = Math.floor(timeDifference / millisecondsInADay);

    if (daysPassed < 1) {
        message = "Back so soon! Awesome!";
    } else if (daysPassed === 1) {
        message = "You last visited 1 day ago.";
    } else {
        message = `You last visited ${daysPassed} days ago.`;
    }
}

// Display the message
visitMessageEl.textContent = message;

// Save current visit time for the next visit
localStorage.setItem(lastVisitKey, now.toString());

