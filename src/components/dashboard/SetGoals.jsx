import React from "react";
import Button2 from "../button";
import { useState, useEffect } from "react";
import { getWorkouts } from '../../api/apiCall/workouts'
import { updateWorkout } from '../../api/apiCall/updateWorkout'
import { useGoals } from "../../context/UserContext";
import WorkoutList from "../goalsDashboard/WorkoutList";
import ProgramsList from "../goalsDashboard/ProgramsList";
import { Button } from '@mui/material';
import styled from "styled-components";


const ShowDetailsButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  border-radius: 15px;
  cursor: pointer;
  width: 8rem;
  text-align: center;
  background-color: ${(props) => props.theme.colors.mainColor};
  align-items: center;
`;

const StyleGoalslist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: calc(16vh - 3.3rem);
  background-color: ${(props) => props.theme.colors.mainColor};
  color: white;
  font-size: 1rem;
  text-align: center;
  margin: 0.1rem;
  padding: 0.6rem;
  border-radius: 1.5rem;
  }
`;

const SetGoals = () => {
    const days = "from this date to this date";
    const status = "in progress";
    // const goals = [];
    const [goals, setGoals] = useState([])
    const fetchData = async () => {
        const workoutGoals = await getWorkouts();
        setGoals(workoutGoals);

    };

    const ShowAllWorkouts = () => {
        if (goals.length === 0) { 
            const handleClick = () => {
                WorkoutList(); // call the WorkoutList function
              };
            return (
                <div>
                    <>
                        <h3>You have no workouts yet!</h3>
                        <p>Click the button below to add a new workouts or a full program!</p>
                        <Button variant="contained" onClick={handleClick}>View Workout List</Button> {/* add a button to call the WorkoutList function */}
                    </>
                </div>
            );
        } else {
            return (
                <StyleGoalslist>
                    <h3>You have {goals.length} workouts!</h3>
                </StyleGoalslist>
            );
        }
    };
    function GoalList() {
        const [showDetails, setShowDetails] = useState(false);
        // your code for rendering the list of goals goes here
        return (
            <div>
                <ShowDetailsButton onClick={() => setShowDetails(!showDetails)}>Show details</ShowDetailsButton>
                {showDetails && (
                    <div>
                        {/* your code for rendering the details of all goals goes here */}
                        <p>PERIOD: {days}.</p>
                        <p>Status: {status}.</p>
                        <p> All workouts for the goal, completed and pending</p>
                        {goals.map((workout, index) => {
                            var ShowButton = !workout.complete ? <Button2 item={workout.id} getWorkouts={getWorkouts} updateWorkout={updateWorkout} /> : null;

                            return (
                                <div key={index}>
                                    <h3>{workout.name}</h3>
                                    <p>{workout.complete ? "Completed" : "Not Completed"}</p>
                                    {ShowButton}
                                </div>
                            );
                        })}
                        <p>The reference to the users previously achieved goals</p>
                    </div>
                )}
            </div>
        );
    }
    // useEffect(() => {
    //     fetchData();
    // }, []);
    return (
        <div>
            <div>
                <ShowAllWorkouts />
                {<GoalList />}
            </div>
        </div>
    );
};
export default SetGoals;