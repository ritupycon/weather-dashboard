from flask import Flask, request, jsonify
from flask_cors import CORS
from pydantic import ValidationError
from models.weather import WeatherRequest
from services.weather_dashboard import WeatherDashboardService

from utils.logger import logger


app = Flask(__name__)
CORS(app)


@app.route("/weather", methods=["POST"])
def get_weather():
    try:
        req_data = WeatherRequest(**request.get_json())
        print("ddddd",req_data.country_code)
    except ValidationError as e:
        logger.error(f"Request validation error: {e}")
        return jsonify({"detail": "Invalid request data", "errors": e.errors()}), 400

    weather_data, status_code = WeatherDashboardService.get_weather(req_data.zip_code, req_data.country_code)
    return jsonify(weather_data), status_code

@app.errorhandler(404)
def not_found(error):
    return jsonify({"detail": "Not Found"}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({"detail": "Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)