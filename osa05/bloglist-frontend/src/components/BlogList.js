import React from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'
import blogsHelper from '../utils/blogs_helper'

const BlogList = ({ blogs, setBlogs }) => {

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
        <Blog key={blog.id} blog={blog} likeBlogPost={likeBlogPost} />
      )}
    </div>
  )
}

export default BlogList