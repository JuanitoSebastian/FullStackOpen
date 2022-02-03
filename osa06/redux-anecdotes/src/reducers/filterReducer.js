const initialState = null

const filterReducer = (state = initialState, action) => {
  console.log(`filter state: ${state}`)
  switch (action.type) {
    case 'SET_FILTER':
      return action.data.content

    case 'RESET_FILTER':
      return initialState

    default:
      return state
  }
}

export const setFilter = (text) => {
  return {
    type: 'SET_FILTER',
    data: {
      content: text
    }
  }
}

export const resetFilter = () =>  {
  return {
    type: 'RESET_FILTER'
  }
}

export default filterReducer