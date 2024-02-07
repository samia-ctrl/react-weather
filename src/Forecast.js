import React, { useState } from "react";
import "./Forecast.css";
import axios from "axios";

export default function Forecast(props) {
  let [forecast, setForecast] = useState("");

  function handleResponse(response) {
    setForecast(response.data.daily);
  }

  if (props.coordinates === undefined) {
    return null;
  }
  let longitude = props.coordinates?.lon;
  let latitude = props.coordinates?.lat;
  let apiKey = `535cacbb3f8a0df0aeb4790235b9541f`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(handleResponse);
  return (
    <div className="Forecast">
      <div className="row">
        <div className="col">
          <div className="forecast-day">Wed</div>
          <img
            className="img-fluid forecast-icon "
            src={props.icon}
            alt="forecast"
          />
          <div className="forecast-max-temp">
            {forecast[0].temp.max}°{" "}
            <span className="forecast-min-temp">4°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
