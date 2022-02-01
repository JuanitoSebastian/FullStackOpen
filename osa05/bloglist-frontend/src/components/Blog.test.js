import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blogPost = {
  title: 'Nvidia may abandon its $40B ARM acquisition',
  author: 'Jonny Evans',
  likes: 5,
  url: 'https://www.computerworld.com/article/3648064/nvidia-may-abandon-its-40b-arm-acquisition.html',
  user: {
    username: 'juanito'
  }
}

test('renders content', () => {

  const likeBlogPostMock = jest.fn()
  const deleteBlogPostMock = jest.fn()

  const component = render(
    <Blog blog={blogPost} likeBlogPost={likeBlogPostMock} deleteBlogPost={deleteBlogPostMock} />
  )

  const div = component.container.querySelector('.blog-post')
  expect(div).toHaveTextContent(`${blogPost.title} by ${blogPost.author}`)
})

test('blog details are displayed when view button is pressed', () => {
  const likeBlogPostMock = jest.fn()
  const deleteBlogPostMock = jest.fn()

  const component = render(
    <Blog blog={blogPost} likeBlogPost={likeBlogPostMock} deleteBlogPost={deleteBlogPostMock} />
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const div = component.container.querySelector('.blog-post')

  expect(div).toHaveTextContent(`${blogPost.title} by ${blogPost.author}`)
  expect(div).toHaveTextContent(`${blogPost.likes} likes`)
  expect(div).toHaveTextContent(`${blogPost.url}`)
  expect(div).toHaveTextContent(`${blogPost.user.username}`)
})

test('blog like button is called correctly', () => {
  const likeBlogPostMock = jest.fn()
  const deleteBlogPostMock = jest.fn()

  const component = render(
    <Blog blog={blogPost} likeBlogPost={likeBlogPostMock} deleteBlogPost={deleteBlogPostMock} />
  )

  const viewButton = component.getByText('View')
  fireEvent.click(viewButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeBlogPostMock.mock.calls).toHaveLength(2)

})