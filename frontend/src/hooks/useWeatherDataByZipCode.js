import { useState } from 'react';
import { fetchWeatherByZipCode } from '../services/WeatherAPI';


const useWeatherDataByZipCode = () => {
  const [weatherDataByZipCode, setWeatherDataByZipCode] = useState(null);

  const fetchWeatherDataByZipCode = async (zipCode, countryCode) => {
    try {
      const weatherData = await fetchWeatherByZipCode(zipCode, countryCode);
      setWeatherDataByZipCode(weatherData.current);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return { weatherDataByZipCode, fetchWeatherDataByZipCode };
};

export default useWeatherDataByZipCode;