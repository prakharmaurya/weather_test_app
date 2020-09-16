"use strict";

var divHtml = document.getElementById("div");
var data = ["temp", "pm25", "o3", "humidity", "wind_direction", "wind_gust"];
var icons = [
  "wb_sunny",
  "settings",
  "wb_sunny",
  "wb_sunny",
  "wb_sunny",
  "wb_sunny",
];

var htmlPrinter = function htmlPrinter(res) {
  console.log(res.data);

  for (var i = 0; i < data.length; i++) {
    var node = document.createElement("p");
    var icon = document.createElement("i");
    var iconNode = document.createTextNode(icons[i]);
    var textNode = document.createTextNode(
      data[i] +
        " : " +
        res.data[0][data[i]].value +
        " " +
        res.data[0][data[i]].units
    );
    node.appendChild(textNode);
    icon.appendChild(iconNode);
    icon.classList.add("material-icons");
    divHtml.appendChild(icon);
    divHtml.appendChild(node);
  }
};

var getLocation = function getLocation() {
  navigator.geolocation.getCurrentPosition(
    function (res) {
      console.log(res.coords.latitude, res.coords.longitude);
      rqurst(res.coords.latitude, res.coords.longitude);
    },
    function () {}
  );
};

var rqurst = function rqurst(lat, lon) {
  var r = axios(
    "https://api.climacell.co/v3/weather/nowcast?apikey=aZLoqsu6V8dVLc5iG86QhX1qLpgbGabc&unit_system=si&timestep=5&start_time=now&lat=" +
      lat +
      "&lon=" +
      lon +
      "&fields=temp,feels_like,dewpoint,humidity,wind_speed,wind_direction,wind_gust,baro_pressure,precipitation,precipitation_type,sunrise,sunset,visibility,pm25,o3,no2,co"
  );
  r.then(htmlPrinter);
};

getLocation();
