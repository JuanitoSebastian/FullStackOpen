import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import logger from '../utils/logger'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, displayNotification }) => {

  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const fetchedUser = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(fetchedUser)
      )
      blogService.setToken(fetchedUser.token)
      setUser(fetchedUser)
    } catch (excecption) {
      logger.error(`Logging in failed: ${excecption}`)
      displayNotification('Wrong username or password 😢', 'error')
    }
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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  displayNotification: PropTypes.func.isRequired
}

export default LoginForm