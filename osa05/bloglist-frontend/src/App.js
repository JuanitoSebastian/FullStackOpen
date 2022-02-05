import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { displayNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      setUser(userToSet)
      blogService.setToken(userToSet.token)
    }
  }, [])

  const blogs = useSelector(state => state.blogs)

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return user === null
    ? (
      <div>
        <Notification />
        <LoginForm setUser={setUser} displayNotification={displayNotification} />
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