import React, { useState } from 'react'
import PersonTable from './components/PersonTable'
import PersonInputForm from './components/PersonInputForm'
import FilterInput from './components/FilterInput'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterByName, setFilterByName ] = useState('')
  

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