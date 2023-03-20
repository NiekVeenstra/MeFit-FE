import React from 'react';
import { useState } from 'react';
import { getOneWorkout } from '../api/apiCall/workouts';
import { updateWorkout } from '../api/apiCall/updateWorkout';
import { useGoals } from '../context/UserContext';


const Button = ({ item }) => {
    const [click, setClick] = useState(false);
    const {oneGoal, setOneGoal} = useGoals();
    // add other functions if you want
    const handleClick = () => {
        // updateWorkout(item)
        const oneGoalData = getOneWorkout(item);
        setOneGoal(oneGoalData);
        setClick(!click);
    };
    function handleOneGoal() {
        setOneGoal({ ...oneGoal, completed: true });
    }
    return (
        <button onClick={handleClick} style={{ width: "6rem", border: "solid 2px", borderRadius: "15px", padding: "0.6rem", background: "blue", color: "white" }}>
            {click ? "clicked" : 'not clicked'}

        </button>

    );
}

export default Button





