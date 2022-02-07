import usersService from '../services/users'

const initialState = []

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.data

  default:
    return state
  }
}

export const initUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'SET_USERS',
      data: users
    })
  }
}

export default usersReducer