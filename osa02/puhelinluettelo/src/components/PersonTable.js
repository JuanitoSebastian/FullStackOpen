import React from 'react'
import PersonRow from './PersonRow'

const PersonTable = ({ persons, filterByName }) => {

  return (
    <table>
      <tbody>
        {persons.filter(person => filterByName === '' || person.name.includes(filterByName)).map(person =>
          <PersonRow key={person.name} person={person} />
        )}
      </tbody>
    </table>
  )
}

export default PersonTable