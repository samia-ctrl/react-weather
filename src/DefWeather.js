import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DefWeather() {
  let [defCity, setDefCity] = useState("");
  let [defTemperature, setDefTemperature] = useState("");
  let [defHumidity, setDefHumidity] = useState("");
  let [defWind, setDefWind] = useState("");

  useEffect(() => {
    function fetchDefaultWeather() {
      let apiKey = `535cacbb3f8a0df0aeb4790235b9541f`;
      let defUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;

      axios
        .get(defUrl)
        .then(function (response) {
          showDefTemp(response);
        })
        .catch(function (error) {
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
  return (
    <div>
      <h2 className="text-start cityName">{defCity}</h2>
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
