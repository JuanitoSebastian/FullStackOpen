import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import BlogCreationForm from './BlogCreationForm'
import { act } from 'react-dom/test-utils'

let cont

test('renders initial content', () => {

  const createBlogPostMock = jest.fn()

  const component = render(
    <BlogCreationForm createBlogPost={createBlogPostMock} />
  )

  const button = component.getByText('Create new blog')

  expect(button).toBeDefined()

})

test('form opens when button is clicked', () => {

  const createBlogPostMock = jest.fn()

  const component = render(
    <BlogCreationForm createBlogPost={createBlogPostMock} />
  )

  const button = component.getByText('Create new blog')
  fireEvent.click(button)

  const form = component.container.querySelector('.blog-creation-form')

  expect(form).toHaveTextContent('Title:')
  expect(form).toHaveTextContent('Author:')
  expect(form).toHaveTextContent('Url:')
  expect(form).toHaveTextContent('Add blog')

})

test('submitting form calls the passed function correctly', async () => {

  const createBlogPostMock = jest.fn()

  await act(async () => {
    cont = render(
      <BlogCreationForm createBlogPost={createBlogPostMock} />
    )
  })

  const button = cont.getByText('Create new blog')
  fireEvent.click(button)

  const form = cont.container.querySelector('.blog-creation-form')
  const titleField = cont.container.querySelector('#title')
  const authorField = cont.container.querySelector('#author')
  const urlField = cont.container.querySelector('#url')

  const blogToSet = {
    title: 'How to install iOS 15.4 beta and try out Face ID With a Mask and Universal Control',
    author: 'Michael Potuck',
    url: 'https://9to5mac.com/2022/01/28/how-to-install-ios-15-beta/'
  }

  act(() => {
    fireEvent.change(titleField, {
      target: { value: blogToSet.title }
    })

    fireEvent.change(authorField, {
      target: { value: blogToSet.author }
    })

    fireEvent.change(urlField, {
      target: { value: blogToSet.url }
    })
  })


  act(() => {
    fireEvent.submit(form)
  })

  // Fixes the "not wrapped in act" errors 🙃
  await waitFor(() => {
    expect(createBlogPostMock.mock.calls).toHaveLength(1)
    expect(createBlogPostMock.mock.calls[0][0]).toEqual(blogToSet)
  })
})