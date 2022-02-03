import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, resetNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    const anecdoteObject = await anecdoteService.createAnecdote(anecdoteText)
    dispatch(newAnecdote(anecdoteObject))
    dispatch(displayNotification(`${anecdoteText} was created`))
    setTimeout(() => {
      dispatch(resetNotification)
    }, 5000)
  }

  return (
    <div>
      <form onSubmit={createNewAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm