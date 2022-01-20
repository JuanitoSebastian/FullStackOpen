const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (previous, current) => {
    return previous.likes > current.likes ? previous : current
  }

  return blogs.reduce(reducer)
}

const mostBlogs = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    authors[blog.author] = authors[blog.author] ?
      { author: blog.author, blogs: authors[blog.author].blogs + 1 } : { author: blog.author, blogs: 1 }
  })

  const reducer = (previous, current) => {
    return authors[previous].blogs < authors[current].blogs ?
      current : previous
  }

  const mostBlogsKey = Object.keys(authors).reduce(reducer)

  return authors[mostBlogsKey]
}

const mostLikes = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    authors[blog.author] = authors[blog.author] ?
      { ...authors[blog.author], likes: authors[blog.author].likes + blog.likes } : { author: blog.author, likes: blog.likes }
  })

  const reducer = (previous, current) => {
    return authors[previous].likes < authors[current].likes ?
      current : previous
  }

  const mostBlogsKey = Object.keys(authors).reduce(reducer)

  return authors[mostBlogsKey]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}