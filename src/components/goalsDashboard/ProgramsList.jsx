import React from 'react';
import { makeStyles } from '@mui/styles';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider
} from '@mui/material';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    list: {
        backgroundColor: theme.palette.background.paper,
        padding: 0,
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const ProgramsList = () => {
    const classes = useStyles();

    const categories = [
        { name: 'Lose Weight', count: 3 },
        { name: 'Gain Muscle Mass', count: 3 },
        { name: 'Get Shredded', count: 3 }
    ];

    const generatePrograms = async () => {
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/', {
            headers: {
                'x-rapidapi-key': '<your-api-key>',
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
            },
        });
        const data = await response.json();
        const exercises = data.exercises;

        const programs = categories.map(({ name, count }) => {
            const selectedExercises = [];
            for (let i = 0; i < 7; i++) {
                let exercise = exercises[Math.floor(Math.random() * exercises.length)];
                while (selectedExercises.includes(exercise)) {
                    exercise = exercises[Math.floor(Math.random() * exercises.length)];
                }
                selectedExercises.push(exercise);
            }
            return { name, exercises: selectedExercises, count };
        });
        return programs;
    };

    const [programs, setPrograms] = React.useState([]);
    React.useEffect(() => {
        const getPrograms = async () => {
            const programs = await generatePrograms();
            setPrograms(programs);
        };
        getPrograms();
    }, []);

    return (
        <Container maxWidth="md" className={classes.root}>
            <Typography variant="h4" component="h1" gutterBottom>
                Programs List
            </Typography>
            {programs.map((program) => (
                <div key={program.name}>
                    <Typography variant="h5" component="h2" gutterBottom>
                        {program.name}
                    </Typography>
                    <List className={classes.list}>
                        {program.exercises.map((exercise) => (
                            <React.Fragment key={exercise.id}>
                                <ListItem dense>
                                    <ListItemText primary={exercise.name} secondary={exercise.category} />
                                </ListItem>
                                <Divider className={classes.divider} />
                            </React.Fragment>
                        ))}
                    </List>
                </div>
            ))}
        </Container>
    );
};

export default ProgramsList;