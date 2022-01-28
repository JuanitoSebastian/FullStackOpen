import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogCreationForm = ({ blogs, setBlogs, displayNotification }) => {

  const [title, setTitle] = useState([])
  const [author, setAuthor] = useState([])
  const [url, setUrl] = useState([])
  const [formVisible, setFormVisible] = useState(false)

  const showWhenVisible = {
    display: formVisible ? 'none' : ''
  }

  const hideWhenVisible = {
    display: formVisible ? '' : 'none'
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const blogToCreate = {
      title: title,
      author: author,
      url: url
    }

    const newBlogObj = await blogService.create(blogToCreate)
    setBlogs([...blogs, newBlogObj])

    displayNotification(`${newBlogObj.title} by ${newBlogObj.author} was added! 🤠`)

    setTitle('')
    setAuthor('')
    setUrl('')
    setFormVisible(false)
  }

  return (
    <div>
      <div style={showWhenVisible}>
        <button onClick={() => setFormVisible(true)}>Create new blog</button>
      </div>
      <div style={hideWhenVisible}>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)}></input>
          </label><br />
          <label>
            Author:
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)}></input>
          </label><br />
          <label>
            Url:
            <input type="url" value={url} onChange={({ target }) => setUrl(target.value)}></input>
          </label><br />
          <button onSubmit={handleSubmit}>Add blog</button>
        </form>
        <button onClick={() => setFormVisible(false)}>Cancel</button>
      </div>
    </div>
  )

}

export default BlogCreationForm