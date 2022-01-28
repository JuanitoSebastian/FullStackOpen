import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const userToSet = JSON.parse(loggedUserJSON)
      setUser(userToSet)
      blogService.setToken(userToSet.token)
    }
  }, [])

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const displayNotification = (message, type = 'notification') => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  return user === null
    ? (
      <div>
        <Notification message={notificationMessage} type={notificationType} />
        <LoginForm setUser={setUser} displayNotification={displayNotification} />
      </div>
    )
    : (
      <div>
        <Notification message={notificationMessage} type={notificationType} />
        <p>Hello {user.username}! You've logged in.</p> <button onClick={logOut}>Log out</button>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        <h2>Create new</h2>
        <BlogCreationForm blogs={blogs} setBlogs={setBlogs} displayNotification={displayNotification} />
      </div>
    )
}

export default App