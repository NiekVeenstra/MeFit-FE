import React, { useState } from "react";

import SearchExercises from "../../components/searchExercises/searchExercises";

const ExercisesPage = () => {
    const [bodyPart, setBodyPart] = useState('all');
    const [exercises, setExercises] = useState([]);
    return (
        <div>
            <SearchExercises />
        </div>
    )
}
export default ExercisesPage