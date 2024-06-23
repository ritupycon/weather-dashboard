from typing import Tuple
from services.geolocation import GeolocationService
from services.weather_data import WeatherDataService


class WeatherDashboardService:

    def get_weather(zip_code: str, country_code: str) -> Tuple[dict, int]:
        location_data, status_code = GeolocationService.fetch_geolocation(zip_code, country_code)
        if status_code != 200:
            return {"detail": "Failed to fetch location data."}, status_code

        weather_data, status_code = WeatherDataService.fetch_weather(location_data['lat'], location_data['lon'])
        if status_code != 200:
            return {"detail": "Failed to fetch weather data."}, status_code

        return weather_data, 200