import requests

from typing import Tuple
from services.geolocation import GeolocationService
from services.weather_data import WeatherDataService
from utils.config import WEATHER_FORECAST_API_URL, CURRENT_WEATHER_API_URL, API_KEY


class WeatherDashboardService:

    @staticmethod
    def get_weather(zip_code: str, country_code: str) -> Tuple[dict, int]:
        location_data, status_code = GeolocationService.fetch_geolocation(zip_code, country_code)
        if status_code != 200:
            return {"detail": "Failed to fetch location data."}, status_code

        weather_data, status_code = WeatherDataService.fetch_weather(location_data['lat'], location_data['lon'])
        if status_code != 200:
            return {"detail": "Failed to fetch weather data."}, status_code

        return weather_data, 200
    
    @staticmethod
    def get_current_weather(city: str, country_code: str):
        params = {'q': f"{city},{country_code}", 'appid': API_KEY}
        try:
            response = requests.get(CURRENT_WEATHER_API_URL, params=params)
            print("ddddd", response)
            response.raise_for_status()
        except requests.RequestException as e:
            return None, response.status_code if response else 500
        
        if response.status_code != 200:
            return {"detail": "Failed to fetch weather data."}, status_code

        return response.json(), 200
    
    @staticmethod
    def get_weather_forecast(city: str, country_code: str):
        params = {'q': f"{city},{country_code}", 'appid': API_KEY}
        try:
            response = requests.get(WEATHER_FORECAST_API_URL, params=params)
            response.raise_for_status()
        except requests.RequestException as e:
            return None, response.status_code if response else 500
        
        if response.status_code != 200:
            return {"detail": "Failed to fetch weather data."}, status_code

        return response.json(), 200