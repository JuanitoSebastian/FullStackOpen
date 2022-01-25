const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
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

const initialUsers = [
  {
    username: 'Aapo94',
    name: 'Aapo Ahlström',
    passwordHash: 'maajoukkue#kapiteelikirjain#PYSÄKÖINTIMITTARI'
  },
  {
    username: 'Anna2021',
    name: 'Anna Kataja',
    passwordHash: 'VARPAISILLAAN#LEHTINAINEN#surettaa'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blogs => blogs.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user =>  user.toJSON())
}
module.exports = {
  initalBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}