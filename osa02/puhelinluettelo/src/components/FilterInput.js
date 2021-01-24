import React from 'react'

const FilterInput = ({ filterByName, setFilterByName }) => {

  const handleFilterChange = (event) => {
    setFilterByName(event.target.value)
  }

  return (
    <div>
      <input onChange={handleFilterChange} value={filterByName} />
    </div>
  )
}

export default FilterInput