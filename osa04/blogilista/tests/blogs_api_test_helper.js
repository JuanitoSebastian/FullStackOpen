const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const bcrypt = require('bcrypt')

const initalBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const usersDetails = [
  {
    username: 'Aapo94',
    name: 'Aapo Ahlström',
    password: 'maajoukkue#kapiteelikirjain#PYSÄKÖINTIMITTARI'
  },
  {
    username: 'Anna2021',
    name: 'Anna Kataja',
    password: 'VARPAISILLAAN#LEHTINAINEN#surettaa'
  }
]

const createUser = async userDetails => {
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(userDetails.password, saltRounds)

  const user = new User({
    username: userDetails.username,
    name: userDetails.name,
    passwordHash: passwordHash
  })

  await user.save()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blogs => blogs.toJSON())
}

module.exports = {
  initalBlogs,
  usersDetails,
  blogsInDb,
  createUser
}