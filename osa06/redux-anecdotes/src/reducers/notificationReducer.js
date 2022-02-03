const intialState = {
  message: null
}

const notificationReducer = (state = intialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'DISPLAY_NOTIFICATION':
      return { ...state, message: action.data }

    case 'RESET_NOTIFICATION':
      return intialState

    default: 
      return state
  }
}

export const displayNotification = (message, time = 5) => {
  return async dispatch => {
    dispatch({
      type: 'DISPLAY_NOTIFICATION',
      data: message
    })

    setTimeout(() => {
      dispatch(resetNotification)
    }, (time * 1000))
  }
}

export const resetNotification = {
  type: 'RESET_NOTIFICATION'
}

export default notificationReducer