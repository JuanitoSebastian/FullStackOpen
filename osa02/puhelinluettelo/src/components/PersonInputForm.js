import React from 'react'

const PersonInputForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {

  const handleInputField = (event) => {
    switch (event.target.name) {
      case 'name':
        setNewName(event.target.value)
        break
      case 'number':
        setNewNumber(event.target.value)
        break
      default:
        console.log("Event not recognized!")
    }
  }

  const appendPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (isDuplicate(newPerson)) {
      alert(`${newPerson.name} is already in the phonebook`)
      return 
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const isDuplicate = (personToCheck) => {
    return persons.some(p => p.name === personToCheck.name)
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