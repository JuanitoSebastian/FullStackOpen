const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogToCreate = new Blog(helper.initalBlogs[0])
  await blogToCreate.save()
  blogToCreate = new Blog(helper.initalBlogs[1])
  await blogToCreate.save()
})

describe('api get tests', () => {
  test('correct blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initalBlogs.length)
  })

  test('blogs are formatted correctly', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
      expect(blog._id).toBeUndefined()
      expect(blog.__v).toBeUndefined()
    })
  })
})

describe('api post tests', () => {
  test('adding a blog works correctly', async () => {
    const blogToAdd = {
      title: 'Basics of Swift programming',
      author: 'Tim Apple',
      url: 'https://icloud.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await helper.blogsInDb()
    expect(blogsAfterAdding).toHaveLength(helper.initalBlogs.length + 1)

    const contents = blogsAfterAdding.map(blog => blog.title)
    expect(contents).toContain(blogToAdd.title)

  })

  test('adding a blog with no likes results in a blog with 0 likes', async () => {
    const blogToAdd = {
      title: 'Cooking With Andy McCoy',
      author: 'Andy McCoy',
      url: 'https://blogger.com'
    }

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(201)

    const blogsAfterAdding = await helper.blogsInDb()
    const blogToCheck = blogsAfterAdding[blogsAfterAdding.length - 1]
    expect(blogToCheck.likes).toBe(0)
    expect(blogToCheck.title).toBe(blogToAdd.title)
  })

  test('adding malformed blog causes error', async () => {
    const blogToAdd = {
      author: 'Sauli Niinistö',
      url: 'https://instagram.com',
      likes: 24
    }

    await api
      .post('/api/blogs')
      .send(blogToAdd)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})