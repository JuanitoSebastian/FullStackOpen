import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min'
import { useSelector } from 'react-redux'
import React from 'react'

const User = () => {
  const users = useSelector(state => state.users)

  const userMatch = useRouteMatch('/users/:id')
  const userToDisplay = userMatch
    ? users.find(user => user.id === userMatch.params.id)
    : null

  if (!userToDisplay) {
    return null
  }

  return (
    <div>
      <h2>{userToDisplay.username}</h2>
      <h3>Added blogs</h3>
      <ul>
        {userToDisplay.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

export default User