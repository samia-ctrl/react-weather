import React, { useState, useEffect } from "react";
import axios from "axios";
import DefWeatherTemperature from "./DefWeatherTemperature";
import Forecast from "./Forecast";
export default function DefWeather() {
  let [defWeatherData, setDefWeatherData] = useState("");

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
    setDefWeatherData({
      defTemperature: Math.round(response.data.main.temp),
      defCity: response.data.name,
      defHumidity: response.data.main.humidity,
      defWind: response.data.wind.speed,
      defIconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      latCoord: response.data.coord.lat,
      lonCoord: response.data.coord.lon,
    });
    console.log(response.data.coord.lat);
  }
  return (
    <div>
      <h2 className="text-start cityName">{defWeatherData.defCity}</h2>
      <div className="row">
        <div className="col-3 mt-0">
          <img src={defWeatherData.defIconUrl} />
        </div>
        <div className="col-5">
          <div className="tempDisplay mt-3">
            <DefWeatherTemperature temp={defWeatherData.defTemperature} />
          </div>
        </div>
        <div className="col-4 mt-4">
          <div>Humidity: {defWeatherData.defHumidity}%</div>
          <div>Wind: {defWeatherData.defWind} km/h </div>
        </div>
      </div>

      <Forecast
        coordinates={defWeatherData.latCoord}
        lonCoordinates={defWeatherData.lonCoord}
        icon={defWeatherData.defIconUrl}
      />
    </div>
  );
}
