import React from 'react'

const PersonRow = ({ person }) => {

  return (
    <tr key={person.name}>
      <td>
        {person.name}
      </td>
      <td>
        {person.number ? person.number : '-'}
      </td>
    </tr>
  )
}

export default PersonRow