import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { useRouteMatch, useHistory } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const blogs = useSelector(state => state.blogs)
  const blogMatch = useRouteMatch('/blogs/:id')
  const blogToDisplay = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  if (!blogToDisplay) {
    return null
  }

  const handleLike = () => {
    dispatch(likeBlog(blogToDisplay))
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${blogToDisplay.title}?`)) {
      dispatch(deleteBlog(blogToDisplay))
      history.push('/')
    }
  }

  return (
    <div className="blog-post">
      <h2>{blogToDisplay.title} by {blogToDisplay.author}</h2>
      <p>{blogToDisplay.likes} likes</p>
      <p>Added by <i>{blogToDisplay.user.username}</i> <button type='button' onClick={handleLike}>Like</button></p>
      <button type='button' onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default Blog

