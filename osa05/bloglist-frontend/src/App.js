import React, { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import blogsHelper from './utils/blogs_helper'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await blogService.getAll()
      setBlogs(blogsHelper.sortBlogsByLikes(fetchedBlogs))
    }

    fetchBlogs()
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
        <BlogList blogs={blogs} setBlogs={setBlogs} />
        <h2>Create new</h2>
        <BlogCreationForm blogs={blogs} setBlogs={setBlogs} displayNotification={displayNotification} />
      </div>
    )
}

export default App