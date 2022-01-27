const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const blogsHelper = require('./blogs_api_test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  for (const blogToCreateDetails of blogsHelper.initalBlogs) {
    const blogToCreate = new Blog(blogToCreateDetails)
    await blogToCreate.save()
  }

  for (const userToCreate of blogsHelper.usersDetails) {
    await blogsHelper.createUser(userToCreate)
  }
})

describe('api get tests', () => {
  test('correct blogs returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogsHelper.initalBlogs.length)
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
    const userDetails = blogsHelper.usersDetails[0]

    const result = await api
      .post('/api/login')
      .send(userDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = result.body.token

    const blogToAdd = {
      title: 'Basics of Swift programming',
      author: 'Tim Apple',
      url: 'https://icloud.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogToAdd)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await blogsHelper.blogsInDb()
    expect(blogsAfterAdding).toHaveLength(blogsHelper.initalBlogs.length + 1)

    const contents = blogsAfterAdding.map(blog => blog.title)
    expect(contents).toContain(blogToAdd.title)
  })

  test('adding a blog with no likes results in a blog with 0 likes', async () => {
    const userDetails = blogsHelper.usersDetails[1]

    const result = await api
      .post('/api/login')
      .send(userDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = result.body.token

    const blogToAdd = {
      title: 'Cooking With Andy McCoy',
      author: 'Andy McCoy',
      url: 'https://blogger.com'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogToAdd)
      .expect(201)

    const blogsAfterAdding = await blogsHelper.blogsInDb()
    const blogToCheck = blogsAfterAdding[blogsAfterAdding.length - 1]
    expect(blogToCheck.likes).toBe(0)
    expect(blogToCheck.title).toBe(blogToAdd.title)
  })

  test('adding malformed blog causes error', async () => {
    const userDetails = blogsHelper.usersDetails[0]

    const result = await api
      .post('/api/login')
      .send(userDetails)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = result.body.token

    const blogToAdd = {
      author: 'Sauli Niinistö',
      url: 'https://instagram.com',
      likes: 24
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogToAdd)
      .expect(400)
  })

  test('adding a blog with no user token does not work', async () => {
    const blogDetails = {
      'title': 'Kirja 1',
      'author': 'Kirjailija A',
      'url': 'https://hs.fi',
      'likes': 1
    }

    await api
      .post('/api/blogs')
      .send(blogDetails)
      .expect(401)
  })
})


afterAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  mongoose.connection.close()
})