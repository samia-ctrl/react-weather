import React from "react";
import "./Forecast.css";
import axios from "axios";

export default function Forecast(props) {
  function handleResponse(response) {
    console.log(response.data);
  }
  console.log(props.coordinates)
  let apiKey = `535cacbb3f8a0df0aeb4790235b9541f`;
  let longitude = props.lonCoordinates;
  let latitude = props.coordinates;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&cnt=6&appid=${apiKey}`;
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
          <img className="img-fluid forecast-icon " src={props.icon} />
          <div className="forecast-max-temp">
            14° <span className="forecast-min-temp">4°</span>
          </div>
        </div>
      </div>
    </div>
  );
}
