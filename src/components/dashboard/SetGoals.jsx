import React from "react";
import Button2 from "../button";
import { useState } from "react";
import { getWorkouts } from "../../api/apiCall/workouts";
import { updateWorkout } from "../../api/apiCall/updateWorkout";
import { useListCheck, useWorkout } from "../../context/UserContext";
import WorkoutList from "../goalsDashboard/WorkoutList";
import styled from "styled-components";

const ShowDetailsButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  border-radius: 15px;
  cursor: pointer;
  width: 8rem;
  text-align: center;
  background-color: ${(props) => props.theme.colors.mainColor};
  align-items: center;
  margin: 1rem 0;
`;

const StyleGoalslist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15rem;
  height: calc(16vh - 3.3rem);
  background-color: ${(props) => props.theme.colors.mainColor};
  color: white;
  font-size: 1rem;
  text-align: center;
  margin: 0.1rem;
  padding: 0.6rem;
  border-radius: 1.5rem;
`;
const StyleCompletedlist = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainColor};
  h3,
  p {
    margin: 2rem;
  }
`;
const StylelistedGoals = styled.div`
  border: 1px solid ${(props) => props.theme.colors.mainColor};
  padding: 2rem;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  margin-bottom: 3rem;
`;
const StyleDivComplete = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;
const StyleParagraphlist = styled.p`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.mainColor};
  margin: 2rem;
`;

const StyledButton = styled.button`
  color: ${(props) => props.theme.colors.white};
  padding: 0.6rem;
  border-radius: 15px;
  width: 8rem;
  background-color: ${(props) => props.theme.colors.mainColor};
  align-self: center;
  margin-top: 1rem;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SetGoals = () => {
  const days = "from Monday March 27th 2023 to Sunday April 2nd 2023";
  const status = "in progress";
  const [goals, setGoals] = useState([]);
  const fetchData = async () => {
    const workoutGoals = await getWorkouts();
    setGoals(workoutGoals);
  };

  const ShowAllWorkouts = () => {
    const { listWorkout, setListWorkout } = useListCheck(false);
    const { saveWorkout, setSaveWorkout } = useWorkout();
    if (saveWorkout.length === 0) {
      return (
        <StyledDivContainer>
          <>
            <h3>You have no workouts yet!</h3>
            <p>Click the button below to add a new workouts or a full program!</p>
            <StyledButton variant="contained" onClick={() => setListWorkout(!listWorkout)}>
              View Workout List
            </StyledButton>{" "}
            {listWorkout && <WorkoutList />}
          </>
        </StyledDivContainer>
      );
    } else {
      const workoutsLeft = saveWorkout.filter((workout) => workout.complete === false);

      return (
        <StyleGoalslist>
          <h3>You have {workoutsLeft.length} workouts!</h3>
        </StyleGoalslist>
      );
    }
  };
  function GoalList() {
    const [showDetails, setShowDetails] = useState(false);
    const { saveWorkout, setSaveWorkout } = useWorkout();
    const workoutsLeft = saveWorkout.filter((workout) => workout.complete === false);

    const FinishExercise = () => {
      setSaveWorkout([]);
    };

    return (
      <StyledDivContainer>
        {saveWorkout.length !== 0 && (
          <ShowDetailsButton onClick={() => setShowDetails((prevState) => !prevState)}>
            Show details
          </ShowDetailsButton>
        )}
        {showDetails && (
          <StylelistedGoals>
            <StyleParagraphlist>PERIOD: {days}.</StyleParagraphlist>
            <StyleParagraphlist>Status: {workoutsLeft.length === 0 ? "completed" : "in progress"}.</StyleParagraphlist>
            <p> All workouts for your goal:</p>
            {saveWorkout.map((workout, index) => {
              var ShowButton = !workout.complete ? (
                <Button2
                  index={index}
                  item={workout.id}
                  getWorkouts={getWorkouts}
                  updateWorkout={updateWorkout}
                />
              ) : null;
              return (
                <div key={index}>
                  <StyleCompletedlist>
                    <StyleDivComplete>
                      <h3>{workout.title}</h3>
                      <p>{workout.complete ? "Completed" : "Not Completed"}</p>
                    </StyleDivComplete>
                    {ShowButton}
                  </StyleCompletedlist>
                </div>
              );
            })}
            {workoutsLeft.length === 0 && (
              <StyledButton
                onClick={() => {
                  FinishExercise();
                  setShowDetails(false)
                }}
              >
                Finish
              </StyledButton>
            )}
          </StylelistedGoals>
        )}
      </StyledDivContainer>
    );
  }
  return (
    <div>
      <StyledContainer>
        <ShowAllWorkouts />
        <GoalList />
      </StyledContainer>
    </div>
  );
};
export default SetGoals;
