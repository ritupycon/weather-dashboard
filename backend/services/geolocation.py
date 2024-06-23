import requests
from typing import Tuple, Optional

from utils.config import API_KEY, GEOCODING_ZIP_URL, ONECALL_URL
from utils.logger import logger

class GeolocationService:

    @staticmethod
    def fetch_geolocation(zip_code: str, country_code: str) -> Tuple[Optional[dict], int]:
        params = {'zip': f"{zip_code},{country_code}", 'appid': API_KEY}
        try:
            response = requests.get(GEOCODING_ZIP_URL, params=params)
            response.raise_for_status()
        except requests.RequestException as e:
            logger.error(f"Geocoding API request failed: {e}")
            return None, response.status_code if response else 500

        data = response.json()
        lat = data.get('lat')
        lon = data.get('lon')

        if not lat or not lon:
            logger.error("Latitude and longitude not found in the geolocation data.")
            return None, 404

        return {'lat': lat, 'lon': lon}, 200