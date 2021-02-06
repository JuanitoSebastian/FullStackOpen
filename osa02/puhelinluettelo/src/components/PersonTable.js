import React from 'react'
import PersonRow from './PersonRow'
import personsService from '../services/persons'

const PersonTable = ({ persons, filterByName, setPersons }) => {

  const removePerson = (personToDelete) => {
    const confirmDeletition = window.confirm(`Delete ${personToDelete.name}?`)
    if (!confirmDeletition) { return }
    personsService
      .removePerson(personToDelete.id)
      .then(_ => {
        setPersons(persons.filter(person => person.id !== personToDelete.id))
      })
      .catch(error => {
        alert(`${personToDelete.name} has already been deleted`)
        setPersons(persons.filter(person => person.id !== personToDelete.id))
      })
  }

  return (
    <table>
      <tbody>
        {persons.filter(person => filterByName === '' || person.name.includes(filterByName)).map(person =>
          <PersonRow key={person.name} person={person} removePerson={removePerson} />
        )}
      </tbody>
    </table>
  )
}

export default PersonTable