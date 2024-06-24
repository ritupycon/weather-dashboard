import { useState } from 'react';
import { fetchCurrentWeather } from '../services/WeatherAPI';


const useWeatherData = () => {
  const [weatherData, setCurrentWeather] = useState(null);

  const fetchWeather = async (city, country_code) => {
    try {
      const currentWeatherData = await fetchCurrentWeather(city, country_code);
      setCurrentWeather(currentWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return { weatherData, fetchWeather };
};

export default useWeatherData;