import requests
from utils.config import WEATHER_API_KEY, WEATHER_API_URL
from models.weather import Weather

class WeatherService:
    @staticmethod
    def get_weather_by_zip(zip_code: str) -> Weather:
        params = {
            'zip': zip_code,
            'appid': WEATHER_API_KEY,
            'units': 'metric'
        }
        response = requests.get(WEATHER_API_URL, params=params)
        response.raise_for_status()
        
        data = response.json()
        return Weather.from_dict(data)

# Example usage:
if __name__ == "__main__":
    zip_code = "94040"  # Example zip code
    weather = WeatherService.get_weather_by_zip(zip_code)
    print(weather)