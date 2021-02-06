import React from 'react'

const PersonRow = ({ person, removePerson }) => {

  return (
    <tr key={person.name}>
      <td>
        {person.name}
      </td>
      <td>
        {person.number ? person.number : '-'}
      </td>
      <td>
        <button onClick={() => removePerson(person)}>
          delete
        </button>
      </td>
    </tr>
  )
}

export default PersonRow