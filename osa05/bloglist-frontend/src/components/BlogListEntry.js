import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const BlogListEntry = ({ blog }) => {
  return (
    <div className="blog-post">
      <Link to={`blogs/${blog.id}`}><p>{blog.title} by {blog.author}</p></Link>
    </div>
  )

}

BlogListEntry.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
  })
}


export default BlogListEntry