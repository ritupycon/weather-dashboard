import React, { useState } from 'react';

const WeatherFormComponent = ({ fetchWeatherDataByZipCode, setSelectedZipCode }) => {
  const [zipCode, setZipCode] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const zip = zipCode.trim();
    if (zip && countryCode) {
      fetchWeatherDataByZipCode(zip, countryCode);
      setSelectedZipCode(zip);
    } else {
      alert('Please enter a valid zip code and select a country code.');
    }
  };

  const handleZipChange = (e) => {
    setZipCode(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountryCode(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={zipCode}
          onChange={handleZipChange}
          placeholder="Enter Zip Code"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm flex-grow"
        />
        <select
          value={countryCode}
          onChange={handleCountryChange}
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Select Country Code</option>
          <option value="US">United States</option>
          <option value="IN">India</option>
          <option value="CA">Canada</option>
          {/* Add more options as needed */}
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Get Weather
        </button>
      </div>
    </form>
  );
};

export default WeatherFormComponent;