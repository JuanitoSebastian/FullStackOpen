import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlogPost, deleteBlogPost }) => {

  const [displayMore, setDisplayMore] = useState(false)

  const BlogSmall = () => (
    <div className="blog-post">
      <p>{blog.title} by {blog.author} <button id='expand-blog-button' onClick={() => setDisplayMore(true)}>View</button></p>
    </div>
  )

  const BlogLarge = () => (
    <div className="blog-post">
      <p>{blog.title} by {blog.author} <button onClick={() => setDisplayMore(false)}>Hide</button></p>
      <p>{blog.likes} likes <button id='like-blog-button' onClick={likeBlogPost}>Like</button></p>
      <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a><br />
      <p>Added by <i>{blog.user.username}</i></p>
      <button onClick={deleteBlogPost}>Remove</button>
    </div>
  )

  return (
    displayMore
      ? <BlogLarge />
      : <BlogSmall />
  )

}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  }),
  likeBlogPost: PropTypes.func.isRequired,
  deleteBlogPost: PropTypes.func.isRequired
}


export default Blog

