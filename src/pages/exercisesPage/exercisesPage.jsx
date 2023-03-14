import React, { useState } from "react";

import SearchExercises from "../../components/searchExercises/SearchExercises";
import Exercises from "../../components/exercises/Exercises";
import { set } from "react-hook-form";

const ExercisesPage = () => {
    const [bodyPart, setBodyPart] = useState('all');
    const [exercises, setExercises] = useState([]); 

    return (
        <div>
            <SearchExercises 
            setExercises={setExercises}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
            />
            <Exercises 
            exercises={exercises} 
            setExercises={setExercises} 
            bodyPart={bodyPart} 
            />
        </div>
    )
}
export default ExercisesPage