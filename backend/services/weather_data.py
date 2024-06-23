import requests
from typing import Tuple, Optional

from utils.config import API_KEY, GEOCODING_ZIP_URL, ONECALL_URL
from utils.logger import logger


class WeatherDataService:

    @staticmethod
    def fetch_weather(lat: float, lon: float) -> Tuple[Optional[dict], int]:
        params = {'lat': lat, 'lon': lon, 'exclude': 'minutely,hourly', 'appid': API_KEY}
        try:
            response = requests.get(ONECALL_URL, params=params)
            response.raise_for_status()
        except requests.RequestException as e:
            logger.error(f"Weather API request failed: {e}")
            return None, response.status_code if response else 500

        return response.json(), 200