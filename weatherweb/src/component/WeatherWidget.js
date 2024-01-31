import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data based on the user's location
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api/weather?location=${location}`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (location) {
      fetchWeatherData();
    }
  }, [location]);

  return (
    <div>
      <h2>Weather Information for {location}</h2>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.temperature} °C</p>
          <p>Condition: {weatherData.condition}</p>
          {/* Add more weather information as needed */}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
