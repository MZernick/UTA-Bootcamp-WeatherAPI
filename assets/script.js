var citySearchBtn = document.querySelector("#search-button");
var cardSection = document.querySelector("#card-section");
var weatherCard = document.querySelector("#weather-container");
var userInput = document.querySelector("#search-input");
var cityTitle= document.querySelector("#city-title");
var displayTemp = document.querySelector("#current-temperature");
var displayIcon = document.querySelector("#temp-icon");
var displayHumidity = document.querySelector("#current-humidity");
var displayWind = document.querySelector("#current-wind-speed");
var displayFeelsLike = document.querySelector("#current-feelslike");
var weatherResults = document.querySelector("#weather-container");
var lat ;
var lon ;
var apiKey = '21f67d5f56f622faa47928d41f0dfa44';

var todayIs = dayjs();
$('#currentDay').text(todayIs.format('MMM D, YYYY'));

citySearchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    weatherForecast();
    storePreviousSearch();
    cityTitle.textContent = userInput.value
});

// function currentForecast(){
//     fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + "&lon=" + lon + "&appid=" + apiKey + '&units=imperial')
//     .then((response) => response.json())
//     .then((response) => {
//         console.log(response);
//     })
// }

function weatherForecast(){
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + userInput.value + '&limit=5&appid=' + apiKey)
    .then((response) => response.json())
    .then((response) => {
        //console.log(response[0].lat);
    var lat = response[0].lat;
    var lon = response[0].lon;

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + "&lon=" + lon + "&appid=" + apiKey + '&units=imperial')
    .then((response) => response.json())
    .then((response) => {
        console.log(response.main.temp);
                //Today
        document.getElementById("current-icon").src = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        document.getElementById("current-temp").textContent = "Temperature(\u00B0 F): " +  response.main.temp;
        document.getElementById("current-humidity").textContent = "Humidity: " + response.main.humidity;
        document.getElementById("current-wind-speed").textContent = "Wind Speed: " + response.wind.speed;
    })

    var yourCityAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + '&units=imperial';
    fetch(yourCityAPI)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.list[7].dt_txt);
        localStorage.setItem('city', response.city.name);

        // displayIcon.src = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";//not working
        // displayTemp.textContent = "Temperature(°F): " + response.list[0].main.temp;
        // displayHumidity.textContent = "Humidity: " + response.list[0].main.humidity;
        // displayWind.textContent = "Wind Speed: " + response.list[0].wind.speed;
        //day1
        document.getElementById("day1-icon").src = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png";
        document.getElementById("day1-date").textContent = response.list[0].dt_txt.substring(0,11);
        document.getElementById("day1-temp").textContent = "Temperature(\u00B0 F): " +  response.list[0].main.temp;
        document.getElementById("day1-humidity").textContent = "Humidity: " + response.list[0].main.humidity;
        document.getElementById("day1-wind-speed").textContent = "Wind Speed: " + response.list[0].wind.speed;
        //day2
        document.getElementById("day2-icon").src = "http://openweathermap.org/img/wn/" + response.list[7].weather[0].icon + "@2x.png";
        document.getElementById("day2-date").textContent = response.list[7].dt_txt.substring(0,11);
        document.getElementById("day2-temp").textContent = "Temperature(\u00B0 F): " +  response.list[7].main.temp;
        document.getElementById("day2-humidity").textContent = "Humidity: " + response.list[7].main.humidity;
        document.getElementById("day2-wind-speed").textContent = "Wind Speed: " + response.list[7].wind.speed;
        //day3
        document.getElementById("day3-icon").src = "http://openweathermap.org/img/wn/" + response.list[14].weather[0].icon + "@2x.png";
        document.getElementById("day3-date").textContent = response.list[14].dt_txt.substring(0,11);
        document.getElementById("day3-temp").textContent = "Temperature(\u00B0 F): " +  response.list[14].main.temp;
        document.getElementById("day3-humidity").textContent = "Humidity: " + response.list[14].main.humidity;
        document.getElementById("day3-wind-speed").textContent = "Wind Speed: " + response.list[14].wind.speed;
        //day4
        document.getElementById("day4-icon").src = "http://openweathermap.org/img/wn/" + response.list[22].weather[0].icon + "@2x.png";
        document.getElementById("day4-date").textContent = response.list[22].dt_txt.substring(0,11);
        document.getElementById("day4-temp").textContent = "Temperature(\u00B0 F): " +  response.list[22].main.temp;
        document.getElementById("day4-humidity").textContent = "Humidity: " + response.list[22].main.humidity;
        document.getElementById("day4-wind-speed").textContent = "Wind Speed: " + response.list[22].wind.speed;
        //day5
        document.getElementById("day5-icon").src = "http://openweathermap.org/img/wn/" + response.list[30].weather[0].icon + "@2x.png";
        document.getElementById("day5-date").textContent = response.list[30].dt_txt.substring(0,11);
        document.getElementById("day5-temp").textContent = "Temperature(\u00B0 F): " +  response.list[30].main.temp;
        document.getElementById("day5-humidity").textContent = "Humidity: " + response.list[30].main.humidity;
        document.getElementById("day5-wind-speed").textContent = "Wind Speed: " + response.list[30].wind.speed;
    })})
      .catch((err) => console.error(err));
};

function storePreviousSearch() {
    var logToPastSearches = {itemSearched: userInput.value};
    var searchHistoryCard = JSON.parse(localStorage.getItem("previousSearch"));
    if (!Array.isArray(searchHistoryCard)) {
      searchHistoryCard = [];
    }
    if (searchHistoryCard.length >= 4) {
      searchHistoryCard = searchHistoryCard.slice(0, 4);
    }
    searchHistoryCard.unshift(logToPastSearches);
    localStorage.setItem("previousSearch", JSON.stringify(searchHistoryCard));
    rebuildHistory();
    console.log(logToPastSearches);
  }
  
  // append ingredient search history to page as buttons
  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  
  function rebuildHistory() {
    var searchHistoryDiv = document.getElementById("search-history-container");
    var storedSearches = JSON.parse(localStorage.getItem("previousSearch"));
    removeAllChildNodes(searchHistoryDiv);
    for (let i = 0; i < storedSearches.length; i++) {
      let newChild = document.createElement("button");
      newChild.setAttribute("content", "test content");
      newChild.setAttribute("class", "button is-fullwidth");
      newChild.textContent = storedSearches[i].itemSearched;
      searchHistoryDiv.appendChild(newChild);
  
      newChild.addEventListener("click", function () {
        console.log (newChild.innerHTML);
        if ((newChild.innerHTML === "Bourbon")) {
          displayBourbonDrinks();
        } else if ((newChild.innerHTML === "Vodka")) {
          displayVodkaDrinks();
        } else if ((newChild.innerHTML === "Rum")) {
          displayRumDrinks();
        }
      });
    }
  }