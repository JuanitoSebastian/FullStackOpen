import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'
import { displayNotification } from '../reducers/notificationReducer'

const BlogCreationForm = () => {

  const dispatch = useDispatch()

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

    dispatch(createNewBlog(blogToCreate))
    dispatch(displayNotification(`${blogToCreate.title} was added 🤠`))

    setTitle('')
    setAuthor('')
    setUrl('')
    setFormVisible(false)
  }

  return (
    <div>
      <div style={showWhenVisible}>
        <button id='show-blog-form-button' onClick={() => setFormVisible(true)}>Create new blog</button>
      </div>
      <div style={hideWhenVisible}>
        <form onSubmit={handleSubmit} className='blog-creation-form'>
          <label>
            Title:
            <input id='title' type="text" value={title} onChange={({ target }) => setTitle(target.value)}></input>
          </label><br />
          <label>
            Author:
            <input id='author' type="text" value={author} onChange={({ target }) => setAuthor(target.value)}></input>
          </label><br />
          <label>
            Url:
            <input id='url' type="url" value={url} onChange={({ target }) => setUrl(target.value)}></input>
          </label><br />
          <button id='submit-blog-button' onSubmit={handleSubmit}>Add blog</button>
        </form>
        <button onClick={() => setFormVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default BlogCreationForm