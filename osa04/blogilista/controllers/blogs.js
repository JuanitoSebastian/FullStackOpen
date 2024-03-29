const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {

  const result = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(result)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  if (request.user === null) {
    return response.status(401).json({ error: 'Login to add blogs' })
  }

  const user = await User.findById(request.user.id)
  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    await Blog.populate(savedBlog, { path: 'user' })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  if (request.user === null) {
    return response.status(401).json({ error: 'Login to delete blogs' })
  }

  const blogIdToDelete = request.params.id

  const blogToDelete = await Blog.findById(blogIdToDelete)
  if (blogToDelete.user.toString() === request.user.id) {
    await Blog.findByIdAndDelete(blogToDelete._id)
    response.status(204).end()
  } else {
    return response.status(403).json({ error: 'Not authorized to delete' })
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  if (request.user === null) {
    return response.status(401).json({ error: 'Login to edit blogs' })
  }

  const blogIdToUpdate = request.params.id
  const body = request.body

  const blogUpdateDetails = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(blogIdToUpdate, blogUpdateDetails, { new: true })
  if (!updatedBlog) {
    const error = { name: 'NotFoundError', message: 'Blog was not found' }
    next(error)
    return
  }

  await Blog.populate(updatedBlog, { path: 'user' })

  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter