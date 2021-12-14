function showCurrentTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentTemperatureMax = document.querySelector("#today-high-temp");
  currentTemperatureMax.innerHTML = Math.round(response.data.main.temp_max);
  let currentTemperatureMin = document.querySelector("#today-low-temp");
  currentTemperatureMin.innerHTML = Math.round(response.data.main.temp_min);
  let weatherDescription = document.querySelector(".description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let h1 = document.querySelector("h1");

  h1.innerHTML = response.data.name;
  let dateAndTime = document.querySelector(".date-and-time");
  dateAndTime.innerHTML = formatTime(response.data.dt * 1000);

  celciusCurrentTemp = response.data.main.temp;
  celciusTodaysMaxTemp = response.data.main.temp_max;
  celciusTodaysMinTemp = response.data.main.temp_min;

  let currentIcon = document.querySelector("#current-weather-icon");
  currentIcon.setAttribute(
    "src",
    `media/icons/${response.data.weather[0].icon}.svg`
  );
  currentIcon.setAttribute("alt", `${response.data.weather[0].main}`);
}

function handleSearch(event) {
  event.preventDefault();
  let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
  fahrenheitLinkElement.classList.remove("active");
  let celciusLinkElement = document.querySelector("#celcius-link");
  celciusLinkElement.classList.add("active");
  let unitsElements = document.querySelectorAll(".today-temp-unit");
  unitsElements.forEach((element) => (element.innerHTML = "°C"));
  let city = document.querySelector("#search-city");
  getWeather(city.value);
}
function getWeather(city) {
  let apiKey = "e595356bb77e874bab1cb87dc84b6d45";
  let unit = "metric";
  let endPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${endPoint}?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

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
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDay = days[date.getDay()];
  let currentTime = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let currentMonth = months[date.getMonth()];
  let currentDateofMonth = date.getDate();
  return `${currentDay} ${currentTime} <br/> ${currentMonth}, ${currentDateofMonth}`;
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitCurrentTemp = Math.round((celciusCurrentTemp * 9) / 5 + 32);
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = fahrenheitCurrentTemp;

  let fahrenheitTodaysMaxTemp = Math.round((celciusTodaysMaxTemp * 9) / 5 + 32);
  let todaysMaxTempElement = document.querySelector("#today-high-temp");
  todaysMaxTempElement.innerHTML = fahrenheitTodaysMaxTemp;

  let fahrenheitTodaysMinTemp = Math.round((celciusTodaysMinTemp * 9) / 5 + 32);
  let todaysMinTempElement = document.querySelector("#today-low-temp");
  todaysMinTempElement.innerHTML = fahrenheitTodaysMinTemp;

  let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
  fahrenheitLinkElement.classList.add("active");
  let celciusLinkElement = document.querySelector("#celcius-link");
  celciusLinkElement.classList.remove("active");

  let unitsElements = document.querySelectorAll(".today-temp-unit");
  unitsElements.forEach((element) => (element.innerHTML = "°F"));
}

function convertToCelcius(event) {
  event.preventDefault();
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );
  currentTemperatureElement.innerHTML = Math.round(celciusCurrentTemp);
  let todaysMaxTempElement = document.querySelector("#today-high-temp");
  todaysMaxTempElement.innerHTML = Math.round(celciusTodaysMaxTemp);
  let todaysMinTempElement = document.querySelector("#today-low-temp");
  todaysMinTempElement.innerHTML = Math.round(celciusTodaysMinTemp);

  let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
  fahrenheitLinkElement.classList.remove("active");
  let celciusLinkElement = document.querySelector("#celcius-link");
  celciusLinkElement.classList.add("active");

  let unitsElements = document.querySelectorAll(".today-temp-unit");
  unitsElements.forEach((element) => (element.innerHTML = "°C"));
}

let celciusCurrentTemp = null;
let celciusTodaysMaxTemp = null;
let celciusTodaysMinTemp = null;

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSearch);

let fahrenheitLinkElement = document.querySelector("#fahrenheit-link");
fahrenheitLinkElement.addEventListener("click", convertToFahrenheit);

let celciusLinkElement = document.querySelector("#celcius-link");
celciusLinkElement.addEventListener("click", convertToCelcius);

getWeather("london");
