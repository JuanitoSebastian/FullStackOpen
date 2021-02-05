import React, { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherView = ({ city }) => {

  const [weather, setWeather] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`)
      .then(res => {
        setWeather(res.data)
      })
  }, [city, api_key])

  if (weather) {
    return (
      <div>
        <p>
        {weather.weather[0].main} with {weather.main.temp}c
        </p>
      </div>
    )
  } else {
    return (
      <div>
        loading weather...
      </div>
    )
  }
}

export default WeatherView