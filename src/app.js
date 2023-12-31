function formatTime(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}

function formatForecastDate(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[forecastDate.getDay()];
  return day;
}
function getForecast(cordinates) {
  let apiKey = "bfot5b9073814ac4cad9fb1fee3aac2c";
  let apiUrl = ` https://api.shecodes.io/weather/v1/forecast?lon=${cordinates.longitude}&lat=${cordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperatureItem = document.querySelector("#temperature");
  let cityItem = document.querySelector("#city");
  let descriptionItem = document.querySelector("#description");
  let humidityItem = document.querySelector("#humidity");
  let windItem = document.querySelector("#wind");
  let dateItem = document.querySelector("#date");
  let iconItem = document.querySelector("#icon");

  celsiusTemperature = Math.round(response.data.temperature.current);

  temperatureItem.innerHTML = Math.round(celsiusTemperature);
  cityItem.innerHTML = response.data.city;
  descriptionItem.innerHTML = response.data.condition.description;
  humidityItem.innerHTML = response.data.temperature.humidity;
  windItem.innerHTML = Math.round(response.data.wind.speed);
  iconItem.setAttribute("src", `${response.data.condition.icon_url}`);
  iconItem.setAttribute("alt", response.data.condition.description);
  dateItem.innerHTML = formatTime(response.data.time * 1000);

  getForecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "bfot5b9073814ac4cad9fb1fee3aac2c";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearchItem = document.querySelector("#city_search");
  search(citySearchItem.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

function displayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureItem = document.querySelector("#temperature");
  let tempFahrenheit = (celsiusTemperature * 9) / 5 + 32;
  temperatureItem.innerHTML = Math.round(tempFahrenheit);
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastItem = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                  <div class="forecast_weather_date">${formatForecastDate(
                    forecastDay.time
                  )}</div>
                  <img src=${forecastDay.condition.icon_url} alt="" width="42/>
                  <div class="forecast_weather_temperature">
                    <span class="forecast_temp_max">${Math.round(
                      forecastDay.temperature.maximum
                    )}°C</span>
                    <span class="forecat_temp_min">${Math.round(
                      forecastDay.temperature.minimum
                    )}°C</span>
                  </div>
                
              
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastItem.innerHTML = forecastHTML;
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureItem = document.querySelector("#temperature");
  temperatureItem.innerHTML = celsiusTemperature;
}

let fahrenheitLink = document.querySelector("#fahrenheit_link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius_link");
celsiusLink.addEventListener("click", displayCelsius);

search("Kyiv");
