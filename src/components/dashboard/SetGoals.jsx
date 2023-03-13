import React from 'react'
import Button from '../button'
import { useState } from "react";

const SetGoals = () => {
    const days = "from this date to this date";
    const status = "in progress";
    let userData = {
        userID: "user001",
        userName: "John Doe",
        // userWorkouts: []
        userWorkouts: [{
            workoutName: "Workout 01",
            workoutCompletion: true,
        },
        {
            workoutName: "Workout 02",
            workoutCompletion: false,
        }]
    };

    // show all workout
    const ShowAllWorkouts = () => {
        if (userData.userWorkouts.length === 0) {
            return (
                <div>
                    <h3>You have no workouts yet!</h3>
                    <h6>Add your goals: <Button /></h6>
                </div>
            )
        } else {
            return (
                <div>
                    {userData.userWorkouts.map((workout, index) => {
                        var ShowButton = (!workout.workoutCompletion) ? <Button item={workout} /> : null;

                        return (
                            <div key={index}>
                                <h3>{workout.workoutName}</h3>
                                <p>{workout.workoutCompletion ? "Completed" : "Not Completed"}</p>
                                {/* // create a button for completion of workout market as "Not Completed" */}
                                {ShowButton}

                            </div>
                        )
                    })}
                </div>
            )
        }
    }

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
                        <p>  All workouts for the goal, completed and pending</p>
                         <p>The reference to the users previously achieved goals</p>

                         <p>A interaction to allow the user to log completed workouts for the current goal</p>
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

    return (
        <div>
            {/* {userData.userWorkouts[1].workoutCompletion} */}
            <div>

                <ShowAllWorkouts />
                {/* <ShowCompletedWorkouts /> */}

                <GoalList />

            </div>
        </div>
    )
}

export default SetGoals
