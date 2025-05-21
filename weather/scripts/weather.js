const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const url = "https://api.openweathermap.org/data/2.5/forecast?lat=49.756&lon=6.639&units=imperial&appid=e516e2c8a98ae0c0da73dc7073a3c212";

async function apiFetch() {
  try {
    const response = await fetch(url); // Fetch the data
    const data = await response.json(); // Convert to JSON
    console.log(data); // Display to console for testing
    // displayResults(data);
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

function displayResults(data) {

    const weather = data.list[0];

    weatherIcon.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    weatherIcon.alt = weather.weather[0].main;

    currentTemp.textContent = `${weather.main.temp}°F`;
    captionDesc.textContent = toTitleCase(weather.weather[0].description);
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

apiFetch();