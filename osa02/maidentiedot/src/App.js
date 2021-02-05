import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Search from './components/Search'
import CountryList from './components/ContryList'

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/all/`)
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <CountryList countries={countries} searchTerm={searchTerm} />
    </div>
  )
}

export default App;
