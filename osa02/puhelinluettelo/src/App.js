import React, { useState, useEffect } from 'react'
import PersonTable from './components/PersonTable'
import PersonInputForm from './components/PersonInputForm'
import FilterInput from './components/FilterInput'
import personsService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterByName, setFilterByName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationType, setNotificationType] = useState(null)

  const setNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)

    setTimeout(() => {
      setNotificationMessage('')
      setNotificationType(null)
    }, 5000)
  }


  useEffect(() => {
    personsService
      .getAll()
      .then(fetchedPersons => {
        setPersons(fetchedPersons)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput filterByName={filterByName} setFilterByName={setFilterByName} />
      <h3>Add a new</h3>
      <PersonInputForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} setNotification={setNotification} />
      <h2>Numbers</h2>
      <PersonTable persons={persons} setPersons={setPersons} filterByName={filterByName} />
      <Notification message={notificationMessage} type={notificationType} />
    </div>
  )

}

export default App