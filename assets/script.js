var citiesButtons = document.querySelector(".cities-btns");
var searchButton = document.querySelector("#form-btn");
var cityValue = document.getElementById("city");
var apiKey = "&appid=8124ce9bf1c6633134aa9ec56ba0af6a";
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
var index = document.querySelector('.index');
var searchCity = document.querySelector('.city-name')
var cityDate = document.querySelector(".city-date")
var defaultCity = "Houston";
var descpt = document.querySelector('.desc');

let currentDate = new Date();

//current time in readable format
let now = currentDate.toDateString();



searchButton.addEventListener('click', function(event) {
    var city = document.getElementById("city").value;
    console.log("you have clicked")
    console.log(city);
    event.preventDefault();
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + apiKey + "&units=imperial")
    .then(response => response.json())
    .then(data => {
        console.log(data);

        var cityName = data['name'];
        searchCity.innerHTML = cityName;

       
        cityDate.innerHTML = now;

        var cityTemp = data['main']['temp'];
        temp.innerHTML = "Temp: " + cityTemp + "F";

        var cityWind = data['wind']['speed'];
        wind.innerHTML = "Wind " + cityWind + " MPH";

        var cityhumidity = data['main']['humidity'];
        humidity.innerHTML = "Humidity " + cityhumidity + "%";

        var cityDesc = data['weather']['0']['description']
        console.log(cityDesc);
        descpt.innerHTML = cityDesc;
        
    })
    
    
    
});




var forcast = function(city) {
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&cnt=6&appid=" + apiKey;

    fetch(forcast).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                displayForcast(data.list);
            });
        } else {
            alert("error:" + response.statusText);
        }
    })

    .catch(function(error) {
        alert("Could not connect to Open Weather");
    })
}
var displayForcast = function (list) {

    for (var i = 0; i <= 4; i++) {
        //display date
        document.querySelector(`#date-${i}`).textContent = moment().add(`${i}`, "days").format("L");
        //display temp
        document.querySelector(`#temp-${i}`).textContent = list[i].main.temp + " °F";
        //display humidity
        document.querySelector(`#humidity-${i}`).textContent = list[i].main.humidity + "%";
        //display icon
        document.querySelector(`#icon-${i}`).setAttribute ("src", "https://openweathermap.org/img/wn/" + list[i].weather[0].icon + "@2x.png")
    }
}