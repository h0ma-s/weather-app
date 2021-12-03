function showCurrentTemperature(response) {
  console.log(response);
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
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city");
  let apiKey = "e595356bb77e874bab1cb87dc84b6d45";
  let unit = "metric";
  let endPoint = `https://api.openweathermap.org/data/2.5/weather`;
  let apiUrl = `${endPoint}?q=${city.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentTemperature);
}

function formatTime(time) {
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
  let currentDay = days[time.getDay()];
  let currentTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  let currentMonth = months[time.getMonth()];
  let currentDateofMonth = time.getDate();
  return `${currentDay} ${currentTime} <br/> ${currentMonth}, ${currentDateofMonth}`;
}
let currentDate = new Date();
let dateAndTime = document.querySelector(".date-and-time");
dateAndTime.innerHTML = formatTime(currentDate);

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", handleSearch);
