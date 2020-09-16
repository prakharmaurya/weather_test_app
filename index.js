const divHtml = document.getElementById("div");
const data = ["temp", "pm25", "o3", "humidity", "wind_direction", "wind_gust"];
const icons = [
  "wb_sunny",
  "settings",
  "wb_sunny",
  "wb_sunny",
  "wb_sunny",
  "wb_sunny",
];

const htmlPrinter = (res) => {
  console.log(res.data);

  for (let i = 0; i < data.length; i++) {
    const node = document.createElement("p");
    const icon = document.createElement("i");
    const iconNode = document.createTextNode(icons[i]);
    const textNode = document.createTextNode(
      `${data[i]} : ${res.data[0][data[i]].value} ${res.data[0][data[i]].units}`
    );
    node.appendChild(textNode);
    icon.appendChild(iconNode);
    icon.classList.add("material-icons");
    divHtml.appendChild(icon);
    divHtml.appendChild(node);
  }
};

const getLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log(res.coords.latitude, res.coords.longitude);
      rqurst(res.coords.latitude, res.coords.longitude);
    },
    () => {}
  );
};

const rqurst = (lat, lon) => {
  const r = axios(
    `https://api.climacell.co/v3/weather/nowcast?apikey=aZLoqsu6V8dVLc5iG86QhX1qLpgbGabc&unit_system=si&timestep=5&start_time=now&lat=${lat}&lon=${lon}&fields=temp,feels_like,dewpoint,humidity,wind_speed,wind_direction,wind_gust,baro_pressure,precipitation,precipitation_type,sunrise,sunset,visibility,pm25,o3,no2,co`
  );
  r.then(htmlPrinter);
};

getLocation();
