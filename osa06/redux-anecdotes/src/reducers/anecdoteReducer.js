const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const idToVote = action.data.id
      const anecdoteToVote = state.find(anecdote => anecdote.id === idToVote)
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return sortByVotes(
        state.map(anecdote => 
          anecdote.id !== idToVote ? anecdote : updatedAnecdote
        )
      )

    case 'NEW':
      return [...state, action.data]

    case 'INIT_ANECDOTES':
      return action.data

    default: 
      return state
  }
}

const sortByVotes = (toSort) => {
  return [...toSort].sort((previous, next) => previous.votes > next.votes ? 1 : -1).reverse()
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const newAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    data: anecdote
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default anecdoteReducer