import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (anecdoteToCreate) => {
  const anecdoteObject = {
    content: anecdoteToCreate,
    votes: 0
  }

  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const voteAnecdote = async (anecdoteToVote) => {
  const response = await axios.put(`${baseUrl}/${anecdoteToVote.id}`, { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 })
  return response.data
}

const markedForExport = {
  getAll,
  createAnecdote,
  voteAnecdote
}

export default markedForExport