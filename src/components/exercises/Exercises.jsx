import React, { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../../utils/fetchData";
import ExerciseCard from "../exerciseCard/ExerciseCard";

const PAGE_SIZE = 10; // The number of exercises to show per page

const Exercises = ({ exercises, setExercises, bodyPart }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the start and end indexes of the exercises to show on the current page
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    // Slice the exercises array to show only the exercises on the current page
    const exercisesToShow = exercises.slice(startIndex, endIndex);

    const totalPages = Math.ceil(exercises.length / PAGE_SIZE); // Calculate the total number of pages

    useEffect(() => {
      const fetchExercisesData = async () => {
        let exercisesData = [];

        if(bodyPart === 'all') {
            exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/', exerciseOptions);
        } else {
            exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);    
        }

        setExercises(exercisesData);
      }

      fetchExercisesData();
    }, [bodyPart])
    

    return (
        <div>
        Showing results
        <div>
            {exercisesToShow.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
      <div>
        {/* Display page numbers and buttons */}
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            disabled={currentPage === page}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Exercises;
