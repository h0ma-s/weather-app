function showCurrentTemperature(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentTemperatureMax = document.querySelector("#today-high-temp");
  currentTemperatureMax.innerHTML = Math.round(response.data.main.temp_max);
  let currentTemperatureMin = document.querySelector("#today-low-temp");
  currentTemperatureMin.innerHTML = Math.round(response.data.main.temp_min);
  let weatherDescription = document.querySelector(".description");
  weatherDescription.innerHTML = response.data.weather[0].main;
  let h1 = document.querySelector("h1");

  h1.innerHTML = response.data.name;
  let dateAndTime = document.querySelector(".date-and-time");
  dateAndTime.innerHTML = formatTime(response.data.dt * 1000);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  console.log(city.value);
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

let city = "london";
getWeather(city);
let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSearch);
