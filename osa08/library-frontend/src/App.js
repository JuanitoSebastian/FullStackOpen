import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notification from './components/Notification'
import Recommended from './components/Recommended'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const tokenToSet = window.localStorage.getItem('library-app-user-token')
    if (tokenToSet) {
      setToken(tokenToSet)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const displayNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <Notification notification={notification} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <HiddenButton show={token} setPage={() => setPage('recommended')}>recommended</HiddenButton>
        <HiddenButton show={token} setPage={() => setPage('add')}>add book</HiddenButton>
        <SessionButton setPage={setPage} token={token} logout={logout}/>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended
        show={page === 'recommended'}
      />

      <NewBook
        show={page === 'add'}
        displayNotification={displayNotification}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        displayNotification={displayNotification}
      />

    </div>
  )
}

const HiddenButton = (props) => {
  if (!props.show) {
    return null
  }

  return (
    <button onClick={props.setPage}>{props.children}</button>
  )
}

const SessionButton = (props) => {
  if (props.token) {
    return (
      <button onClick={props.logout}>logout</button>
    )
  }
  return (
    <button onClick={() => props.setPage('login')}>login</button>
  )
}

export default App