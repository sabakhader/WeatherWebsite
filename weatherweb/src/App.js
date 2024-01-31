import React, { useState } from "react";
import axios from "axios";
import './App.css';
import Navbar from"../src/component/navbar";


function App()  {

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const apiKey = "1b56f07543mshcaecd24d22689cdp1345aajsnace1b40043f1";

  const searchloc = async (event) => {
    if (event.key === "Enter") {
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/forecast.json",
        params: {
          q: location,
          days: "3",
        },
        headers: {
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }

      setLocation("");
    }
  };

  const renderForecast = () => {
    if (!data || !data.forecast) {
      return null;
    }

    return data.forecast.forecastday.map((day) => (
      <div key={day.date_epoch} className="forecast-day">
        <p>{day.date}</p>
        <img src={day.day.condition.icon} alt={day.day.condition.text} />
        <p className="bold">{day.day.avgtemp_c} °C</p>
        <p>{day.day.condition.text}</p>
      </div>
    ));
  };


  return (
  <div className="app">
    <React.Fragment>
      <Navbar/>
    </React.Fragment>
  
      <div className="search">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyUp={searchloc}
        ></input>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.location ? data.location.name : ""}</p>
          </div>
          <div className="temp">
            {data.current ? <h1>{data.current.temp_c} °C </h1> : null}
          </div>
          <div className="description">
            {data.current ? <p>{data.current.condition.text}</p> : null}
          </div>
        </div>
        <div className="bottom">
        {renderForecast()}
        </div>
      </div>
    </div>
  );
}

export default App;
