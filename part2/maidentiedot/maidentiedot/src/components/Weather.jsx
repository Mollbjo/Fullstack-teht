import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital, lat, lon }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (lat && lon) {
      weatherService.getWeather(lat, lon)
        .then(data => setWeather(data))
        .catch(error => console.error('Error fetching weather:', error))
    }
  }, [lat, lon])

  if (!weather) {
    return <p>Loading weather...</p>
  }

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )
}

export default Weather
