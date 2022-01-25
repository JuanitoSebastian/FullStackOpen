const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogIdToDelete = request.params.id

  await Blog.findByIdAndRemove(blogIdToDelete)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  const blogIdToUpdate = request.params.id
  const body = request.body

  const blogDetails = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogIdToUpdate, blogDetails, { new: true })
  if (!updatedBlog) {
    const error = { name: 'NotFoundError', message: 'Blog was not found' }
    next(error)
    return
  }

  response.json(updatedBlog)

})

module.exports = blogsRouter