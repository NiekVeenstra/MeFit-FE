import React, { useState, useEffect } from 'react';
import { getWorkouts } from '../../api/apiCall/workouts';
import styled from "styled-components";

const StyleProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: calc(16vh - 3.3rem);
  background-color: ${(props) => props.theme.colors.mainColor};
  color: white;
  font-size: 1rem;
  text-align: center;
  margin: 0.1rem;
  padding: 0.6rem;
  border-radius: 1.5rem;
  }
`;
function ProgressBar() {
  const [completedPercentage, setCompletedPercentage] = useState(0);

  const fetchData = async () => {
    const data = await getWorkouts();
    console.log(data);
    const completedWorkouts = data.filter((workouts) => workouts.complete === true);
    const percentage = (completedWorkouts.length / data.length) * 100;
    setCompletedPercentage(percentage);
  }
  useEffect(() => {
    fetchData();
  }, []);
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
