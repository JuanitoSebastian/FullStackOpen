const intialState = {
  message: null
}

const notificationReducer = (state = intialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'DISPLAY_NOTIFICATION':
      return { ...state, message: action.data.content }

    case 'RESET_NOTIFICATION':
      return intialState

    default: 
      return state
  }
}

export const displayNotification = (message) => {
  return {
    type: 'DISPLAY_NOTIFICATION',
    data: {
      content: message
    }
  }
}

export const resetNotification = {
  type: 'RESET_NOTIFICATION'
}

export default notificationReducer