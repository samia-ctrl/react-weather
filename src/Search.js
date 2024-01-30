import React, { useState } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import DefWeather from "./DefWeather";
import SearchWeatherTemperature from "./SearchWeatherTemperature";

export default function Search() {
  let [weatherData, setWeatherData] = useState({ loaded: false });
  let [query, setQuery] = useState("");

  function showTemp(response) {
    setWeatherData({
      loaded: true,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      timeData: new Date(response.data.dt * 1000),
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
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
        <h2 className="text-start cityName">{query}</h2>
        <div className="time">
          <ul>
            <li>
              <FormattedDate date={weatherData.timeData} />
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col-3">
            <img className="img-fluid" src={weatherData.iconUrl} alt="weather" />
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
        <div className="forecast">
          <div className="row">
            <div className="col-2">
              Wed
              <img
                className="img-fluid "
                src={weatherData.iconUrl}
                alt="forecast-weather"
              />
              <div>4°C</div>
            </div>
            <div className="col-2">
              Thurs
              <img
                className="img-fluid "
                src={weatherData.iconUrl}
                alt="forecast-weather"
              />
              <div>4°C</div>
            </div>
            <div className="col-2">
              Fri
              <img
                className="img-fluid "
                src={weatherData.iconUrl}
                alt="forecast-weather"
              />
              <div>4°C</div>
            </div>
            <div className="col-2">
              Sat
              <img
                className="img-fluid "
                src={weatherData.iconUrl}
                alt="forecast-weather"
              />
              <div>4°C</div>
            </div>
            <div className="col-2">
              Sun
              <img
                className="img-fluid "
                src={weatherData.iconUrl}
                alt="forecast-weather"
              />
              <div>4°C</div>
            </div>
            <div className="col-2">
              Mon
              <img
                className="img-fluid "
                src={weatherData.iconUrl}
                alt="forecast-weather"
              />
              <div>4°C</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {form}
        <DefWeather />
      </div>
    );
  }
}
