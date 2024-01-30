import React from "react";
import "./Forecast.css";
import axios from "axios";

export default function Forecast(props) {
  function handleResponse(response) {
    console.log(response.data);
  }
  let apiKey = `15b6ba0523386a8a73b38b2440a74dea`;
  let longitude = props.coordinates?.lon;
  let latitude = props.coordinates?.lat;

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&limit=5&cnt=6&appid=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(handleResponse)
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
    
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
            14° <span className="forecast-min-temp">4°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
