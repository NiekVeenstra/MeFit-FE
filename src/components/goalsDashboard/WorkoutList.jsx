import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { 
  Container, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  Checkbox, 
  Button 
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  list: {
    backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const WorkoutList = () => {
  const classes = useStyles();
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/', {
        headers: {
          'x-rapidapi-key': '<your-api-key>',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
        },
      });
      const data = await response.json();
      setExercises(data.exercises);
    };

    fetchExercises();
  }, []);

  const handleToggleExercise = (exercise) => {
    if (selectedExercises.includes(exercise)) {
      setSelectedExercises(selectedExercises.filter((e) => e !== exercise));
    } else if (selectedExercises.length < 7) {
      setSelectedExercises([...selectedExercises, exercise]);
    }
  };

  const handleSubmit = () => {
    console.log('Selected exercises:', selectedExercises);
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Typography variant="h4" component="h1" gutterBottom>
        Workout List
      </Typography>
      <List className={classes.list}>
        {exercises.map((exercise) => (
          <ListItem 
            key={exercise.id} 
            dense 
            button 
            onClick={() => handleToggleExercise(exercise)}
          >
            <Checkbox 
              checked={selectedExercises.includes(exercise)}
              disabled={selectedExercises.length === 7 && !selectedExercises.includes(exercise)}
            />
            <ListItemText primary={exercise.name} secondary={exercise.category} />
          </ListItem>
        ))}
      </List>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmit} 
        className={classes.button}
      >
        Submit
      </Button>
    </Container>
  );
};

export default WorkoutList;
