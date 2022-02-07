import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/queries'

const SetBirthyear = () => {
  const response = useQuery(ALL_AUTHORS)

  if (response.loading) {
    return <div>Loading...</div>
  }

  const authors = response.data.allAuthors

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <label for='author'>Auhtor: </label>
        <select name='author'>
          { authors.map(author => 
            <option value={author.name}>{author.name}</option>
          ) }
        </select>
        <br />
        <label for='author'>Birthyear: </label>
        <input type='number' />
        <br />
        <button type='submit'>Set Birthyear</button>
      </form>
    </div>
  )
}

export default SetBirthyear