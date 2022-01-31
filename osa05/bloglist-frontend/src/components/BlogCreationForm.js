import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogCreationForm = ({ createBlogPost }) => {

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

    await createBlogPost(blogToCreate)

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
          <button onSubmit={handleSubmit}>Add blog</button>
        </form>
        <button onClick={() => setFormVisible(false)}>Cancel</button>
      </div>
    </div>
  )
}

BlogCreationForm.propTypes = {
  createBlogPost: PropTypes.func.isRequired
}

export default BlogCreationForm