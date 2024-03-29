import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/queries'
import SetBirthyear from './SetBirthyear'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading || !result.data) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              name
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <SetBirthyear token={props.token} />
    </div>
  )
}

export default Authors