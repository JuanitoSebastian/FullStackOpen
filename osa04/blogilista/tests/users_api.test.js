const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})
  for (const userToCreate of helper.initialUsers) {
    const userObj = new User(userToCreate)
    await userObj.save()
  }
})

describe('get users tests', () => {
  test('initial users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
})


describe('create user tests', () => {
  test('user can be created', async () => {
    const userToCreate = {
      username: 'Paavo10',
      name: 'Paavo P',
      password: 'baba#EHOSTE#RAITIOTIEVAUNU'
    }

    const response = await api.post('/api/users')
      .send(userToCreate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersInDb = await helper.usersInDb()
    expect(usersInDb).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersInDb.map(user => user.username)
    expect(usernames).toContain(userToCreate.username)
  })

  test('user with invalid fields cannot be created', async () => {
    const userToCreate = {
      username: 'A',
      name: 'Arman',
      password: '12'
    }

    const response = await api.post('/api/users')
      .send(userToCreate)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersInDb = await helper.usersInDb()

    expect(usersInDb).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})