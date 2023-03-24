import React from "react";
import Button2 from "../button";
import { useState, useEffect } from "react";
import { getWorkouts } from '../../api/apiCall/workouts'
import { updateWorkout } from '../../api/apiCall/updateWorkout'
import { useGoals } from "../../context/UserContext";
import WorkoutList from "../goalsDashboard/WorkoutList";
import ProgramsList from "../goalsDashboard/ProgramsList";
import { Button } from '@mui/material';

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
            const CallWorkoutListButton = () => {
                const handleCallExerciseList = () => {
                    WorkoutList();
                };

                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCallExerciseList}
                    >
                        Select Workouts
                    </Button>
                );
            };
            const CallProgramListButton = () => {
                const handleProgramList = () => {
                    ProgramsList();
                };

                return (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleProgramList}
                    >
                        Select Program
                    </Button>
                );
            };

            return (
                <div>
                    <>
                        <h3>You have no workouts yet!</h3>
                        <p>Click the button below to add a new workouts or a full program!</p>
                        {CallWorkoutListButton()}
                        {<CallProgramListButton />}
                    </>
                </div>
            );
        } else {
            return (
                <div>
                    <h3>You have {goals.length} workouts!</h3>
                </div>
            );
        }
    };
    function GoalList() {
        const [showDetails, setShowDetails] = useState(false);
        // your code for rendering the list of goals goes here
        return (
            <div>
                <button onClick={() => setShowDetails(!showDetails)} style={{ width: "8rem", border: "solid 2px", borderRadius: "15px", padding: "0.6rem", background: "#0943ef", color: "white" }}>Show details</button>
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

                                    {/* // create a button for completion of workout market as "Not Completed" */}
                                    {ShowButton}

                                </div>
                            );
                        })}
                        <p>The reference to the users previously achieved goals</p>
                        {/* {userData.userWorkouts[1].workoutCompletion} */}
                    </div>
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