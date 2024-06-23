import React from 'react';


const WeatherCardComponent = ({ title, weatherData }) => {
  if (!weatherData) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>Temperature: {weatherData.main.temp} °C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main.humidity} %</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </div>
  );
};

export default WeatherCardComponent;
