import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { useListCheck } from '../../context/UserContext';

const EXERCISES_API_URL = 'https://exercisedb.p.rapidapi.com/exercises/';
const GOALS_API_URL = 'https://mefitapi-production.up.railway.app/api/Goals';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const { listWorkout, setListWorkout } = useListCheck();

  useEffect(() => {
    // Fetch the exercises from the API
    fetch(EXERCISES_API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY // Replace with your RapidAPI key
      }
    })
      .then(response => response.json())
      .then(data => {
        // Shuffle the exercises array
        const shuffledExercises = data.sort(() => 0.5 - Math.random());
        // Take the first 3 exercises of each workout
        const workouts = shuffledExercises.slice(0, Math.min(shuffledExercises.length, 21)).reduce((acc, val, i, arr) => {
          if (i % 3 === 0) {
            acc.push(arr.slice(i, i + 3));
          }
          return acc;
        }, []);
        setWorkouts(workouts);
      })
      .catch(error => console.error(error));
  }, []);

  const handleExerciseClick = (exercise) => {
    // Check if the exercise is already selected
    if (!selectedExercises.includes(exercise)) {
      // Check if we have already selected 7 exercises
      if (selectedExercises.length < 7) {
        setSelectedExercises([...selectedExercises, exercise]);
      } else {
        alert('You can only select up to 7 exercises');
      }
    } else {
      setSelectedExercises(selectedExercises.filter(e => e !== exercise));
    }
  }

  const handleSaveClick = () => {

    setListWorkout(false);
    // Save the selected exercises to the user database
    fetch(GOALS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        exercises: selectedExercises
      })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    // Clear the selection
    setSelectedExercises([]);
  }

  return (
    <div>
      <List>
        {workouts.map((workout, i) => (
          <ListItem key={i}>
            <ListItemText primary={`Workout ${i + 1}`} />
            <List>
              {workout.map((exercise, j) => (
                <ListItem
                  key={`${i}-${j}`}
                  button
                  selected={selectedExercises.includes(exercise)}
                  onClick={() => handleExerciseClick(exercise)}
                >
                  <ListItemText primary={exercise.name} />
                </ListItem>
              ))}
            </List>
          </ListItem>

        ))}
      </List>
      {selectedExercises.length > 0 && (
        <Button variant="contained" color="primary" onClick={handleSaveClick}>Save</Button>
      )}
    </div>
  );
};

export default WorkoutList;
