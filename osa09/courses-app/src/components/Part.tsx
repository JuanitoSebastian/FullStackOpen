import React from 'react';
import { CoursePart } from '../types';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {

  switch (coursePart.type) {
  case 'normal':
    return (
      <div>
        <h3>{coursePart.name}</h3>
        <i>{coursePart.description}</i>
        <p>A total of {coursePart.exerciseCount} exercises</p>
      </div>
    )
  case 'groupProject': 
    return (
      <div>
        <h3>{coursePart.name}</h3>
        <p>A total of {coursePart.exerciseCount} exercises</p>
        <p>A total of {coursePart.groupProjectCount} group exercises</p>
      </div>
    )
  case 'submission':
    return (
      <div>
        <h3>{coursePart.name}</h3>
        <i>{coursePart.description}</i>
        <p>A total of {coursePart.exerciseCount} exercises</p>
        <a href={coursePart.exerciseSubmissionLink} target='_blank' rel='noreferrer'>Submit exercises!</a>
      </div>
    )
  case 'special':
    return(
      <div>
        <h3>{coursePart.name}</h3>
        <i>{coursePart.description}</i>
        <p>A total of {coursePart.exerciseCount} exercises</p>
        <b>Completing course requires knoledge of:</b>
        <ul>
          {coursePart.requirements.map(requirement =>
            <li key={requirement}>{requirement}</li>  
          )}
        </ul>
      </div>
    )
  default:
    return assertNever(coursePart);
  }

};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;