import { Box, Button, Card } from "@mui/material";
import { render } from "@testing-library/react";
import goalfuncs from "../../utils/GoalContext";
import programFuncs from "../../utils/TrainingProgramContext";
import workoutFuncs from "../../utils/WorkoutContext";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddProgramToGoal = ({ message, ProgramId }) => {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    //GET THE CURRENTLY LOGGED IN USER
    const user = JSON.parse(localStorage.getItem("user"))

    //GET CURRENT WEEK
    const thisWeek = localStorage.getItem("Current Week");

    //GET CURRENT GOAL
    const currentGoal = goalfuncs.FetchGoalByUserAndWeek(user.id, thisWeek);

    //GET THE WORKOUTS IN THE PROGRAM
    let workouts = programFuncs.FetchWorkoutsInProgram(ProgramId)


    //CHECK IF A GOAL EXISTS FOR THE CURRENT WEEK
    function GoalExist() {
        if (currentGoal === undefined) {
            return false
        }
        return true
    }

    //CREATE A GOAL
    function CreateGoal() {
        const newGoal = {
            week: thisWeek,
            achieved: false,
            accountId: user.id
        }

        goalfuncs.CreateGoal(newGoal)
    }

    // ADD WORKOUT TO GOAL
    function AddWorkoutToGoal(message, workouts) {
        setOpen(true)

        if (!GoalExist()) {
            CreateGoal()
        }

        let workoutIds = workouts.map((a) => a.id);

        const goalId = currentGoal.id;
        goalfuncs.AddWorkoutsToGoal(goalId, workoutIds)
    }


    return (
        <>
            <Box textAlign='center' sx={{ pb: 1, pl: 1, pr: 1 }}>
                <Button fullWidth onClick={() => AddWorkoutToGoal(message, workouts)}
                    variant="outlined">
                    Add to goal
                </Button>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Added Program to Goal
                    </Alert>
                </Snackbar>
            </Box>
        </>
    )

}

export default AddProgramToGoal;