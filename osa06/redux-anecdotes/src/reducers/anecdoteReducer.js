const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
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
      const anecdoteToCreate = {
        content: action.data.content,
        id: getId(),
        votes: 0
      }
      return [...state, anecdoteToCreate]

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

export const newAnecdote = (content) => {
  return {
    type: 'NEW',
    data: {
      content: content
    }
  }
}

export default reducer