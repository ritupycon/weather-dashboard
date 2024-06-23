from flask import Blueprint, request, jsonify
from services.weather_service import WeatherService

weather_bp = Blueprint('weather', __name__, url_prefix='/weather')


@weather_bp.route('/<zip_code>', methods=['GET'])
def get_weather(zip_code):
    try:
        weather = WeatherService.get_weather_by_zip(zip_code)
        return jsonify(weather.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400