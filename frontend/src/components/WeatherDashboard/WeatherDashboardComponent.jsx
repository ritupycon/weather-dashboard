import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CitySelectorComponent from '../CitySelector/CitySelectorComponent';
import WeatherCardComponent from '../WeatherCard/WeatherCardComponent';
import WeatherTickerComponent from '../WeatherTicker/WeatherTickerComponent';
import WeatherFormComponent from '../WeatherForm/WeatherFormComponent';

import useWeatherData from '../../hooks/useWeatherData';
import useForecastData from '../../hooks/useForecastData';
import useWeatherDataByZipCode from '../../hooks/useWeatherDataByZipCode';


const cities = [
  { name: 'Austin', code: 'US' },
  { name: 'Delhi', code: 'IN' },
  { name: 'Seattle', code: 'US' },
  { name: 'Boston', code: 'US' },
  { name: 'Los Angeles', code: 'US' }
];

const WeatherDashboardComponent = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedZipCode, setSelectedZipCode] = useState(null);
  const [tickerCities, setTickerCities] = useState([cities[0], cities[1], cities[2]]);
  const [tickerData, setTickerData] = useState([]);

  const { weatherData, fetchWeather } = useWeatherData();
  const { forecastData, fetchForecast } = useForecastData();
  const { weatherDataByZipCode, fetchWeatherDataByZipCode } = useWeatherDataByZipCode();

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSelectedZipCode(null); // Reset selectedZipCode when city is selected
    fetchWeather(city.name, city.code);
    fetchForecast(city.name, city.code);
    console.log(weatherData);

  };

  const fetchTickerData = async () => {
    const promises = tickerCities.map((city) =>
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.name},${city.code}&appid=${'xxxxx'}&units=metric`)
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
    }, 10000000);

    fetchTickerData();

    return () => clearInterval(interval);
  }, [tickerCities]);

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-xl font-bold mb-4">Weather Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <CitySelectorComponent cities={cities} handleCityClick={handleCityClick} />
          <WeatherFormComponent
            fetchWeatherDataByZipCode={fetchWeatherDataByZipCode}
            setSelectedZipCode={setSelectedZipCode}
          />
          {selectedCity && (
            <div>
              <h2 className="text-2xl font-bold mb-2">{selectedCity.name}</h2>
              <WeatherCardComponent title="Current Weather" weatherData={weatherData} />
              <WeatherCardComponent title="Forecast" weatherData={forecastData && forecastData.list[0]} />
            </div>
          )}
          {selectedZipCode && (
            <div>
              <h2 className="text-2xl font-bold mb-2">Weather for Zip Code: {selectedZipCode}</h2>
              <WeatherCardComponent title="Current Weather" weatherData={weatherDataByZipCode} />
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