import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(login({ username, password }))
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
          Username:
        <input id="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </label>
      <label>
          Password:
        <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </label>
      <button id="login-button" type="submit">Login</button>
    </form>
  )
}

export default LoginForm