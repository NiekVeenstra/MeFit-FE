import { Button, Card, Box } from "@mui/material";
import { render } from "@testing-library/react";
import goalfuncs from "../../utils/GoalContext";
import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AddWorkoutToGoal = ({ message, WorkoutId }) => {

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

    //CHECK IF A GOAL EXISTS FOR THE CURRENT WEEK
    function GoalExist() {
        if (currentGoal === undefined) {
            return false
        }
        else {
            return true
        }
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
    function AddWorkoutToGoal(message, WorkoutId) {
        setOpen(true);

        if (!GoalExist()) {
            CreateGoal()
        }
        let arr = new Array();
        arr.push(WorkoutId)

        const goalId = currentGoal.id;
        goalfuncs.AddWorkoutsToGoal(goalId, arr)
    }




    return (
        <>
            <Box textAlign='center' sx={{ p: 1 }}>

                <Button fullWidth="true" onClick={() => AddWorkoutToGoal(message, WorkoutId)}
                    variant="outlined">
                    Add To Goal
                </Button>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Added Workout to Goal
                    </Alert>
                </Snackbar>

            </Box>
        </>
    )

}

export default AddWorkoutToGoal;
