import React, { useState } from 'react'

const Blog = ({ blog, likeBlogPost, deleteBlogPost }) => {

  const [displayMore, setDisplayMore] = useState(false)

  const BlogSmall = () => (
    <div className="blog-post">
      <p>{blog.title} by {blog.author} <button onClick={() => setDisplayMore(true)}>View</button></p>
    </div>
  )
  
  const BlogLarge = () => (
    <div className="blog-post">
      <p>{blog.title} by {blog.author} <button onClick={() => setDisplayMore(false)}>Hide</button></p>
      <p>{blog.likes} likes <button onClick={() => likeBlogPost(blog)}>Like</button></p>
      <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a><br />
      <p>Added by <i>{blog.user.username}</i></p>
      <button onClick={() => deleteBlogPost(blog)}>Remove</button>
    </div>
  )

  return (
    displayMore
      ? <BlogLarge />
      : <BlogSmall />
  )

}



export default Blog