from flask import Flask
from flask_cors import CORS

from utils.logger import logger
from routes.weather_route import weather_bp

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

app.register_blueprint(weather_bp, url_prefix='/api/weather')




if __name__ == "__main__":
    app.run(debug=True)