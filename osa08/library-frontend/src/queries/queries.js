import { gql } from '@apollo/client'
import { BOOK_DETAILS, AUTHOR_DETAILS } from './fragments'

export const ALL_BOOKS = gql`
query($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const SET_BIRTHYEAR = gql`
  mutation SetBirthyear($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      ...AuthorDetails
    }
  }
${AUTHOR_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(
      username: $username,
      password: $password
    ) {
      value
    }
  }
`

export const ME = gql`
  query {
    me {
      id
      username
      favoriteGenre
    }
  }
`