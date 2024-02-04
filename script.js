
const apiKey = "0a3f3548e96dbef0ee3ac5e08171b2b3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkWeather(city) {
const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

if (response.status == 404) {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
} else {
  try {
      var data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      const weatherIcon = document.querySelector(".weather-icon");
      function changeWeatherIcon(iconPath) {
          weatherIcon.src = iconPath;
      }
      if (data.weather[0].main == "Clouds") {
          changeWeatherIcon("images/clouds.png");
      } else if (data.weather[0].main == "Clear") {
          changeWeatherIcon("images/clear.png");
      } else if (data.weather[0].main == "Rain") {
          changeWeatherIcon("images/rain.png");
      } else if (data.weather[0].main == "Drizzle") {
          changeWeatherIcon("images/drizzle.png");
      } else if (data.weather[0].main == "Mist") {
          changeWeatherIcon("images/mist.png");
      } else {
          console.log("Weather main not matched:", data.weather[0].main);
      }
  } catch (error) {
      console.error("Erro ao processar a resposta da API:", error);
  }
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}
}

searchBtn.addEventListener("click", () => {
checkWeather(searchBox.value);
});
