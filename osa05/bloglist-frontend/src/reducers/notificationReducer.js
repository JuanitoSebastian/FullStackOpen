const initialState = {
  type: 'notification',
  message: null
}

let timer

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'DISPLAY_NOTIFICATION':
    return action.data

  case 'RESET_NOTIFICATION':
    return initialState

  default:
    return state
  }
}

export const displayNotification = (message, type = 'notification', time = 5) => {
  clearTimeout(timer)
  return async dispatch => {
    dispatch({
      type: 'DISPLAY_NOTIFICATION',
      data: {
        message,
        type
      }
    })

    timer = setTimeout(() => {
      dispatch(resetNotification)
    }, (time * 1000))
  }
}

export const resetNotification = {
  type: 'RESET_NOTIFICATION'
}

export default notificationReducer