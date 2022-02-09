import React from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries/queries'

const SetBirthyear = (props) => {
  const response = useQuery(ALL_AUTHORS)
  const [ setBirthyear ] = useMutation(SET_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (response.loading) {
    return <div>Loading...</div>
  }

  const authors = response.data.allAuthors

  const handleSubmit = (event) => {
    event.preventDefault()
    const authorToSet = event.target.author.value
    const birthyearToSet = Number(event.target.birthyear.value)
    setBirthyear( { variables: { name: authorToSet, setBornTo: birthyearToSet } } )
  }

  return (
    <div>
      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={ authors.length === 0 || !props.token }>
          <label forhtml='author'>Auhtor: </label>
          <select name='author'>
            { authors.map(author =>
              <option key={author.id} value={author.name}>{author.name}</option>
            ) }
          </select>
          <br />
          <label forhtml='author'>Born: </label>
          <input name='birthyear' type='number' />
          <br />
          <button type='submit'>Update author</button>
        </fieldset>
      </form>
    </div>
  )
}

export default SetBirthyear