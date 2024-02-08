import React from "react";
import "./Forecast.css";

export default function ForecastDay(props) {
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
  return (
    <div>
      <div className="forecast-day">{day()}</div>
      <img
        className="img-fluid forecast-icon "
        src={props.icon}
        alt="forecast"
      />
      <div className="forecast-max-temp">
        {Math.round(props.data.temp.max)}°{" "}
        <span className="forecast-min-temp">
          {Math.round(props.data.temp.min)}°
        </span>
      </div>
    </div>
  );
}
