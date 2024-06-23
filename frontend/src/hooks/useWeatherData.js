import { useState } from 'react';
import { fetchCurrentWeather, fetchWeatherForecast } from '../services/WeatherAPI';


const useWeatherData = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const fetchWeather = async (city) => {
    try {
      const currentWeatherData = await fetchCurrentWeather(city);
      setCurrentWeather({
        temperature: currentWeatherData.temperature,
        weatherDescription: currentWeatherData.weatherDescription,
      });

      const forecastWeatherData = await fetchWeatherForecast(city);
      setForecastWeather(forecastWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return { currentWeather, forecastWeather, fetchWeather };
};

export default useWeatherData;