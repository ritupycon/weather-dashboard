from pydantic import BaseModel, constr


class WeatherRequest(BaseModel):
    zip_code: constr(min_length=5, max_length=10)
    country_code: constr(min_length=2, max_length=2)