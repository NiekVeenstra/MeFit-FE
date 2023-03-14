import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseCard = ( {exercise} ) => {
  return (
    <a href={`/exercise/${exercise.id}`}>
        <img src={exercise.gifUrl} alt={exercise.name} loading="lazy"/>
        <div>
            <button>
                {exercise.bodyPart}
            </button>
            <button>
                {exercise.target}
            </button>
            <p>
                {exercise.name}
            </p>
        </div>
    </a>
  )
}

export default ExerciseCard