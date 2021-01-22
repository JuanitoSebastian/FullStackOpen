import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => {
  const text = props.text
  const value = props.value
  const isPercentage = props.isPercentage ? props.isPercentage : false

  if (isPercentage) {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

}

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const all = () => {
    return bad + neutral + good
  }

  const raiting = () => {
    return good - bad
  }

  const average = () => {
    if (all() === 0) {
      return 0
    }
    return raiting() / all()
  }

  const positivePercentage = () => {
    if (good === 0) { return 0 }
    return 100 * (good / all())
  }

  return (
    <div>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text='Good' value={good} />
          <StatisticLine text='Neutral' value={neutral} />
          <StatisticLine text='Bad' value={bad} />
          <StatisticLine text='All' value={all()} />
          <StatisticLine text='Average' value={average()} />
          <StatisticLine text='Positive' value={positivePercentage()} isPercentage={true} />
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  const action = props.action
  const text = props.text

  return (
    <button onClick={action}>
      {text}
    </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button action={incrementGood} text='Good!' />
      <Button action={incrementNeutral} text='Neutral!' />
      <Button action={incrementBad} text='Bad!' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)