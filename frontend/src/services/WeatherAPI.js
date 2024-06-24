import axios from 'axios';

const BASE_URL = 'http://localhost:8000/weather';


const fetchCurrentWeather = async (city, country_code) => {
  try {
    const response = await axios.get(`${BASE_URL}/current?city=${city}&country_code=${country_code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather');
  }
};

const fetchWeatherForecast = async (city, country_code) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast?city=${city}&country_code=${country_code}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Failed to fetch weather forecast');
  }
};


const fetchWeatherByZipCode = async (zipCode, countryCode) => {
  try {
    const response = await axios.get(`${BASE_URL}?zip_code=${zipCode}&country_code=${countryCode}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Failed to fetch weather forecast');
  }
};

export {
  fetchCurrentWeather,
  fetchWeatherForecast,
  fetchWeatherByZipCode,
};