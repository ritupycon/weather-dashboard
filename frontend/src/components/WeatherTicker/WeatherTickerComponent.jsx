import React from 'react';


const WeatherTickerComponent = ({ tickerData }) => {
  return (
    <div className="bg-white rounded shadow">
      {tickerData.map((data, index) => (
        <div key={index} className="mb-2">
          <p className="font-bold">{data.name}</p>
          <p>Temperature: {data.main.temp} °C</p>
          <p>Weather: {data.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherTickerComponent;
