const { text } = require('express')
const listHelper = require('../utils/list_helper')

const blogs = [
  {
    id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('empty list returns 0', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('one blog array returns likes equal to the likes of the blog', () => {
    const singleBlog = blogs[0]
    const result = listHelper.totalLikes([singleBlog])
    expect(result).toBe(singleBlog.likes)
  })

  test('list with multiple blogs returns correct sum of likes', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('list with one blog returns that blog', () => {
    const singleBlog = blogs[0]
    const result = listHelper.favoriteBlog([singleBlog])
    expect(result.id).toBe(singleBlog.id)
  })

  test('list with multiple blogs returns correct blog', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result.id).toBe(blogs[2].id)
  })
})

describe('most blogs', () => {
  test('list with one blog returns correct author', () => {
    const singleBlog = blogs[0]
    const result = listHelper.mostBlogs([singleBlog])
    expect(result.author).toBe(singleBlog.author)
    expect(result.blogs).toBe(1)
  })

  test('list with multiple blogs returns correct author', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result.author).toBe('Robert C. Martin')
    expect(result.blogs).toBe(3)
  })
})

describe('most likes', () => {
  test('list with one blog returns correct author', () => {
    const singleBlog = blogs[0]
    const result = listHelper.mostLikes([singleBlog])
    expect(result.author).toBe('Michael Chan')
    expect(result.likes).toBe(7)
  })

  test('list with multiple blogs returns correct author', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result.author).toBe('Edsger W. Dijkstra')
    expect(result.likes).toBe(17)
  })
})