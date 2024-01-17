import React, { useState, useEffect } from "react";
import axios from "axios";
export default function Search() {
  let [query, setQuery] = useState("");
  let [temperature, setTemperature] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");
  let [loaded, setLoaded] = useState(false);
  let [defCity, setDefCity] = useState("");
  let [defTemperature, setDefTemperature] = useState("");
  let [defHumidity, setDefHumidity] = useState("");
  let [defWind, setDefWind] = useState("");

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

  useEffect(() => {
    function fetchDefaultWeather() {
      let apiKey = `535cacbb3f8a0df0aeb4790235b9541f`;
      let defUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;

      axios
        .get(defUrl)
        .then((response) => {
          showDefTemp(response);
        })
        .catch((error) => {
          console.error("Error fetching default weather data:", error);
        });
    }

    fetchDefaultWeather();
  }, []);

  function showDefTemp(response) {
    setDefTemperature(Math.round(response.data.main.temp));
    setDefCity(response.data.name);
    setDefHumidity(response.data.main.humidity);
    setDefWind(response.data.wind.speed);
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

  let timeData = {
    date: "Tuesday 19 December",
    time: "10:00",
  };
  if (loaded) {
    return (
      <div>
        {form}
        <h2 className="text-start cityName">{query}</h2>
        <div className="time">
          <ul>
            <li>
              Last updated: {timeData.date} at {timeData.time}
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col">
            <div className="tempDisplay">
              {Math.round(temperature)}
              <span className="units">
                <a href="/">°C</a> | <a href="/">°F</a>
              </span>
            </div>
          </div>
          <div className="col">
            <div>Humidity: {humidity}%</div>
            <div>Wind: {wind} km/h </div>
          </div>
        </div>
        <div className="forecast">
          <div className="row">
            <div className="col-2">
              Wed
              <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Thurs <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Fri <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Sat <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Sun <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Mon <div>img</div>
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
        <h2 className="text-start cityName">{defCity}</h2>
        <div className="time">
          <ul>
            <li>
              Last updated: {timeData.date} at {timeData.time}
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col">
            <div className="tempDisplay">
              {defTemperature}
              <span className="units">
                <a href="/">°C</a> | <a href="/">°F</a>
              </span>
            </div>
          </div>
          <div className="col">
            <div>Humidity: {defHumidity}%</div>
            <div>Wind: {defWind} km/h </div>
          </div>
        </div>

        <div className="forecast">
          <div className="row">
            <div className="col-2">
              Wed
              <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Thurs <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Fri <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Sat <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Sun <div>img</div>
              <div>4°C</div>
            </div>
            <div className="col-2">
              Mon <div>img</div>
              <div>4°C</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
