import React from 'react'

const Notification = ({ message }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (message === null) {
    return (
      <></>
    )
  }

  return (
    <div style={style}>
      { message }
    </div>
  )
}

export default Notification