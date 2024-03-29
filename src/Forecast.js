import React, { useEffect, useState } from "react";
import "./Forecast.css";
import axios from "axios";
import ForecastDay from "./ForecastDay";

export default function Forecast(props) {
  let [forecast, setForecast] = useState("");
  let [loaded, setLoaded] = useState(false);
  function handleResponse(response) {
    setForecast(response.data.daily);
    setLoaded(true);
  }

  useEffect(() => {
    setLoaded(false);
  }, [props.coordinates]);

  if (props.coordinates === undefined) {
    return null;
  }

  if (!loaded) {
    let longitude = props.coordinates?.lon;
    let latitude = props.coordinates?.lat;
    let apiKey = `3f6be1c407b0d9d1933561808db358ba`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
    return null;
  } else {
    return (
      <div className="Forecast">
        <div className="row">
          {forecast.map(function (dailyForecast, index) {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <ForecastDay
                    data={dailyForecast}
                    icon={`https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`}
                  />
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    );
  }
}
