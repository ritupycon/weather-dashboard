from flask import Flask
from flask_cors import CORS

from utils.logger import logger
from routes.weather_route import weather_bp


def create_app():
    app = Flask(__name__)
    CORS(app, origins=[
        "http://localhost:3000",
    ])

    with app.app_context():
        app.register_blueprint(weather_bp, url_prefix='/api/weather')

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)