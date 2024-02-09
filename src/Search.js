import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import SearchWeatherTemperature from "./SearchWeatherTemperature";
import Forecast from "./Forecast";

export default function Search(props) {
  let [weatherData, setWeatherData] = useState({ loaded: false });
  let [query, setQuery] = useState(props.defaultCity);

  function showTemp(response) {
    setWeatherData({
      loaded: true,
      city: response.data.name,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      timeData: new Date(response.data.dt * 1000),
      coords: response.data.coord,
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleSearch(event) {
    event.preventDefault();
    getWeather();
  }

  function updateQuery(event) {
    setQuery(event.target.value);
  }

  function getWeather() {
    let apiKey = `3f6be1c407b0d9d1933561808db358ba`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showTemp);
  }

  let form = (
    <form onSubmit={handleSearch}>
      <div className="row">
        <div className="col-9">
          <input
            type="search"
            placeholder="Type a city.."
            className="form-control"
            autoComplete="off"
            onChange={updateQuery}
          />
        </div>
        <div className="col-3">
          <input
            type="submit"
            className="btn btn-primary w-100"
            value="Search"
          />
        </div>
      </div>
    </form>
  );

  if (weatherData.loaded) {
    return (
      <div>
        {form}
        <h2 className="text-start cityName">{weatherData.city}</h2>
        <div className="time">
          <ul>
            <li>
              <FormattedDate date={weatherData.timeData} />
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-3">
            <img
              className="img-fluid"
              src={weatherData.iconUrl}
              alt="weather"
            />
          </div>
          <div className="col-5">
            <div className="tempDisplay mt-3">
              <SearchWeatherTemperature
                temp={Math.round(weatherData.temperature)}
              />
            </div>
          </div>
          <div className="col-4 mt-4">
            <div>Humidity: {weatherData.humidity}%</div>
            <div>Wind: {weatherData.wind} km/h </div>
          </div>
        </div>
        <div>
          <Forecast coordinates={weatherData.coords} />
        </div>
      </div>
    );
  } else {
    getWeather();
    return "Loading...";
  }
}
