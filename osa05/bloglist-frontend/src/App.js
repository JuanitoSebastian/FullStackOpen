import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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

  const createBlogPost = async (blogPostToCreate) => {
    const newBlogObj = await blogService.create(blogPostToCreate)
    setBlogs([...blogs, newBlogObj])

    displayNotification(`${newBlogObj.title} by ${newBlogObj.author} was added! 🤠`)
  }

  const deleteBlogPost = async (blog) => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        displayNotification(`${blog.title} was removed 🤠`)
      } catch (exception) {
        displayNotification(`Unable to delete ${blog.title} 😔`, 'error')
      }
    }
  }

  const likeBlogPost = async (blog) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      await blogService.update(updatedBlog)
      setBlogs(
        blogsHelper.sortBlogsByLikes(
          blogs.map(blogObject => blogObject.id !== blog.id
            ? blogObject
            : updatedBlog
          )
        )
      )
    } catch (exception) {
      console.log(exception)
    }
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
        <p>Hello {user.username}! You have logged in.</p> <button onClick={logOut}>Log out</button>
        <h2>blogs</h2>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} deleteBlogPost={() => deleteBlogPost(blog)} likeBlogPost={() => likeBlogPost(blog)} />
          )}
        </div>
        <h2>Create new</h2>
        <BlogCreationForm blogs={blogs} createBlogPost={createBlogPost} />
      </div>
    )
}

export default App