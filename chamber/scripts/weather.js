
// For Omaha Nebraska
const url = "https://api.openweathermap.org/data/2.5/forecast?lat=41.259&lon=-95.938&units=imperial&appid=e516e2c8a98ae0c0da73dc7073a3c212";

const currentWeatherData = document.querySelector('#current-weather-data');
const weatherIcon = document.querySelector('#current-weather-icon');
const weatherForcastData = document.querySelector('#weather-forcast-data');

async function apiFetch() {
  try {
    const response = await fetch(url); // Fetch the data
    const data = await response.json(); // Convert to JSON
    // console.log(data); // Display to console for testing
    displayWeatherData(data);
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

function returnCurrentWeatherHtml(data) {
    const weatherData = data.list[0];
    let weatherHtml = "";
    weatherHtml += `${Math.round(weatherData.main.temp)}°F<br>`;
    weatherHtml += `${toTitleCase(weatherData.weather[0].description)}<br>`;
    weatherHtml += `Humidity: ${weatherData.main.humidity}%<br>`;
    weatherHtml += "Sunrise: ";
    weatherHtml += new Date(data.city.sunrise * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    weatherHtml += "<br>Sunset: ";
    weatherHtml += new Date(data.city.sunset * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return weatherHtml;
}

function returnWeatherForecastHtml(data) {
    const forecastByDate = {};
    // Group entries by date
    data.list.forEach(entry => {
        const date = entry.dt_txt.split(' ')[0];
        if (!forecastByDate[date]) {
            forecastByDate[date] = [];
        }
        forecastByDate[date].push(entry);
    });
    const dates = Object.keys(forecastByDate).sort().slice(0, 3);
    let forecastHtml = "";
    dates.forEach(date => {
        const entries = forecastByDate[date];
        const temps = entries.map(e => e.main);
        const high = Math.round(Math.max(...temps.map(t => t.temp_max)));
        const low = Math.round(Math.min(...temps.map(t => t.temp_min)));
        // Use the helper function to get label for each date
        const label = getDayLabel(date);
        forecastHtml += "<p>";
        forecastHtml += `<b>${label}</b><br>`;
        forecastHtml += `High: ${high}°F<br>`;
        forecastHtml += `Low: ${low}°F<br>`;
        forecastHtml += "</p>";
    });
    return forecastHtml;
}

function getDayLabel(dateStr) {
    const todayDate = new Date().toISOString().split('T')[0];
    if (dateStr === todayDate) {
        return "Today:";
    }
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString(undefined, { weekday: 'long' }) + ":";
}

function displayWeatherData(data) {
    currentWeatherData.innerHTML = returnCurrentWeatherHtml(data);
    weatherForcastData.innerHTML = returnWeatherForecastHtml(data);
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
    weatherIcon.alt = data.list[0].weather[0].main;
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

apiFetch();