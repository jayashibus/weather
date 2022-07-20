import "./App.css";
import React, { useState, useEffect } from "react";
import dateFormat from "dateformat";

function App() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("Kovan");

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=4122a62214a91aa6e72874bd63075a3d`;

  const searcLocationHandler = (event) => {
    if (event.key === "Enter") {
      fetchWeather();
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await fetch(apiUrl);
      const weatherData = await response.json();
      setWeather(weatherData);
      setLoading(false);
      console.log(weatherData);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const today = Date.now();
  const currentDate = dateFormat(today, "dddd,  dS mmmm");

  return (
    <div className="App">
      {!loading ? (
        <div className="app-wrap">
          <header>
            <input
              type="text"
              autocomplete="off"
              className="search-box"
              placeholder="Search for a city"
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searcLocationHandler}
            />
          </header>

          <main>
            <section className="location">
              <div className="city">{weather ? weather.name : null}, </div>
              <div className="date">{currentDate}</div>
            </section>

            <div className="current">
              <div className="temp">
                {weather.main ? weather.main.temp.toFixed() : null}
                <span>°C</span>
              </div>
              <div className="weather">
                {weather.weather ? weather.weather[0].main : null}
              </div>
              <div className="hi-low">
                {weather.main ? (
                  <p>
                    {weather.main.temp_min}°C / {weather.main.temp_max}°C
                  </p>
                ) : null}
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="app-wrap">Loading....</div>
      )}
    </div>
  );
}

export default App;
