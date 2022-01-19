import React from 'react'
import personsService from '../services/persons'

const PersonInputForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber, setNotification }) => {

  const handleInputField = (event) => {
    switch (event.target.name) {
      case 'name':
        setNewName(event.target.value)
        break
      case 'number':
        setNewNumber(event.target.value)
        break
      default:
        console.log("Input event not recognized!")
    }
  }

  const appendPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const duplicate = isDuplicate(newPerson)
    if (duplicate) {
      const toBeReplaced = window.confirm(`${newPerson.name} is already in the phonebook. Would you like to update?`)
      const changedPerson = { ...duplicate, number: newNumber }
      if (toBeReplaced) {
        personsService
          .updatePerson(changedPerson)
          .then(updatedPersonObject => {
            setPersons(persons.map(person => person.id === updatedPersonObject.id ? updatedPersonObject : person))
            clearFields()
          })
          .catch(_ => {
            setNotification(`${changedPerson.name} has already been removed from the server`, 'error')
            setPersons(persons.filter(person => person.id !== changedPerson.id))
          })
      }
      return
    }

    personsService
      .createPerson(newPerson)
      .then(newPersonObject => {
        setPersons(persons.concat(newPersonObject))
        clearFields()
        setNotification(`${newPerson.name} has been added!`, 'info')
      })
      .catch(error => {
        setNotification(error.response.data.error, 'error')
      })
  }

  const isDuplicate = (personToCheck) => {
    return persons.find(p => p.name === personToCheck.name)
  }

  const clearFields = () => {
    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={appendPerson}>
      <div>
        name: <input name="name" value={newName} onChange={handleInputField} />
      </div>
      <div>
        number: <input name='number' value={newNumber} onChange={handleInputField} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )

}

export default PersonInputForm