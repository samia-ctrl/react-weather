import React, { useState } from "react";
import axios from "axios";
export default function Search() {
  let [query, setQuery] = useState("");
  let [temperature, setTemperature] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [loaded, setLoaded] = useState(false);

  function showTemp(response) {
    setLoaded(true);
    setTemperature(response.data.main.temp);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
  }

  function handleSearch(event) {
    event.preventDefault();
    let apiKey = `535cacbb3f8a0df0aeb4790235b9541f`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemp);
  }

  function updateQuery(event) {
    setQuery(event.target.value);
  }
  let form = (
    <form onSubmit={handleSearch}>
      <input type="search" onChange={updateQuery} />
      <input type="submit" value="search" />
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <div>Temperature: {temperature}°C </div>
        <div>Humidity: {humidity}%</div>
        <div>Wind: {wind} km/h </div>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}
