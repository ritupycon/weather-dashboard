import { useState } from 'react';
import { fetchWeatherForecast } from '../services/WeatherAPI';


const useForecastData = () => {
  const [forecastData, setForecastWeather] = useState(null);

  const fetchForecast = async (city, country_code) => {
    try {
      const forecastWeatherData = await fetchWeatherForecast(city, country_code);
      setForecastWeather(forecastWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return { forecastData, fetchForecast };
};

export default useForecastData;