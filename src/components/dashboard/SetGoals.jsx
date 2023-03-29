import React from "react";
import Button2 from "../button";
import { useState, useEffect } from "react";
import { getWorkouts } from '../../api/apiCall/workouts'
import { updateWorkout } from '../../api/apiCall/updateWorkout'
import { useGoals, useListCheck } from "../../context/UserContext";
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
  margin: 1rem 0;
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
`;
const StyleCompletedlist = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainColor};
  h3, p {
    margin: 2rem;
}
`;
const StylelistedGoals = styled.div`
  border: 1px solid ${(props) => props.theme.colors.mainColor};
  padding: 2rem;
  border-radius: 1.5rem;
  `;
const StyleDivComplete = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  `;
const StyleParagraphlist = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainColor};
 
    margin: 2rem;
    `;

const SetGoals = () => {
    const days = "from Monday March 27th 2023 to Sunday April 2nd 2023";
    const status = "in progress";
    // const goals = [];
    const [goals, setGoals] = useState([])
    const fetchData = async () => {
        const workoutGoals = await getWorkouts();
        setGoals(workoutGoals);

    };

    const ShowAllWorkouts = () => {
        const { listWorkout, setListWorkout } = useListCheck(false);
        if (goals.length === 0) {

            return (
                <div>
                    <>
                        <h3>You have no workouts yet!</h3>
                        <p>Click the button below to add a new workouts or a full program!</p>
                        <button variant="contained" onClick={() => setListWorkout(true)}>View Workout List</button> {/* add a button to call the WorkoutList function */}
                        {listWorkout && <WorkoutList />}
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
                <ShowDetailsButton onClick={() => setShowDetails(prevState => !prevState)}>Show details</ShowDetailsButton>
                {showDetails && (
                    <StylelistedGoals>
                        {/* your code for rendering the details of all goals goes here */}
                        <StyleParagraphlist>PERIOD: {days}.</StyleParagraphlist>
                        <StyleParagraphlist>Status: {status}.</StyleParagraphlist>
                        <p> All workouts for your goal:</p>
                        {goals.map((workout, index) => {
                            var ShowButton = !workout.complete ? <Button2 item={workout.id} getWorkouts={getWorkouts} updateWorkout={updateWorkout} /> : null;

                            return (
                                <div key={index}>
                                    <StyleCompletedlist>
                                        <StyleDivComplete>
                                            <h3>{workout.name}</h3>
                                            <p>{workout.complete ? "Completed" : "Not Completed"}</p>
                                        </StyleDivComplete>
                                        {ShowButton}
                                    </StyleCompletedlist>
                                </div>
                            );
                        })}
                        <p>The reference to the users previously achieved goals</p>
                    </StylelistedGoals>
                )}
            </div>
        );
    }
    useEffect(() => {
        fetchData();
    }, []);
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