import React from 'react'
// import Chart from '../../components/dashboard/Chart'
// import GoalsInfo from '../dashboard/GoalsInfo'

import Calendar from '../dashboard/Calendar'
import ProgressBar from '../dashboard/ProgressBar'
import DaysLeft from '../dashboard/DaysLeft'
import SetGoals from '../dashboard/SetGoals'
// import Title from '../title'

// const StyledTopDashboard = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   height: calc(100vh - 3.3rem);
// `;



const GoalsDashboard = () => {
  return (
    <div>
      <h2>Goals Dashboard</h2>
      <Calendar />
      <ProgressBar />
      <DaysLeft />
      <h3> Your Goals:</h3>
      <SetGoals />
    </div>
  )
}

export default GoalsDashboard