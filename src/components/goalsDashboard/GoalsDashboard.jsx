import React from 'react'
import styled from "styled-components";
import Calendar from '../dashboard/Calendar'
import ProgressBar from '../dashboard/ProgressBar'
import DaysLeft from '../dashboard/DaysLeft'
import SetGoals from '../dashboard/SetGoals'

const StyledTopDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 3.3rem);
`;

const StyledGoalsTexth3 = styled.h3`
  margin: 0;
  font-family: "Montserrat", sans-serif;
  font-size: ${(props) => props.theme.fontSize.h3};
`;
const StyledGoalsTexth1 = styled.h1`
  margin: 10;
  font-family: "Montserrat", sans-serif;
  font-size: ${(props) => props.theme.fontSize.h3};
`;

const GoalsDashboard = () => {
  return (
    <StyledTopDashboard>
      <StyledGoalsTexth1>Dashboard</StyledGoalsTexth1>
      <Calendar />
      <ProgressBar />
      <DaysLeft />
      <StyledGoalsTexth3> Your Goals:</StyledGoalsTexth3>
      <SetGoals />
    </StyledTopDashboard>
  )
}

export default GoalsDashboard
