import React from 'react'
import { connect } from 'react-redux'
import { setFilter, resetFilter } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    if (event.target.value === '') {
      props.resetFilter()
      return
    }
    props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const ConnectedFilter = connect(null, { 
  setFilter, resetFilter 
})(Filter)

export default ConnectedFilter