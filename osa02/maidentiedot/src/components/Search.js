import React from 'react'

const Search = ({ searchTerm, setSearchTerm }) => {

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <p>Find countries</p>
      <input value={searchTerm} onChange={handleSearchInput}>
      </input>
    </div>
  )
}

export default Search