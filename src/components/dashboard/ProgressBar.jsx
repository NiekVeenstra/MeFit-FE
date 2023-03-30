import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useWorkout } from "../../context/UserContext";

const StyleProgressBar = styled.div`
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
function ProgressBar() {
  const [completedPercentage, setCompletedPercentage] = useState(0);
  const { saveWorkout, setSaveWorkout } = useWorkout();

  const finishedWorkoutCheck = () => {
    if (saveWorkout.length === 0) {
      console.log("empty");
    } else {
      const finishWorkout = saveWorkout.filter((workout) => (workout.complete === true))
      setCompletedPercentage(finishWorkout.length / saveWorkout.length * 100)
    }
  };

  useEffect(() => {
    finishedWorkoutCheck();
  }, [saveWorkout]);
  return (
    <StyleProgressBar>
      <p>Completed: {completedPercentage.toFixed(2)}%</p>
      <div>
        <progress value={completedPercentage} max="100" />
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${completedPercentage}%` }}></div>
      </div>
    </StyleProgressBar>
  );
}

export default ProgressBar;
