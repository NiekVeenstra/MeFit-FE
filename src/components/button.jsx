import React from 'react';
import { useState, useEffect } from "react";
import { getOneWorkout } from '../api/apiCall/workouts';
import { updateWorkout } from '../api/apiCall/updateWorkout';
import { useGoals } from '../context/UserContext';

const Button2 = ({ item }) => {
    const [click, setClick] = useState(false);
    const { oneGoal, setOneGoal } = useGoals();

    useEffect(() => {
        const fetchData = async () => {
            const oneGoalData = await getOneWorkout(item);
            if (oneGoalData.id === item) {
                setOneGoal(oneGoalData);
            }
        };

        fetchData();
    }, [item, setOneGoal]);

    const handleOneGoal = () => {
        setOneGoal(prevOneGoal => ({ ...prevOneGoal, complete: true }));
        console.log(oneGoal);
    }

    return (
        <button
            onClick={() => {
                handleOneGoal(item);
                updateWorkout(item);
                setClick(!click);
            }}
            style={{
                width: "6rem",
                border: "solid 2px",
                borderRadius: "15px",
                padding: "0.6rem",
                background: "blue",
                color: "white"
            }}
        >
            {click ? "clicked" : "not clicked"}
        </button>
    );
};

export default Button2;
