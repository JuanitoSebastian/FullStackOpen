import React, { useState } from 'react'
import {
  Switch, Route, useRouteMatch, useHistory
} from 'react-router-dom'

import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Notification from './components/Notification'
import Footer from './components/Footer'
import CreateNew from './components/CreateNew'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState(null)

  const displayNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 10 * 1000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdoteToDisplay = match
    ? anecdotes.find(a => a.id === match.params.id)
    : null

  return (
      <div>
        <h1>Software anecdotes</h1>
        <Menu />
        <Notification message={notification} />
        <Switch>
          <Route path='/anecdotes/:id'>
            <Anecdote anecdote={anecdoteToDisplay} />
          </Route>
          <Route path='/create'>
            <CreateNew addNew={addNew} displayNotification={displayNotification} />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
          <Route path='/'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
        <Footer />
      </div>
  )
}

export default App