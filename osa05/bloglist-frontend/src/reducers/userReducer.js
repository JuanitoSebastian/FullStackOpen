import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayNotification } from './notificationReducer'

const initialState = null

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return initialState
  default:
    return state
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const fetchedUser = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(fetchedUser)
      )
      blogService.setToken(fetchedUser.token)
      dispatch(setUser(fetchedUser))
    } catch (error) {
      dispatch(displayNotification('Wrong username or password 😢', 'error'))
    }
  }
}

export const setUser = (userToSet) => {
  return {
    type: 'SET_USER',
    data: userToSet
  }
}

export const clearUser = {
  type: 'CLEAR_USER'
}

export default userReducer