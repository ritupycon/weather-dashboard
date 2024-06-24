from dotenv import load_dotenv
import os

# Load environment variables from a .env file
load_dotenv()

API_KEY = os.getenv('WEATHER_API_KEY', 'your_api_key_here')
WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather'
CURRENT_WEATHER_API_URL = 'http://api.openweathermap.org/data/2.5/weather'
WEATHER_FORECAST_API_URL = 'http://api.openweathermap.org/data/2.5/forecast'
GEOCODING_ZIP_URL = "http://api.openweathermap.org/geo/1.0/zip"
ONECALL_URL = "https://api.openweathermap.org/data/3.0/onecall"
