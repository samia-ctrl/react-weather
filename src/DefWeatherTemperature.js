import React, { useState } from "react";

export default function DefWeatherTemperature(props) {
  const [defUnit, setDefUnit] = useState("celsius");

  function fahrenheit() {
    return (props.temp * 9) / 5 + 32;
  }

  function showCelsius(event) {
    event.preventDefault();
    setDefUnit("celsius");
  }
  function showFahrenheit(event) {
    event.preventDefault();
    setDefUnit("fahrenheit");
  }

  if (defUnit === "celsius") {
    return (
      <div className="DefWeatherTemperature">
        <span className="tempDisplay">{props.temp}</span>
        <span className="units">
          °C |{" "}
          <a href="/" onClick={showFahrenheit}>
            °F
          </a>
        </span>
      </div>
    );
  } else {
    return (
      <div className="SearchWeatherTemperature">
        <span className="tempDisplay">{Math.round(fahrenheit())}</span>
        <span className="units">
          <a href="/" onClick={showCelsius}>
            °C
          </a>{" "}
          | °F
        </span>
      </div>
    );
  }
}
