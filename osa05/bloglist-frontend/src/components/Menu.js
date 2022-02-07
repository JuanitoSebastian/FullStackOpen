import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearUser } from '../reducers/sessionReducer'
import { Link } from 'react-router-dom'

const Menu = () => {
  const dispatch = useDispatch()
  const currentSession = useSelector(state => state.session)

  const logOut = () => {
    window.localStorage.clear()
    dispatch(clearUser)
  }

  return (
    <div>
      <ul className='navigation'>
        <li><Link to='/'>Blogs</Link></li>
        <li><Link to='/users'>Users</Link></li>
        <li>Hello {currentSession.username}! You have logged in.</li>
        <li><button onClick={logOut}>Log out</button></li>
      </ul>
    </div>
  )
}

export default Menu