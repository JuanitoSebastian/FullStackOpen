import React from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import blogsHelper from '../utils/blogs_helper'

const BlogList = ({ blogs, setBlogs, displayNotification }) => {

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

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeBlogPost={likeBlogPost} deleteBlogPost={deleteBlogPost} />
      )}
    </div>
  )
}

export default BlogList