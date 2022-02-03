import React from 'react'
import { connect } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification, } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const createNewAnecdote = async (event) => {
    event.preventDefault()
    const anecdoteText = event.target.anecdote.value
    event.target.anecdote.value = ''
    
    props.newAnecdote(anecdoteText)
    props.displayNotification(`${anecdoteText} was created`)
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

const ConnectedAnnecdoteForm = connect(null, {
  newAnecdote, displayNotification
})(AnecdoteForm)

export default ConnectedAnnecdoteForm