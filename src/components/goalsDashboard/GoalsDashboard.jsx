import React from 'react'
import Chart from '../Chart'
import GoalsInfo from '../GoalsInfo'



const GoalsDashboard = () => {
  return (
    <div>GoalsDashboard
      <div>Progress Chart overall<Chart /></div>
      <div>Set Goals input
        <div>Goals in More details</div>
      </div>
      <div><GoalsInfo /></div>
      <div>Progress pie this week
        <div>Motivation text</div>
      </div>
    </div>

  )
}

export default GoalsDashboard