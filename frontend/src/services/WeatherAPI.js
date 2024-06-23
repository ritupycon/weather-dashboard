import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/weather';


const fetchCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/current/${city}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather');
  }
};

const fetchWeatherForecast = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast/${city}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Failed to fetch weather forecast');
  }
};

export {
  fetchCurrentWeather,
  fetchWeatherForecast,
};