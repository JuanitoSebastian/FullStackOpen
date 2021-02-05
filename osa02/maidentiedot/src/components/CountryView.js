import React, { useState } from 'react'
import LanguageList from './LanguageList'
import WeatherView from './WeatherView'

const CountryView = ({ country }) => {
  const [detailedViewToggle, setDetailedViewToggle] = useState(false)

  const toggleDetailView = () => {
    setDetailedViewToggle(!detailedViewToggle)
  }

  if (detailedViewToggle) {
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital} <br />
        populaiton {country.population}
        </p>
        <h3>languages</h3>
        <LanguageList languageList={country.languages} />
        <img src={country.flag} width='100px' alt='a flag' />
        <h3>Weather in {country.capital}</h3>
        <WeatherView city={country.capital} />
        <button onClick={toggleDetailView}>
          minimize
        </button>
      </div>
    )
  } else {
    return (
      <div>
        <h2>{country.name}
          <button onClick={toggleDetailView}>
            show
        </button>
        </h2>
      </div>
    )
  }

}

export default CountryView