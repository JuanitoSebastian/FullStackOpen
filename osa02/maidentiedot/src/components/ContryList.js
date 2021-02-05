import React from 'react'
import CountryView from './CountryView'

const CountryList = ({ countries, searchTerm }) => {

  const countriesToDisplay = countries.filter(country => country.name.toLowerCase().match(searchTerm.toLowerCase()))

  if (countriesToDisplay.length > 10) {
    return (
      <p>Too many mathches... Secify another filter</p>
    )

  } else {
    return (
      <div>
        {countriesToDisplay.map(country =>
          <CountryView country={country}  key={country.name} />
        )}
      </div>
    )
  }
  
}
export default CountryList