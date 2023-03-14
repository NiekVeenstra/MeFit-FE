import React, {useEffect, useState} from "react";
import { exerciseOptions, fetchData } from "../../utils/fetchData";

import ExercisesBox from "../exercisesBox/exercisesBox";

const SearchExercises = ( /*{setExercises, bodyPart, setBodyPart}*/ ) => {
    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);

            setBodyParts(['all', ...bodyPartsData]);
        }
    })

    const handleSearch = async () => {
        if(search) {
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/', exerciseOptions);

            const searchedExercises = exercisesData.filter(
                (exercise) => exercise.name.toLowerCase().includes(search)
                || exercise.target.toLowerCase().includes(search)
                || exercise.equipment.toLowerCase().includes(search)
                || exercise.bodyPart.toLowerCase().includes(search)
            ) 
            
            console.log(searchedExercises);

            setSearch('');
            setExercises(searchedExercises);
        }
    } 

    return (
        <div>
            <h1>Search Exercises</h1>
            <div>
                <input onChange={(e) => setSearch(e.target.value.toLowerCase())} type="text" placeholder="deadlift" />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <ExercisesBox data={bodyParts} /*bodyPart={bodyPart} setBodyPart={setBodyPart}*/ />
            </div>
        </div>
        
    )
}

export default SearchExercises;
