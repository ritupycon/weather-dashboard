import React from 'react';


const CitySelectorComponent = ({ cities, handleCityClick }) => {
  return (
    <div className="flex flex-wrap mb-4">
      {cities.map((city) => (
        <button
          key={city.name}
          className="bg-gray-600 text-white px-4 py-2 m-2 rounded"
          onClick={() => handleCityClick(city)}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default CitySelectorComponent;