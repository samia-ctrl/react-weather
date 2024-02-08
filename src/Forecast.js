import React, { useState } from "react";
import "./Forecast.css";
import axios from "axios";
import ForecastDay from "./ForecastDay";

export default function Forecast(props) {
  let [forecast, setForecast] = useState("");

  function handleResponse(response) {
    setForecast(response.data.daily);
  }

  if (props.coordinates === undefined) {
    return null;
  }

  if (!forecast) {
    let longitude = props.coordinates?.lon;
    let latitude = props.coordinates?.lat;
    let apiKey = `99b8f9330a1bfba3a85e523fd3c2e528`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return null;
  } else {
    return (
      <div className="Forecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 5 ) {
            return (
              <div className="col" key= {index}>
                <ForecastDay
                  data={dailyForecast}
                  icon={`https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`}
                />
              </div>
            );}
          })}
          
        </div>
      </div>
    );
  }
}
