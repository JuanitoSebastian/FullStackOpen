import React from 'react'

const Course = ({ course }) => {

  const exerciseCount = () => {
    const total = course.parts.map(e => e.exercises).reduce((s, p) => {
      return s + p
    })
    return total
  }

  return (
    <div>
      <Header name={course.name} />
      <Content partsOfCourse={course.parts} />
      <p>{exerciseCount()} in total</p>
    </div>
  )
}


const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ partsOfCourse }) => {
  return (
    <div>
      {partsOfCourse.map((part) =>
        <CoursePart part={part} key={part.id} />
      )}
    </div>
  )
}

const CoursePart = ({ part }) => {
  return (
    <p>{part.name}. Number of exercices: {part.exercises}</p>
  )
}

export default Course