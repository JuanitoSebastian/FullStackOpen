import React from 'react'

const Notification = ({ message, type }) => {

  if (type) {
    return (
      <div className='notification' id={type}>{message}</div>
    )
  } else {
    return (
      <></>
    )
  }
}

export default Notification