import React from "react";
import Button from "../button";
import { useState, useEffect } from "react";
import { getWorkouts } from "../../api/apiCall/workouts";
import { updateWorkout } from "../../api/apiCall/workouts";
const SetGoals = () => {
    const days = "from this date to this date";
    const status = "in progress";
    const [goals, setGoals] = useState([])
    const fetchData = async () => {
        const goals = await getWorkouts();
        setGoals(goals);
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
                    {goals.map((workout, index) => {
                        var ShowButton = !workout.complete ? <Button item={workout} /> : null;

                        return (
                            <div key={index}>
                                <h3>{workout.name}</h3>
                                <p>{workout.complete ? "Completed" : "Not Completed"}</p>
                                {/* // create a button for completion of workout market as "Not Completed" */}
                                {ShowButton}
                            </div>
                        );
                    })}
                </div>
            );
        }
    };
    function GoalList(props) {
        const [showDetails, setShowDetails] = useState(false);
        // your code for rendering the list of goals goes here
        return (
            <div>
                <button onClick={() => setShowDetails(!showDetails)}>Show details</button>
                {showDetails && (
                    <div>
                        {/* your code for rendering the details of all goals goes here */}
                        <p>PERIOD: {days}.</p>
                        <p>Status: {status}.</p>
                        <p> All workouts for the goal, completed and pending</p>{" "}
                        <p>The reference to the users previously achieved goals</p>{" "}
                    </div>
                )}
            </div>
        );
    }
    // show completed workout
    // const completedWorkouts =
    //     userData.userWorkouts.filter(function (workout) {
    //         return workout.workoutCompletion == true;
    //     });
    // console.log(completedWorkouts.at(0).workoutName);
    // const ShowCompletedWorkouts = () => {
    //     return (
    //         <div>
    //             <h3>Completed workouts:</h3>
    //             <h3>{completedWorkouts.at(0).workoutName}</h3>
    //         </div>
    //     )
    // }
    // show in progress workout
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            {/* {userData.userWorkouts[1].workoutCompletion} */}
            <div>
                
                <ShowAllWorkouts />
                {<GoalList />}

            </div>
        </div>
    );
};
export default SetGoals;