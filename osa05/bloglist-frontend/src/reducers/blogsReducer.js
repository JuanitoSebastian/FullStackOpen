import blogsService from '../services/blogs'
import { displayNotification } from './notificationReducer'

const initialState = []

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_BLOGS':
    return sortBlogsByLikes(action.data)

  case 'NEW_BLOG':
    return [...state, action.data]

  case 'UPDATE_BLOG':
    return sortBlogsByLikes(
      state.map(blog =>
        blog.id !== action.data.id ? blog : action.data
      )
    )

  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)

  default:
    return state
  }
}

const sortBlogsByLikes = (blogsToSort) => {
  return [...blogsToSort].sort((previous, next) => previous.likes > next.likes ? 1 : -1).reverse()
}

export const initBlogs = () => {
  return async dispatch => {
    const fetchedBlogs = await blogsService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      data: fetchedBlogs
    })
  }
}

export const createNewBlog = (blogToCreate) => {
  return async dispatch => {
    const blogObject = await blogsService.create(blogToCreate)
    dispatch({
      type: 'NEW_BLOG',
      data: blogObject
    })
  }
}

export const likeBlog = (blogToLike) => {
  return async dispatch => {
    blogToLike = { ...blogToLike, likes: blogToLike.likes + 1 }
    try {
      const blogObj = await blogsService.update(blogToLike)
      dispatch({
        type: 'UPDATE_BLOG',
        data: blogObj
      })
    } catch (error) {
      dispatch(displayNotification(`Could not like ${blogToLike.title} 😢`, 'error'))
    }
  }
}

export const deleteBlog = (blogToDelete) => {
  return async dispatch => {
    try {
      await blogsService.remove(blogToDelete.id)
      dispatch({
        type: 'DELETE_BLOG',
        data: blogToDelete
      })
    } catch (error) {
      dispatch(displayNotification(`Could not delete ${blogToDelete.title} 😢`, 'error'))
    }
  }
}

export default blogsReducer
