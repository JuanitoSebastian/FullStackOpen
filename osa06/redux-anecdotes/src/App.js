import React, { useEffect } from 'react'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAnecdotes = async () => {
      const fetchedAnecdotes = await anecdoteService.getAll()
      dispatch(initAnecdotes(fetchedAnecdotes))
    }

    fetchAnecdotes()
  }, [dispatch])

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