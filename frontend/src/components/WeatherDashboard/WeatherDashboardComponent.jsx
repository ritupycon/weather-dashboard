import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CitySelectorComponent from '../CitySelector/CitySelectorComponent';
import WeatherCardComponent from '../WeatherCard/WeatherCardComponent';
import WeatherTickerComponent from '../WeatherTicker/WeatherTickerComponent';
import WeatherFormComponent from '../WeatherForm/WeatherFormComponent';


const cities = [
  { name: 'Mumbai', code: 'IN' },
  { name: 'Delhi', code: 'IN' },
  { name: 'Florida', code: 'US' }
];

const WeatherDashboardComponent = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [tickerCities, setTickerCities] = useState([cities[0], cities[1], cities[2]]);
  const [tickerData, setTickerData] = useState([]);

  const apiKey = 'edc7a3d8fadfef9ae914a5808905da6e'; // Replace with your OpenWeatherMap API key

  const fetchWeather = async (query) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?${query}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching the weather data:', error);
    }
  };

  const fetchForecast = async (query) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?${query}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching the forecast data:', error);
    }
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    fetchWeather(`q=${city.name},${city.code}`);
    fetchForecast(`q=${city.name},${city.code}`);
  };

  const fetchTickerData = async () => {
    const promises = tickerCities.map((city) =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.code}&appid=${apiKey}&units=metric`)
    );
    try {
      const results = await Promise.all(promises);
      setTickerData(results.map((res) => res.data));
    } catch (error) {
      console.error('Error fetching ticker data:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchTickerData();
    }, 10000000); // Fetch data every 60 seconds

    fetchTickerData(); // Initial fetch

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [tickerCities]);

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-xl font-bold mb-4">Weather Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
        <CitySelectorComponent cities={cities} handleCityClick={handleCityClick} />
          <WeatherFormComponent fetchWeather={fetchWeather} fetchForecast={fetchForecast} />
          {selectedCity && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedCity.name}</h2>
              <WeatherCardComponent title="Current Weather" weatherData={weatherData} />
              <WeatherCardComponent title="Forecast" weatherData={forecastData && forecastData.list[0]} />
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-4 right-4 w-64">
          <h2 className="text-2xl font-bold my-4">Live Weather Ticker</h2>
          <WeatherTickerComponent tickerData={tickerData} />
        </div>
    </div>
  );
};

export default WeatherDashboardComponent;