import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries/queries'

const Recommended = (props) => {

  if (!props.show) {
    return null
  }

  const [getBooks, booksQueryResult] = useLazyQuery(ALL_BOOKS)
  const meQueryResult = useQuery(ME)

  useEffect(() => {
    if (meQueryResult.data) {
      getBooks({ variables: { genre: meQueryResult.data.me.favoriteGenre } })
    }

  }, [meQueryResult.data])

  if (booksQueryResult.loading || meQueryResult.loading || !booksQueryResult.data || !meQueryResult.data ) {
    return <div>Loading...</div>
  }

  const books = booksQueryResult.data.allBooks
  const me = meQueryResult.data.me

  const BookList = () => {
    if (books && books.length > 0) {
      return (
        <tbody>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      )
    }
    return (
      <tbody><tr><td>No books yet!</td></tr></tbody>
    )
  }

  return (
    <div>
      <h2>recommended books</h2>
      <p>Your favorite genre is <b>{me.favoriteGenre}</b>. Here are some books:</p>
      <table>
        <thead>
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
        </thead>
        <BookList />
      </table>
    </div>
  )


}

export default Recommended