import React, { useEffect } from 'react'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { setUser, clearUser } from './reducers/userReducer'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Notification from './components/Notification'

const App = () => {
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      dispatch(setUser(userToSet))
      blogService.setToken(userToSet.token)
    }
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  const logOut = () => {
    window.localStorage.clear()
    dispatch(clearUser)
  }

  return user === null
    ? (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
    : (
      <div>
        <Notification />
        <p>Hello {user.username}! You have logged in.</p> <button onClick={logOut}>Log out</button>
        <h2>blogs</h2>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        <h2>Create new</h2>
        <BlogCreationForm blogs={blogs} />
      </div>
    )
}

export default App