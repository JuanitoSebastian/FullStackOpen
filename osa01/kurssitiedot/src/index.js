import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {


  const courseList = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Funamentals of React',
        exercices: 10
      },
      {
        name: 'Using props to pass data',
        exercices: 7
      },
      {
        name: 'State of a component',
        exercices: 14
      }
    ]
  }

  return (
    <div>
      <Header course={courseList} />
      <Content course={courseList} />
      <Total course={courseList} />
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  let partsOfCourse = props.course.parts
  return (
    <div>
      {partsOfCourse.map(function(object){ return <GetSomeContent course={object}/>})}
    </div>
  )
}

const GetSomeContent = (props) => {
  console.log(props)
  return (
    <p>{props.course.name}. Number of exercices: {props.course.exercices}</p>
  )
}

const Total = (props) => {
  let sum = 0
  let partsOfCourse = props.course.parts
  partsOfCourse.map(value => sum =+ value.exercices)
  return (
    <p>Number of exercises {sum}</p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
