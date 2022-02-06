import React, { useEffect } from 'react'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { setUser, clearUser } from './reducers/sessionReducer'
import { initUsers } from './reducers/usersReducer'

import {
  Switch, Route
} from 'react-router-dom'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Notification from './components/Notification'
import UsersView from './components/UsersView'

const App = () => {
  const currentSession = useSelector(state => state.session)
  const blogs = useSelector(state => state.blogs)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      dispatch(setUser(userToSet))
      blogService.setToken(userToSet.token)
    }
  }, [dispatch])

  const logOut = () => {
    window.localStorage.clear()
    dispatch(clearUser)
  }

  return currentSession === null
    ? (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
    : (
      <div>
        <Notification />
        <p>Hello {currentSession.username}! You have logged in.</p> <button onClick={logOut}>Log out</button>
        <h2>blogs</h2>
        <Switch>
          <Route path='/users'>
            <UsersView />
          </Route>
          <Route path='/'>
            <div>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>
            <h2>Create new</h2>
            <BlogCreationForm />
          </Route>
        </Switch>
      </div>
    )
}

export default App