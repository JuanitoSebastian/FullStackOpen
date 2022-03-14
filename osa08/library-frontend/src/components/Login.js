import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries/queries'

const Login = (props) => {

  if (!props.show) {
    return null
  }

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.displayNotification('Login failed!')
      console.log(error)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-app-user-token', token)
    }
  }, [result.data])

  const handleSubmit = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    login({ variables: { username, password } })
    props.displayNotification(`Welcome ${username}!`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>Username: </label>
        <input type='text' name='username' /><br />
        <label htmlFor='password'>Password: </label>
        <input type='password' name='password' /><br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login