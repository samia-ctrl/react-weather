import React, { useState, useEffect } from "react";
import axios from "axios";

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
    });
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
            {defWeatherData.defTemperature}
            <span className="units">
              <a href="/">°C</a> | <a href="/">°F</a>
            </span>
          </div>
        </div>
        <div className="col-4 mt-4">
          <div>Humidity: {defWeatherData.defHumidity}%</div>
          <div>Wind: {defWeatherData.defWind} km/h </div>
        </div>
      </div>

      <div className="forecast">
        <div className="row">
          <div className="col-2">
            Wed
            <img className="img-fluid " src={defWeatherData.defIconUrl} />
            <div>4°C</div>
          </div>
          <div className="col-2">
            Thurs <img className="img-fluid " src={defWeatherData.defIconUrl} />
            <div>4°C</div>
          </div>
          <div className="col-2">
            Fri <img className="img-fluid " src={defWeatherData.defIconUrl} />
            <div>4°C</div>
          </div>
          <div className="col-2">
            Sat <img className="img-fluid " src={defWeatherData.defIconUrl} />
            <div>4°C</div>
          </div>
          <div className="col-2">
            Sun <img className="img-fluid " src={defWeatherData.defIconUrl} />
            <div>4°C</div>
          </div>
          <div className="col-2">
            Mon <img className="img-fluid " src={defWeatherData.defIconUrl} />
            <div>4°C</div>
          </div>
        </div>
      </div>
    </div>
  );
}
