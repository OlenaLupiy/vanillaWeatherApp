function formatTime(timestamp){
let date = new Date(timestamp);
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDay()];
let hour = date.getHours();
if (hour<10){
    hour = `0${hour}`
};
let minutes = date.getMinutes();
if (minutes < 10){
    minutes = `0${minutes}`
};
return `${day} ${hour}:${minutes}`
}

function displayWeather(response){
    let temperatureItem = document.querySelector("#temperature");
    let cityItem = document.querySelector("#city");
    let descriptionItem = document.querySelector("#description");
    let humidityItem = document.querySelector("#humidity");
    let windItem = document.querySelector("#wind");
    let dateItem = document.querySelector("#date");
    let iconItem = document.querySelector("#icon");

    temperatureItem.innerHTML = Math.round(response.data.temperature.current);
    cityItem.innerHTML = response.data.city;
    descriptionItem.innerHTML = response.data.condition.description;
    humidityItem.innerHTML = response.data.temperature.humidity;
    windItem.innerHTML = Math.round(response.data.wind.speed);
    iconItem.setAttribute(
      "src",
      `${response.data.condition.icon_url}`
    );
    iconItem.setAttribute("alt", response.data.condition.description);
    dateItem.innerHTML = formatTime(response.data.time *1000);

}
let city = "Deli"
let apiKey = "bfot5b9073814ac4cad9fb1fee3aac2c";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
