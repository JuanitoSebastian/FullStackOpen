import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [displayMore, setDisplayMore] = useState(false)

  return (
    displayMore
      ? <BlogLarge blog={blog} setDisplayMore={setDisplayMore} />
      : <BlogSmall blog={blog} setDisplayMore={setDisplayMore} />
  )
}

const BlogSmall = ({ blog, setDisplayMore }) => (
  <div className="blog-post">
    <p>{blog.title} by {blog.author} <button onClick={() => setDisplayMore(true)}>View</button></p>
  </div>
)

const BlogLarge = ({ blog, setDisplayMore }) => (
  <div className="blog-post">
    <p>{blog.title} by {blog.author}</p>
    <p>{blog.likes} likes <button onClick={() => console.log('Like')}>🤙 Like!</button></p>
    <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a><br />
    <p>Added by <i>{blog.user.username}</i></p>
    <button onClick={() => setDisplayMore(false)}>Hide</button>
  </div>
)

export default Blog