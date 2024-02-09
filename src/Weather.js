import React from "react";
import Search from "./Search";
import "./App.css";

export default function Weather() {
  return (
    <div className="Weather">
      <h2>React Weather App</h2>
      <Search defaultCity={"London"} />
    </div>
  );
}
