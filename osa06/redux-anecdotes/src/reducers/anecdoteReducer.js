import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'UPDATE':
      return sortByVotes(
        state.map(anecdote => 
          anecdote.id !== action.data.id ? anecdote : action.data
        )
      )

    case 'NEW':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return sortByVotes(action.data)

    default: 
      return state
  }
}

const sortByVotes = (toSort) => {
  return [...toSort].sort((previous, next) => previous.votes > next.votes ? 1 : -1).reverse()
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteObject = await anecdoteService.voteAnecdote(anecdote)
    dispatch({
      type: 'UPDATE',
      data: anecdoteObject
    })
  }
}

export const newAnecdote = (anecdoteText) => {
  return async dispatch => {
    const anecdoteObject = await anecdoteService.createAnecdote(anecdoteText)
    dispatch({
      type: 'NEW',
      data: anecdoteObject
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer