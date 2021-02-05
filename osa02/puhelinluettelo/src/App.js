import React, { useState, useEffect } from 'react'
import PersonTable from './components/PersonTable'
import PersonInputForm from './components/PersonInputForm'
import FilterInput from './components/FilterInput'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterByName, setFilterByName] = useState('')


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => {
        setPersons(res.data)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput filterByName={filterByName} setFilterByName={setFilterByName} />
      <h3>Add a new</h3>
      <PersonInputForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <PersonTable persons={persons} filterByName={filterByName} />
    </div>
  )

}

export default App