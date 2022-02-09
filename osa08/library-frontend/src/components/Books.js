import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_GENRES, ALL_BOOKS } from '../queries/queries'

const Books = (props) => {
  const [chosenGenre, setChosenGenre] = useState('all')
  const [getBooks, allBooksResult] = useLazyQuery(ALL_BOOKS, {
    fetchPolicy: 'network-only'
  })
  const allGenresResult = useQuery(ALL_GENRES)

  useEffect(() => {
    chosenGenre === 'all'
      ? getBooks()
      : getBooks({ variables: { genre: chosenGenre } })
  }, [chosenGenre])

  if (allBooksResult.loading || allGenresResult.loading) {
    return <div>Loading...</div>
  }

  const books = allBooksResult.data.allBooks

  const handleForm = (event) => {
    setChosenGenre(event.target.value)
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <form>
        <label htmlFor='genre'>Filter by genre: </label>
        <select name='genre' onChange={handleForm} value={chosenGenre}>
          <option key='all'>all</option>
          { allGenresResult.data.allGenres.map(genre =>
            <option key={genre}>{genre}</option>
          )}
        </select>
      </form>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books