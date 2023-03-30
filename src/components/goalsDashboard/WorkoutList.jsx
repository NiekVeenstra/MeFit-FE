import React, { useState, useEffect } from "react";
import { Button, List, ListItem, ListItemText } from "@mui/material";
import { useListCheck, useWorkout } from "../../context/UserContext";
import styled from "styled-components";

const StyledContainer = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.mainColor};
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);

  const { listWorkout, setListWorkout } = useListCheck();
  const { saveWorkout, setSaveWorkout } = useWorkout();
  const [selectedNames, setSelectedNames] = useState([]);

  const workoutsTest = [
    {
      name: "workout 1",
      names: [
        { title: "Deadlift", complete: false },
        { title: "3/4 Sit-up", complete: false },
        { title: "Air bike", complete: false },
      ],
    },
    {
      name: "workout 2",
      names: [
        { title: "Back pec stretch", complete: false },
        { title: "Band wrist curl", complete: false },
        { title: "Arnold press", complete: false },
        { title: "Dumbbells", complete: false },
      ],
    },
    {
      name: "workout 3",
      names: [
        { title: "Backward jump", complete: false },
        { title: "Dumbbells", complete: false },
        { title: "Incline close-grip", complete: false },
        { title: "Deadlift", complete: false },
      ],
    },
    {
      name: "workout 4",
      names: [
        { title: "Back and forth step", complete: false },
        { title: "Neck stretch", complete: false },
        { title: "Sit-up", complete: false },
      ],
    },
  ];

  const handleClick = (name) => {
    setSelectedNames(name);
  };

  const handleSaveClick2 = () => {
    setListWorkout(false);
    setSaveWorkout(selectedNames);
  };

  return (
    <StyledOuterContainer>
      <List>
        {workoutsTest.map((workout, index) => (
          <StyledContainer key={`workout-${index}`}>
            <ListItem button onClick={() => handleClick(workout.names)}>
              {workout.name}
              <List>
                {workout.names.map((nameItem, index) => (
                  <ListItem
                  key={`workout-${index}-exercise-${index}`}
                    style={{
                      textDecoration: nameItem.completed ? "line-through" : "none",
                    }}
                  >
                    {nameItem.title}
                  </ListItem>
                ))}
              </List>
            </ListItem>
          </StyledContainer>
        ))}
      </List>
      <h3>Selected Exercises:</h3>
      <StyledUl>
        {selectedNames.map((nameItem, index) => (
          <li key={index}>{nameItem.title}</li>
        ))}
      </StyledUl>
      {selectedNames.length > 0 && (
        <Button variant="contained" color="primary" onClick={handleSaveClick2}>
          Save
        </Button>
      )}
    </StyledOuterContainer>
  );
};

export default WorkoutList;
