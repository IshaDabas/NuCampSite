async function fetchWeather() {
  const weatherBox = document.getElementById("weatherData");
  try {
    const city = "Raleigh";
    const apiKey = process.env.API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) throw new Error("Weather data not available");

    const data = await response.json();
    const temp = data.main.temp;
    const weather = data.weather[0].main;
    const icon = data.weather[0].icon;
    const cityName = data.name;

    weatherBox.innerHTML = `
                <h2 style="margin-block:0px !important; font-size: 26px;">${cityName}</h2>
                <img style="height: 60px;" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${weather}"/> ${weather}, ${Math.round(
      temp
    )}°C
            `;
  } catch (error) {
    weatherBox.innerHTML = `<p class="text-danger">Failed to load weather data.</p>`;
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchWeather(); // Optionally allow dynamic input later
});
