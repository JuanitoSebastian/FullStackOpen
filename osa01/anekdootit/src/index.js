import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = (props) => {
  const action = props.action
  const text = props.text

  return (
    <button onClick={action}>
      {text}
    </button>
  )
}

const Anecdote = (props) => {
  const anecdoteText = props.anecdoteText
  const votes = props.votes
  return (
    <div>
      <p>{anecdoteText}</p>
      <p>Has {votes} votes!</p>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const getRandomNumber = (max, past) => {
    while (true) {
      const randomNumber = Math.floor(Math.random() * Math.floor(max))
      if (randomNumber !== past) { return randomNumber }
    }
  }

  const setNewRandomIndex = () => {
    setSelected(getRandomNumber(anecdotes.length, selected))
  }

  const vote = (index) => {
    const copyOfVotes = [...votes]
    copyOfVotes[index] += 1
    setVotes(copyOfVotes)
  }

  // TODO: Anecdote with the most votes!
  return (
    <div>
      <Anecdote anecdoteText={anecdotes[selected]} votes={votes[selected]} />
      <Button action={() => vote(selected)} text='Vote!' />
      <Button action={setNewRandomIndex} text='Next anecdote!' />
    </div >
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)