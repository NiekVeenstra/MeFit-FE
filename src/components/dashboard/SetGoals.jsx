import React from 'react'

const SetGoals = () => {
    const days = 7;
    const status = "in progress";
    const userData = {
        userID: "user001",
        userName: "John Doe",
        userWorkouts: [{
            workoutName: "Workout 01",
            workoutCompletion: true,
        },
        {
            workoutName: "Workout 01",
            workoutCompletion: false,
        }]
    };

    return (
        <div>
            {userData.userWorkouts[1].workoutCompletion}
            <ul>
                <li>PERIOD: {days} days.
                    Status: {status}.</li>


                 <li><Workouts /> All workouts for the goal, completed and pending</li>
                 <li>The reference to the users previously achieved goals</li>
                 <li>A interaction to allow the user to log completed workouts for the current goal</li>
            </ul>
        </div>
    )
}

export default SetGoals
