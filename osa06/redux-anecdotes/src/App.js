import React from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <Notification />
      <h1>Anecdotes</h1>
      <h2>Create new anecdote</h2>
      <AnecdoteForm />
      <h2>Current anecdotes</h2>
      <Filter />
      <AnecdoteList />
    </div>
  )
}

export default App