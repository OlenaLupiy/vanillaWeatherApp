function displayWeather(response){
    let temperatureItem = document.querySelector("#temperature");
    let cityItem = document.querySelector("#city");
    let descriptionItem = document.querySelector("#description");
    let humidityItem = document.querySelector("#humidity");
    let windItem = document.querySelector("#wind");

    temperatureItem.innerHTML = Math.round(response.data.temperature.current);
    cityItem.innerHTML = response.data.city;
    descriptionItem.innerHTML = response.data.condition.description;
    humidityItem.innerHTML = response.data.temperature.humidity;
    windItem.innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "bfot5b9073814ac4cad9fb1fee3aac2c";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
