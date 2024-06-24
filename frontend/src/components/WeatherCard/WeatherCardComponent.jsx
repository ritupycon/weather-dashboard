import React from 'react';


const WeatherCardComponent = ({ title, weatherData }) => {
  console.log("aaaaaa", title, weatherData)

  if (!weatherData) {
    return null;
  }
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>Temperature: {weatherData.main ? weatherData.main.temp: weatherData.temp} °C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
      <p>Humidity: {weatherData.main ? weatherData.main.humidity: weatherData.humidity} %</p>
      <p>Wind Speed: {weatherData.wind ? weatherData.wind.speed: weatherData.wind_speed} m/s</p>
    </div>
  );
};

export default WeatherCardComponent;
