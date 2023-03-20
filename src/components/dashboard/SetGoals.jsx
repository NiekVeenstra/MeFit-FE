import React from "react";
import Button from "../button";
import { useState, useEffect } from "react";
import { getWorkouts } from '../../api/apiCall/workouts'
import { updateWorkout } from '../../api/apiCall/updateWorkout'
import { useGoals } from "../../context/UserContext";


const SetGoals = () => {
    const { oneGoal, setOneGoal } = useGoals();
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
            return (
                <div>
                    <h3>You have no workouts yet!</h3>
                    <h6>
                        Add your goals: <Button />
                    </h6>
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
    function GoalList(props) {
        const [showDetails, setShowDetails] = useState(false);
        // your code for rendering the list of goals goes here
        return (
            <div>
                <button onClick={() => setShowDetails(!showDetails)} style={{ width: "8rem", border: "solid 2px", borderRadius: "15px", padding: "0.6rem", background: "blue", color: "white" }}>Show details</button>
                {showDetails && (
                    <div>
                        {/* your code for rendering the details of all goals goes here */}
                        <p>PERIOD: {days}.</p>
                        <p>Status: {status}.</p>
                        <p> All workouts for the goal, completed and pending</p>
                        {goals.map((workout, index) => {
                            var ShowButton = !workout.complete ? <Button item={workout.id} getWorkouts={getWorkouts} updateWorkout={updateWorkout} /> : null;

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
                <button onClick={() => setGoals({ ...goals, complete: true })} >click</button>
                <button onClick={() => console.log(oneGoal)} >click</button>

            </div>
        </div>
    );
};
export default SetGoals;