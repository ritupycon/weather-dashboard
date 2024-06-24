import React, { useState } from 'react';

const WeatherFormComponent = ({ fetchWeatherDataByZipCode, setSelectedZipCode }) => {
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedZipCode(zipCode);
    fetchWeatherDataByZipCode(zipCode, countryCode);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label htmlFor="zipCode" className="block text-sm font-bold mb-1">ZIP Code:</label>
        <input
          type="text"
          id="zipCode"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="countryCode" className="block text-sm font-bold mb-1">Country Code:</label>
        <input
          type="text"
          id="countryCode"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Get Weather</button>
    </form>
  );
};

export default WeatherFormComponent;