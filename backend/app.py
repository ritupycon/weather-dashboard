from flask import Flask
from flask_cors import CORS

from utils.logger import logger
from routes.weather_route import weather_bp

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.register_blueprint(weather_bp, url_prefix='/api/weather')

# Define CORS headers after_request
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    return response




if __name__ == "__main__":
    app.run(debug=True)