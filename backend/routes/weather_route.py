from flask import Blueprint, request, jsonify
from pydantic import ValidationError
from models.weather import (
    WeatherRequest,
    CurrentWeatherRequest,
    WeatherForecastRequest,
)
from services.weather_dashboard import WeatherDashboardService
from utils.logger import logger

weather_bp = Blueprint('weather', __name__)



@weather_bp.route("", methods=["GET"])
def get_weather():
    try:
        # Validate query parameters
        req_data = WeatherRequest(
            zip_code=request.args.get('zip_code'),
            country_code=request.args.get('country_code')
        )
    except ValidationError as e:
        logger.error(f"Request validation error: {e}")
        return jsonify({"detail": "Invalid request data", "errors": e.errors()}), 400

    weather_data, status_code = WeatherDashboardService.get_weather(req_data.zip_code, req_data.country_code)
    return jsonify(weather_data), status_code


@weather_bp.route("/current", methods=["GET"])
def get_current_weather():
    try:
        # Validate query parameters
        req_data = CurrentWeatherRequest(
            city=request.args.get('city'),
            country_code=request.args.get('country_code')
        )
    except ValidationError as e:
        logger.error(f"Request validation error: {e}")
        return jsonify({"detail": "Invalid request data", "errors": e.errors()}), 400

    weather_data, status_code = WeatherDashboardService.get_current_weather(req_data.city, req_data.country_code)
    return jsonify(weather_data), status_code

@weather_bp.route("/forecast", methods=["GET"])
def get_weather_forecast():
    try:
        # Validate query parameters
        req_data = WeatherForecastRequest(
            city=request.args.get('city'),
            country_code=request.args.get('country_code')
        )
    except ValidationError as e:
        logger.error(f"Request validation error: {e}")
        return jsonify({"detail": "Invalid request data", "errors": e.errors()}), 400

    weather_data, status_code = WeatherDashboardService.get_weather_forecast(req_data.city, req_data.country_code)
    return jsonify(weather_data), status_code